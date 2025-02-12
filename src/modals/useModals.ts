import { modals } from "@mantine/modals";

import { CreateDeckModalProps } from "./CreateDeckModal";
import { ImageOcclusionModalProps } from "./ImageOcclusionModal";

const stylesCommon = {
  header: {
    minHeight: 0,
  },
};

const configCommon = {
  centered: true,
  withCloseButton: false,
  styles: stylesCommon,
  innerProps: {},
};

export const useModals = () => {
  const handleCreateDeckModal = (innerProps: CreateDeckModalProps) => {
    modals.openContextModal({
      ...configCommon,
      modal: "createDeck",
      title: "Create Deck",
      innerProps,
    });
  };

  const handleImageOcclusion = (innerProps: ImageOcclusionModalProps) => {
    modals.openContextModal({
      ...configCommon,
      modal: "imageOcclusion",
      title: "Image Occlusion",
      centered: true,
      innerProps,
      styles: {
        ...stylesCommon,
        body: {
          height: "70vh",
          width: "70vw",
        },
      },
      size: "auto",
    });
  };

  return {
    handleCreateDeckModal,
    handleImageOcclusion,
  };
};
