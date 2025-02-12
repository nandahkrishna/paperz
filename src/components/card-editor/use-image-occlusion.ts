import { Editor } from "@tiptap/react";
import { OcclusionInterface } from "./node-occlusion/OcclusionNode";

export const useOcclusions = (editor: Editor | null) => {
  const addOcclusion = (
    id: string = "1",
    x: number = 0,
    y: number = 0,
    width: number = 50,
    height: number = 50
  ) => {
    if (!editor) {
      return {};
    }

    const existingOcclusions = editor.getAttributes("occlusion").occlusions;
    const newOcclusion = {
      id,
      x,
      y,
      width,
      height,
    } as OcclusionInterface;
    const updatedOcclusions = [...existingOcclusions, newOcclusion];

    editor.commands.updateAttributes("occlusion", {
      occlusions: updatedOcclusions,
      isHidden: true,
    });
  };

  const prependOccludedImage = (
    src: string,
    occlusions: OcclusionInterface[],
    imageSize: { width: number; height: number }
  ) => {
    if (!editor) return;
    editor.commands.insertContent({
      type: "occlusion",
      attrs: {
        src,
        occlusions,
        isHidden: true,
        imageSize,
      },
    });
  };

  const removeOcclusion = (id: string = "1") => {
    if (!editor) return;
    const existingOcclusions = editor.getAttributes("occlusion").occlusions;
    const updatedOcclusions = existingOcclusions.filter(
      (occlusion: OcclusionInterface) => occlusion.id !== id
    );
    editor.commands.updateAttributes("occlusion", {
      occlusions: updatedOcclusions,
    });
  };

  const hideOcclusions = () => {
    if (!editor) return;
    const { tr } = editor.state;

    // Traverse the document
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === "occlusion" && node.attrs.isHidden) {
        // Set attributes, specifically toggling the 'isHidden' state
        tr.setNodeMarkup(pos, null, { ...node.attrs, isHidden: false });
      }
    });

    // Check if the transaction has any changes to apply
    if (tr.docChanged) {
      // Apply the transaction
      editor.view.dispatch(tr);
    }
  };

  const showOcclusions = () => {
    if (!editor) return;
    if (!editor) return;
    const { tr } = editor.state;

    // Traverse the document
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === "occlusion" && node.attrs.isHidden) {
        // Set attributes, specifically toggling the 'isHidden' state
        tr.setNodeMarkup(pos, null, { ...node.attrs, isHidden: true });
      }
    });

    // Check if the transaction has any changes to apply
    if (tr.docChanged) {
      // Apply the transaction
      editor.view.dispatch(tr);
    }
  };

  return {
    addOcclusion,
    removeOcclusion,
    hideOcclusions,
    showOcclusions,
    prependOccludedImage,
  };
};
