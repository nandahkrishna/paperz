"use client";
// TODO: avoid install/import of packages for icons here
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Box, Button, Group, Stack } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconMinus,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { OCCLUSION_COLOR } from "@/config/const";
import {
  ImageSizeInterface,
  OcclusionInterface,
} from "../card-editor/node-occlusion/OcclusionNode";

library.add(faTimesCircle);

export interface ImageOcclusionEditorProps {
  image: string;
  mode?: "url" | "base64";
  initialOcclusions?: OcclusionInterface[];
  onSave: ({
    occlusions,
    imageSize,
  }: {
    occlusions: OcclusionInterface[];
    imageSize: ImageSizeInterface;
  }) => void;
  onClose: () => void;
}

const drawDeleteIcon = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  const deleteIcon = icon(faTimesCircle).html[0];
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, x - 2, y + 2, 16, 16);
  };
  img.src = "data:image/svg+xml;base64," + btoa(deleteIcon);
};

const drawOcclusions = (
  ctx: CanvasRenderingContext2D,
  occlusions: OcclusionInterface[],
  imageRenderScale: number,
  imageRenderPosition: { x: number; y: number },
  selectedOcclusionId: string | null,
  hoverOcclusionId: string | null = null
) => {
  occlusions.forEach((occlusion) => {
    const occlusionX = imageRenderPosition.x + occlusion.x * imageRenderScale;
    const occlusionY = imageRenderPosition.y + occlusion.y * imageRenderScale;
    const occlusionWidth = occlusion.width * imageRenderScale;
    const occlusionHeight = occlusion.height * imageRenderScale;

    ctx.fillStyle =
      occlusion.id === selectedOcclusionId
        ? "rgba(255, 255, 255, 0.5)"
        : OCCLUSION_COLOR;
    ctx.strokeStyle =
      occlusion.id === selectedOcclusionId
        ? "#FF6347"
        : occlusion.id === hoverOcclusionId
        ? "#FFFF00"
        : "transparent";
    ctx.lineWidth = 2;
    ctx.setLineDash(occlusion.id === selectedOcclusionId ? [6, 3] : []);
    ctx.beginPath();
    ctx.roundRect(occlusionX, occlusionY, occlusionWidth, occlusionHeight, 8);
    ctx.fill();
    ctx.stroke();

    if (occlusion.id === selectedOcclusionId) {
      drawDeleteIcon(
        ctx,
        imageRenderPosition.x +
          (occlusion.x + occlusion.width) * imageRenderScale -
          20,
        imageRenderPosition.y + occlusion.y * imageRenderScale
      );
      // Draw resize handles
      const handleSize = 6; // Size of the resize handle
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(
        occlusionX + occlusionWidth - handleSize / 2,
        occlusionY + occlusionHeight - handleSize / 2,
        handleSize,
        handleSize
      );
    }
  });
};

const drawImage = (
  ctx: CanvasRenderingContext2D,
  imageBase64: string,
  imageRenderScale: number,
  imageRenderPosition: { x: number; y: number },
  onDraw?: (image: HTMLImageElement) => void
) => {
  const uploadedImage = new Image();
  uploadedImage.onload = () => {
    ctx.clearRect(0, 0, 20000, 20000);
    ctx.drawImage(
      uploadedImage,
      imageRenderPosition.x,
      imageRenderPosition.y,
      uploadedImage.width * imageRenderScale,
      uploadedImage.height * imageRenderScale
    );
    onDraw && onDraw(uploadedImage);
  };
  uploadedImage.src = imageBase64;
};

const getBase64FromUrl = (url: string, onBase64: (base64: string) => void) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const imageFileReader = new FileReader();
      imageFileReader.onloadend = () => {
        const base64data = imageFileReader.result as string;
        onBase64(base64data);
      };
      imageFileReader.readAsDataURL(blob);
    })
    .catch((error) => {
      console.error("Error converting image URL to base64:", error);
    });
};

