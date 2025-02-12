// MUI
"use client";
import { Box, Text, Title } from "@mantine/core";
import { IconCloudUpload } from "@tabler/icons-react";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
// Components
// import PDFViewer from "./PDFViewerNew";
import PDFViewer from "@/components/file-upload/pdf-viewer";

export default function FileUpload({
  onUpload,
  onClose,
  onSelection,
}: {
  onUpload?: (file: File) => void;
  onClose?: () => void;
  onSelection?: (selection: string) => void;
}) {
  const [fileURL, setFileURL] = React.useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const url = URL.createObjectURL(acceptedFiles[0]);
      setFileURL(url);
      if (onUpload) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  const handleClose = () => {
    setFileURL(null);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {fileURL ? (
        <Box
          style={{
            overflow: "auto",
            height: "100%",
          }}
        >
          <PDFViewer
            url={fileURL}
            onClose={handleClose}
            onSelection={onSelection}
          />
        </Box>
      ) : (
        <Box
          style={{
            height: "100%",
            borderRadius: 2,
            border: isDragActive
              ? "3px solid rgba(63, 81, 181, 0.5)" // Active border color
              : "2px dashed rgba(128, 128, 128, 0.3)",
            backgroundColor: isDragActive
              ? "rgba(63, 81, 181, 0.1)" // Active background color
              : "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            cursor: "pointer", // Change the cursor to pointer
          }}
          {...getRootProps()}
        >
          <IconCloudUpload size={50} color={isDragActive ? "blue" : "gray"} />
          <Title order={4} c={isDragActive ? "blue" : "gray"}>
            {isDragActive ? "Drop files here" : "Drag & Drop PDF file"}
          </Title>
          {fileRejections.length > 0 && (
            <Text c="red" style={{ marginTop: "1rem" }}>
              Invalid file type. Please upload a PDF.
            </Text>
          )}
          <input {...getInputProps()} />
        </Box>
      )}
    </>
  );
}
