"use client";
import { ContextModalProps } from "@mantine/modals";

import ImageOcclusionEditor from "@/components/image-editor";
import {
  ImageSizeInterface,
  OcclusionInterface,
} from "@/components/card-editor/node-occlusion/OcclusionNode";

export interface ImageOcclusionModalProps {
  image: string;
  initialOcclusions?: OcclusionInterface[];
  onSave: (
    occlusions: OcclusionInterface[],
    imageSize: { width: number; height: number }
  ) => void;
}

export const ImageOcclusionModal = ({
  context,
  innerProps,
}: ContextModalProps<ImageOcclusionModalProps>) => {
  const handleSave = ({
    occlusions,
    imageSize,
  }: {
    occlusions: OcclusionInterface[];
    imageSize: ImageSizeInterface;
  }) => {
    innerProps.onSave(occlusions, imageSize);
    context.closeAll();
  };
  return (
    <ImageOcclusionEditor
      image={innerProps.image}
      onSave={handleSave}
      initialOcclusions={innerProps.initialOcclusions}
      onClose={() => context.closeAll()}
    />
  );
};