const getIsAboveOcclusionArea = (
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
  occlusions: OcclusionInterface[],
  scale: number,
  imageRenderPosition: { x: number; y: number }
) => {
  const rect = canvas.getBoundingClientRect();
  const x = (clientX - rect.left + imageRenderPosition.x) / scale;
  const y = (clientY - rect.top + imageRenderPosition.y) / scale;
  const hoveredOcclusion = occlusions.find((occlusion) => {
    const isWithinOcclusion =
      x >= occlusion.x * scale &&
      x <= (occlusion.x + occlusion.width) * scale &&
      y >= occlusion.y * scale &&
      y <= (occlusion.y + occlusion.height) * scale;

    console.log("isWithinOcclusion", isWithinOcclusion); // Log whether the mouse is within an occlusion area
    console.log("mouseX", x); // Log the x position of the mouse
    console.log("mouseY", y); // Log the y position of the mouse
    console.log("occlusionX", occlusion.x); // Log the x position of the occlusion
    console.log("occlusionY", occlusion.y); // Log the y position of the occlusion
    console.log("occlusionWidth", occlusion.width); // Log the width of the occlusion
    console.log("occlusionHeight", occlusion.height); // Log the height of the occlusion

    return isWithinOcclusion;
  });
  return hoveredOcclusion;
};

const getIsAboveDeleteIcon = (
  clientX: number,
  clientY: number,
  canvas: HTMLCanvasElement,
  occlusions: OcclusionInterface[],
  scale: number,
  imageRenderPosition: { x: number; y: number }
) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = (clientX - rect.left - imageRenderPosition.x) / scale;
  const mouseY = (clientY - rect.top - imageRenderPosition.y) / scale;

  for (const occlusion of occlusions) {
    // Calculate the position of the delete icon (assuming it's top-right of each occlusion)
    const iconX = occlusion.x + occlusion.width - 20 / scale; // Adjust for icon size and scale
    const iconY = occlusion.y; // Icon is aligned with the top of the occlusion
    const iconSize = 20 / scale; // Assuming a 20x20 pixel icon, adjust size based on scale

    // Check if the mouse click is within the delete icon area
    if (
      mouseX >= iconX * scale &&
      mouseX <= (iconX + iconSize) * scale &&
      mouseY >= iconY * scale &&
      mouseY <= (iconY + iconSize) * scale
    ) {
      console.log("delete icon clicked"); // Log 'delete icon clicked
      return occlusion.id; // Return the ID of the occlusion if the click is on the delete icon
    }
  }
  console.log("delete icon not clicked"); // Log 'delete icon not clicked'
  return null; // Return null if no delete icon was clicked
};

const getImageRenderScaleAndPosition = (
  _canvas: HTMLCanvasElement,
  _imageBase64: string,
  onRender: (scale: number, position: { x: number; y: number }) => void
) => {
  //   const uploadedImage = new Image();
  //   uploadedImage.onload = () => {
  //     // Calculate the best fit scale for the image
  //     const scaleWidth = canvas.width / uploadedImage.width;
  //     const scaleHeight = canvas.height / uploadedImage.height;
  //     const scale = Math.min(scaleWidth, scaleHeight); // Use the smallest scale to fit the image

  //     // Calculate center position starting from the scaled image size
  //     const x = (canvas.width - uploadedImage.width * scale) / 2;
  //     const y = (canvas.height - uploadedImage.height * scale) / 2;

  //     // Call the onRender callback with the calculated scale and position
  //     onRender(scale, { x, y });
  //   };
  //   uploadedImage.onerror = () => {
  //     console.error("Failed to load image");
  //   };
  //   uploadedImage.src = imageBase64; // Ensure this is the last thing set in this block
  onRender(1, { x: 0, y: 0 });
};

