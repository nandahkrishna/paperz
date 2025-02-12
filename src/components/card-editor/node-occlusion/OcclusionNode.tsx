import { Node } from "@tiptap/core";
import { Plugin } from "prosemirror-state";
import { NodeSelection } from "prosemirror-state";
import { OCCLUSION_COLOR } from "@/config/const";

interface OcclusionNodeAttributes {
  src: string;
  alt: string | null;
  isHidden: boolean;
  occlusions: OcclusionInterface[];
  imageSize: ImageSizeInterface;
}

export interface ImageSizeInterface {
  width: number;
  height: number;
}

const safeParse = (data: string | null | undefined, defaultValue = {}) => {
  if (!data) return defaultValue;
  const parsed = JSON.parse(data);
  return parsed;
};

// Define the type for the update function
export type UpdateOcclusionsFunction = ({
  src,
  occlusions,
  imageSize,
  onUpdate,
}: {
  src: string;
  occlusions: OcclusionInterface[];
  imageSize: ImageSizeInterface;
  onUpdate: (
    newOcculsions: OcclusionInterface[],
    imageSize: ImageSizeInterface
  ) => void;
}) => void;

export interface OcclusionInterface {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Occlusion = Node.create({
  name: "occlusion",
  group: "block",
  content: "block*", // This is the content of the occlusion block
  addOptions() {
    return {
      ignoreClicks: false,
      ignoreDoubleClicks: false,
      onUpdateAttrs: null as UpdateOcclusionsFunction | null, // Define the type of the update function
    };
  },
  addAttributes() {
    return {
      src: {
        default: "", // Assume an empty string if no src is provided
      },
      alt: {
        default: null, // Assume null if no alt text is provided
      },
      isHidden: {
        default: false, // Assume false if no isHidden attribute is provided
        parseHTML: (element) => {
          const isHiddenStr = element.getAttribute("isHidden");
          if (!isHiddenStr) return false;
          const isHidden = safeParse(isHiddenStr, false);
          return isHidden;
        },
        renderHTML: (attributes) => {
          return {
            isHidden: JSON.stringify(attributes.isHidden),
          };
        },
      },
      occlusions: {
        default: [], // Ensures default is an empty array
        parseHTML: (element) => {
          const data = element.getAttribute("data-occlusions");
          const occlusions: OcclusionInterface[] = data ? JSON.parse(data) : [];
          return occlusions;
        },
        renderHTML: (attributes) => {
          return {
            occlusions: JSON.stringify(attributes.occlusions),
          };
        },
      },

      imageSize: {
        default: null,
        parseHTML: (element) => {
          const data = element.getAttribute("data-image-size");
          const imageSize: ImageSizeInterface = data
            ? JSON.parse(data)
            : { width: 0, height: 0 };
          return imageSize;
        },
        renderHTML: (attributes) => {
          return {
            imageSize: JSON.stringify(attributes.imageSize),
          };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "div.image-occlusion",
        getAttrs: (dom) => {
          const src = dom.querySelector("img")?.getAttribute("src") || "";
          const occlusionsStr = dom.getAttribute("data-occlusions");
          const occlusions = safeParse(occlusionsStr, []);
          const isHidden = dom.getAttribute("isHidden") === "true";
          return {
            src,
            occlusions,
            isHidden,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt } = HTMLAttributes;
    const occlusions: OcclusionInterface[] =
      JSON.parse(HTMLAttributes.occlusions) || [];
    if (!HTMLAttributes.imageSize) return document.createElement("div");
    const imageSize: ImageSizeInterface = JSON.parse(
      HTMLAttributes.imageSize
    ) || {
      width: 0,
      height: 0,
    };

    const isHidden = HTMLAttributes.isHidden
      ? JSON.parse(HTMLAttributes.isHidden)
      : true;
    const imageStyle = "cursor: pointer; width: 80%; position: relative;";
    const containerStyle =
      "position: relative; width: 100%; display: flex; justify-content: center; align-items: center;";

    // Store occlusion divs in an array for easy access later
    const occlusionDivs = occlusions.map((occlusion) => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = `${occlusion.x}px`;
      div.style.top = `${occlusion.y}px`;
      div.style.width = `${occlusion.width}px`;
      div.style.height = `${occlusion.height}px`;
      div.style.backgroundColor = OCCLUSION_COLOR;
      return div;
    });

    const container = document.createElement("div");
    container.className = "image-occlusion";
    container.style.cssText = containerStyle;
    container.setAttribute("isHidden", JSON.stringify(isHidden));
    container.setAttribute("data-image-size", JSON.stringify(imageSize));
    container.setAttribute("data-occlusions", JSON.stringify(occlusions));

    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    img.style.cssText = imageStyle;

    // Setup Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === img) {
          //   logger.debug(
          //     `Resized image dimensions1: ${entry.contentRect.width}px x ${entry.contentRect.height}px`
          //   );
          //   logger.debug(`Num Occlusions: ${occlusionDivs.length}`);
          const rect = img.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const offsetX = rect.left - containerRect.left;
          const offsetY = rect.top - containerRect.top;
          updateOcclusionDims(
            // entry.contentRect.width,
            // entry.contentRect.height,
            rect.width,
            rect.height,
            offsetX,
            offsetY,
            imageSize.width,
            imageSize.height,
            occlusionDivs,
            occlusions
          );
        }
      }
    });

    img.onload = () => {
      resizeObserver.observe(img);
    };

    container.appendChild(img);
    if (isHidden) occlusionDivs.forEach((div) => container.appendChild(div));
    return container;
  },

  addProseMirrorPlugins() {
    let lastSelectedImage: any = null;
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            click: (view, event) => {
              const { pos } = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              }) || { pos: 0 };
              const resolvedPos = view.state.doc.resolve(pos);

              const occlusionNode =
                resolvedPos.nodeAfter?.type?.name === "occlusion"
                  ? resolvedPos.nodeAfter
                  : resolvedPos.nodeBefore;

              if (
                occlusionNode &&
                occlusionNode.type.name === "occlusion" &&
                !this.options.ignoreClicks
              ) {
                let posVal;
                const nodeAfter = resolvedPos.nodeAfter;
                const nodeBefore = resolvedPos.nodeBefore;
                if (nodeAfter && nodeAfter.type.name === "occlusion") {
                  posVal = pos; // For nodeAfter, use the position directly
                } else if (nodeBefore && nodeBefore.type.name === "occlusion") {
                  posVal = pos - nodeBefore.nodeSize; // For nodeBefore, adjust position
                }

                if (posVal !== undefined)
                  view.dispatch(
                    view.state.tr.setSelection(
                      NodeSelection.create(view.state.doc, posVal)
                    )
                  );

                const domNode = view.domAtPos(pos).node;
                if (domNode instanceof HTMLElement) {
                  const img = domNode.querySelector("img");
                  if (img) {
                    if (lastSelectedImage && lastSelectedImage !== img) {
                      lastSelectedImage.style.border = "";
                    }
                    lastSelectedImage = img;
                    img.style.border = img.style.border ? "" : "2px dashed red";
                    return true; // Click was handled
                  }
                }
              } else {
                // Click was outside any occlusion image, clear the last selection
                if (lastSelectedImage) {
                  lastSelectedImage.style.border = "";
                  lastSelectedImage = null;
                }
              }
              return false; // Allow other handlers to process the click event
            },

