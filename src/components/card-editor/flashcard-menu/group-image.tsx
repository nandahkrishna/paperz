import React from "react";
import { OcclusionInterface } from "../node-occlusion/OcclusionNode";
import { useModals } from "@/modals/useModals";
import { useFile } from "@/hooks/use-file";
import { useBase64 } from "@/hooks/use-base64";
import { ActionIcon, Menu, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";

export type ImageGroupProps = {
  onImageUpload?: (image: string) => void;
  onOccludedImageUpload?: (
    src: string,
    occlusions: OcclusionInterface[],
    imageSize: { width: number; height: number }
  ) => void;
};

export const ImageGroup = ({
  onImageUpload,
  onOccludedImageUpload,
}: ImageGroupProps) => {
  const theme = useMantineTheme();

  const { handleImageOcclusion } = useModals();
  const { fileInputRef, triggerFileSelect: triggerImageFileSelect } = useFile();
  const {
    fileInputRef: occludedImageFileInputRef,
    triggerFileSelect: triggerOccludedImageFileSelect,
  } = useFile();
  const { extractBase64FromFile } = useBase64();

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (onImageUpload && event.target.files?.[0]) {
      const file = event.target.files[0];
      extractBase64FromFile({
        file,
        onBase64Extract: (base64) => onImageUpload(base64),
      });
      event.target.value = "";
    }
  };

  const handleOccludedImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      extractBase64FromFile({
        file,
        onBase64Extract: (base64) => {
          handleImageOcclusion({
            image: base64,
            onSave: (occlusions, imageSize) => {
              onOccludedImageUpload?.(base64, occlusions, imageSize);
            },
            initialOcclusions: [],
          });
        },
      });
      event.target.value = "";
    }
  };

  const menuButtonStyle = {
    size: "xs",
    variant: "subtle",
    color: theme.primaryColor || "red",
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      <input
        type="file"
        ref={occludedImageFileInputRef}
        onChange={handleOccludedImageFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />

      {onImageUpload && onOccludedImageUpload ? (
        <Menu shadow="md">
          <Menu.Target>
            <Tooltip label="Add image and occlude">
              <ActionIcon {...menuButtonStyle}>
                <IconPhoto />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={triggerImageFileSelect}>Upload image</Menu.Item>
            <Menu.Item onClick={triggerOccludedImageFileSelect}>
              Upload and occlude
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : onImageUpload ? (
        <Tooltip label="Add image">
          <ActionIcon {...menuButtonStyle} onClick={triggerImageFileSelect}>
            <IconPhoto />
          </ActionIcon>
        </Tooltip>
      ) : onOccludedImageUpload ? (
        <Tooltip label="Add occluded image">
          <ActionIcon
            {...menuButtonStyle}
            onClick={triggerOccludedImageFileSelect}
          >
            <IconPhoto />
          </ActionIcon>
        </Tooltip>
      ) : null}
    </>
  );
};