const ImageOcclusionEditor: React.FC<ImageOcclusionEditorProps> = ({
  image,
  initialOcclusions = [],
  mode = "base64", // i set base64 as a default but you can change it to "url" if necessary
  onSave,
  onClose,
}) => {
  /**
   * State
   */

  const [occlusionAreas, setOcclusionAreas] =
    useState<OcclusionInterface[]>(initialOcclusions);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imageBase64, setImageBase64] = useState<string>("");
  const [imageRenderScale, setImageRenderScale] = useState<number>(5);
  const [imageRenderPosition, setImageRenderPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [selectedOcclusionId, setSelectedOcclusionId] = useState<string | null>(
    null
  );
  const [hoverOcclusion, setHoverOcclusion] =
    useState<OcclusionInterface | null>(null);

  const canvasElementRef = useRef<HTMLCanvasElement>(null);

  /**
   * Handlers
   */

  const getNewOcclusion = (
    mouseX: number,
    mouseY: number,
    canvasBoundingBox: DOMRect
  ) => {
    const startX =
      (mouseX - canvasBoundingBox.left - imageRenderPosition.x) /
      (imageRenderScale * imageRenderScale);
    const startY =
      (mouseY - canvasBoundingBox.top - imageRenderPosition.y) /
      (imageRenderScale * imageRenderScale);

    console.log("MOCKKKKK\n\n", startX, startY, "\n\n");
    return {
      x: startX,
      y: startY,
      width: 0,
      height: 0,
      id: Math.random().toString(),
    };
  };

  const getSelectedOcclusionId = (clientX: number, clientY: number) => {
    if (!canvasElementRef.current) return null;
    const rect = canvasElementRef.current.getBoundingClientRect();
    const mouseX =
      (clientX - rect.left - imageRenderPosition.x) / imageRenderScale;
    const mouseY =
      (clientY - rect.top - imageRenderPosition.y) / imageRenderScale;

    const clickedOcclusion = occlusionAreas.find(
      (occlusion) =>
        mouseX >= occlusion.x * imageRenderScale &&
        mouseX <= (occlusion.x + occlusion.width) * imageRenderScale &&
        mouseY >= occlusion.y * imageRenderScale &&
        mouseY <= (occlusion.y + occlusion.height) * imageRenderScale
    );

    return clickedOcclusion?.id || null;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const hoveredOcclusion = canvasElementRef.current
      ? getIsAboveOcclusionArea(
          e.clientX,
          e.clientY,
          canvasElementRef.current,
          occlusionAreas,
          imageRenderScale,
          imageRenderPosition
        )
      : null;
    setHoverOcclusion(hoveredOcclusion || null);

    if (!isDrawing || !canvasElementRef.current) return;

    const canvasBoundingBox = canvasElementRef.current.getBoundingClientRect();
    const endX =
      (e.clientX - canvasBoundingBox.left - imageRenderPosition.x) /
      (imageRenderScale * imageRenderScale);
    const endY =
      (e.clientY - canvasBoundingBox.top - imageRenderPosition.y) /
      (imageRenderScale * imageRenderScale);

    setOcclusionAreas((areas) =>
      areas.map((area, index) =>
        index === areas.length - 1
          ? {
              ...area,
              width: endX - area.x,
              height: endY - area.y,
            }
          : area
      )
    );
  };

  const handleZoom = (zoomIn: boolean) => {
    if (!canvasElementRef.current) return;
    const canvas = canvasElementRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Clear the canvas
    ctx.clearRect(0, 0, 20000, 20000);

    // Adjust scale
    const scaleFactor = zoomIn ? 1.1 : 1 / 1.1; // Zoom in or out
    setImageRenderScale((prevScale) => {
      const newScale = prevScale * scaleFactor;
      // Apply scale transform
      ctx.setTransform(newScale, 0, 0, newScale, 0, 0);

      // Redraw everything
      drawImage(ctx, imageBase64, newScale, { x: 0, y: 0 }, (image) => {
        setImageDimensions({
          width: image.width,
          height: image.height,
        });
        drawOcclusions(
          ctx,
          occlusionAreas,
          newScale,
          { x: 0, y: 0 },
          selectedOcclusionId
        );
      });

      return newScale;
    });
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (!canvasElementRef.current) return;
    const isAboveOcclusionArea = getIsAboveOcclusionArea(
      e.clientX,
      e.clientY,
      canvasElementRef.current,
      occlusionAreas,
      imageRenderScale,
      imageRenderPosition
    );

    if (!isAboveOcclusionArea) {
      const occlusion = getNewOcclusion(
        e.clientX,
        e.clientY,
        canvasElementRef.current.getBoundingClientRect() as DOMRect
      );
      setIsDrawing(true);
      setOcclusionAreas((areas) => [...areas, occlusion]);
      setSelectedOcclusionId(null);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasElementRef.current) return;
    const occlusionId = getSelectedOcclusionId(e.clientX, e.clientY);
    const deleteOcclusionId = getIsAboveDeleteIcon(
      e.clientX,
      e.clientY,
      canvasElementRef.current,
      occlusionAreas,
      imageRenderScale,
      imageRenderPosition
    );
    if (deleteOcclusionId)
      setOcclusionAreas(
        occlusionAreas.filter((area) => area.id !== deleteOcclusionId)
      );
    else setSelectedOcclusionId(occlusionId);
  };

  const handlSave = () =>
    onSave({ occlusions: occlusionAreas, imageSize: imageDimensions });

  const handleResize = useCallback(() => {
    const canvas = canvasElementRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentNode as HTMLElement;
    if (container) {
      const parentWidth = container.clientWidth;
      const height = parentWidth * (9 / 16);

      canvas.width = parentWidth;
      canvas.height = height;
    }

    getImageRenderScaleAndPosition(
      canvas,
      imageBase64,
      (renderScale: number, renderPosition: { x: number; y: number }) => {
        setImageRenderScale(renderScale);
        setImageRenderPosition(renderPosition);
      }
    );
  }, [imageBase64]);

  /**
   * Effects
   */

  useEffect(() => {
    if (mode === "base64") {
      setImageBase64(image);
    } else if (mode === "url") {
      getBase64FromUrl(image, (base64) => setImageBase64(base64));
    }
    handleResize();
  }, [image, mode, handleResize]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const canvas = canvasElementRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    console.log("rendering image and occlusions");

    drawImage(
      ctx,
      imageBase64,
      imageRenderScale,
      imageRenderPosition,
      (image) => {
        drawOcclusions(
          ctx,
          occlusionAreas,
          imageRenderScale,
          imageRenderPosition,
          selectedOcclusionId,
          hoverOcclusion?.id
        );
        setImageDimensions({
          width: image.width,
          height: image.height,
        });
      }
    );
  }, [
    imageBase64,
    occlusionAreas,
    imageRenderScale,
    imageRenderPosition,
    selectedOcclusionId,
    hoverOcclusion,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const deleteKeys = ["Delete", "Backspace"];
      if (deleteKeys.includes(event.key) && selectedOcclusionId) {
        setOcclusionAreas(
          occlusionAreas.filter(
            (occlusion) => occlusion.id !== selectedOcclusionId
          )
        );
        setSelectedOcclusionId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [occlusionAreas, selectedOcclusionId]);

  return (
    <Stack h="100%" style={{ overflow: "hidden" }} justify="space-between">
      <Box h="80%" style={{ overflow: "hidden" }}>
        <canvas
          ref={canvasElementRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
          style={{
            cursor: hoverOcclusion ? "pointer" : "crosshair",
            border: "1px dashed #ccc",
            width: "100%",
            borderRadius: 2,
            display: "flex",
            overflow: "hidden",
          }}
        />
      </Box>

      <Group justify="space-between">
        <Group>
          <Button
            size="xs"
            onClick={() => handleZoom(false)}
            leftSection={<IconMinus />}
          >
            Zoom Out
          </Button>
          <Button
            size="xs"
            onClick={() => handleZoom(true)}
            leftSection={<IconPlus />}
          >
            Zoom In
          </Button>
        </Group>
        <Group align="center" justify="flex-end">
          <Button leftSection={<IconX />} onClick={onClose} size="xs">
            Cancel
          </Button>
          <Button
            size="xs"
            leftSection={<IconDeviceFloppy />}
            onClick={handlSave}
          >
            Save
          </Button>
        </Group>
      </Group>
    </Stack>
  );
};

export default ImageOcclusionEditor;
