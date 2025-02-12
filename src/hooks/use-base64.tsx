"use client";
import { useState } from "react";

export const useBase64 = () => {
  const [base64, setBase64] = useState<string | null>(null);

  const extractBase64FromFile = ({
    file,
    onBase64Extract,
  }: {
    file: File;
    onBase64Extract?: (base64: string) => void;
  }) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result as string;
      setBase64(base64Image);
      onBase64Extract && onBase64Extract(base64Image);
    };
    reader.readAsDataURL(file);
  };

  return {
    extractBase64FromFile,
  };
};
