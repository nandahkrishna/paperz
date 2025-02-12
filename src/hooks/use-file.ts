import { useRef } from "react";

export const useFile = () => {
  const triggerFileSelect = () => {
    // Ensure fileInputRef.current is not null before calling click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  return {
    fileInputRef,
    triggerFileSelect,
  };
};