            dblclick: (view, event) => {
              const { pos } = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              }) || { pos: 0 };
              const resolvedPos = view.state.doc.resolve(pos);

              //   const occlusionNode = resolvedPos.nodeAfter
              //     ? resolvedPos.nodeAfter
              //     : resolvedPos.nodeBefore;

              const occlusionNode =
                resolvedPos.nodeAfter?.type?.name === "occlusion"
                  ? resolvedPos.nodeAfter
                  : resolvedPos.nodeBefore;

              //   debugger;

              if (occlusionNode && occlusionNode.type.name === "occlusion") {
                if (
                  this.options.onUpdateAttrs &&
                  !this.options.ignoreDoubleClicks
                ) {
                  const currentAttrs =
                    occlusionNode.attrs as OcclusionNodeAttributes;

                  const updateFunc = this.options
                    .onUpdateAttrs as UpdateOcclusionsFunction;

                  //   let posVal = resolvedPos.pos;
                  //   if (!resolvedPos.nodeAfter && resolvedPos.nodeBefore)
                  //     posVal = resolvedPos.pos - resolvedPos.nodeBefore.nodeSize;

                  let posVal: number | undefined = undefined;
                  const nodeAfter = resolvedPos.nodeAfter;
                  const nodeBefore = resolvedPos.nodeBefore;
                  if (nodeAfter && nodeAfter.type.name === "occlusion") {
                    posVal = pos; // For nodeAfter, use the position directly
                  } else if (
                    nodeBefore &&
                    nodeBefore.type.name === "occlusion"
                  ) {
                    posVal = pos - nodeBefore.nodeSize; // For nodeBefore, adjust position
                  }

                  if (posVal !== undefined)
                    view.dispatch(
                      view.state.tr.setSelection(
                        NodeSelection.create(view.state.doc, posVal)
                      )
                    );

                  updateFunc({
                    src: currentAttrs.src,
                    occlusions: currentAttrs.occlusions,
                    imageSize: currentAttrs.imageSize,
                    onUpdate: (newOcculsions, newImageSize) => {
                      if (posVal !== undefined) {
                        const transaction = view.state.tr.setNodeMarkup(
                          // resolvedPos.pos,
                          posVal,
                          null,
                          {
                            src: currentAttrs.src,
                            occlusions: newOcculsions,
                            isHidden: true,
                            imageSize: newImageSize,
                          }
                        );
                        view.dispatch(transaction);
                      }
                    },
                  });
                  return true;
                }

                return true;
              }
              return false;
            },
          },
        },
      }),
    ];
  },
});

function updateOcclusionDims(
  imgWidthCurrent: number,
  imgHeightCurrent: number,
  offsetX: number,
  offsetY: number,
  imgWidthOriginal: number,
  imgHeightOriginal: number,
  occlusionDivs: HTMLElement[],
  occlusions: OcclusionInterface[]
) {
  const newWidth = imgWidthCurrent;
  const newHeight = imgHeightCurrent;

  const widthScale = newWidth / imgWidthOriginal;
  const heightScale = newHeight / imgHeightOriginal;

  const newOcclusions: OcclusionInterface[] = [];

  occlusionDivs.forEach((child, index) => {
    const occlusion = occlusions[index];

    console.log({
      index,
      newWidth,
      newHeight,
      imgWidthOriginal,
      imgHeightOriginal,
      width: occlusion.width,
      height: occlusion.height,
      widthScale,
      heightScale,
    });

    const scaledWidth = occlusion.width * widthScale;
    const scaledHeight = occlusion.height * heightScale;
    const scaledX = occlusion.x * widthScale;
    const scaledY = occlusion.y * heightScale;

    if (child instanceof HTMLElement) {
      //   console.log({
      //     width: `${scaledWidth}px`,
      //     height: `${scaledHeight}px`,
      //     left: `${scaledX}px`,
      //     top: `${scaledY}px`,
      //   });
      child.style.width = `${scaledWidth}px`;
      child.style.height = `${scaledHeight}px`;
      child.style.left = `${scaledX + offsetX}px`;
      child.style.top = `${scaledY + offsetY}px`;
    }
  });

  return newOcclusions;
}
