"use client";
import { Box, useMantineTheme } from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { Document, pdfjs } from "react-pdf";
// CSS
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Components
import PDFPages from "./PDFPages";

// Assuming pdfjs is defined somewhere globally or imported appropriately
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const PDFViewerWindow = ({
  url,
  scale = 1,
  onError = () => {},
  onNumPagesChange = () => {},
  onPageChange = () => {},
}: {
  url: string;
  scale?: number;
  onClose?: any;
  onError?: any;
  onNumPagesChange?: any;
  onPageChange?: any;
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  function handleDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setIsLoading(false);
    onNumPagesChange(numPages);
    setNumPages(numPages);
  }

  const handleDocumentError = useCallback(
    (error: any) => {
      onError(error);
    },
    [onError]
  );

  const theme = useMantineTheme();

  return (
    <Box
      ref={containerRef}
      style={{
        height: "100%", // Using 100% of the viewport height
        width: "100%", // Using 100% of the viewport width
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: theme.colors.dark[4],
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Document
        file={url}
        onLoadSuccess={handleDocumentLoadSuccess}
        onError={handleDocumentError}
      >
        {isLoading ? (
          <div>Loading PDF...</div>
        ) : (
          <PDFPages
            height={dimensions.height}
            width={dimensions.width}
            numItems={numPages || 0}
            scale={scale}
            onPageChange={onPageChange}
          />
        )}
      </Document>
    </Box>
  );
};

export default PDFViewerWindow;
