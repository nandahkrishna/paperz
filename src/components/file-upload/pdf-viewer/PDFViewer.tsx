// MUI
import { Box, useMantineTheme } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";

import PDFControlBar from "./PDFControlBar";
// Components
import PDFViewerWindow from "./PDFViewerWindow";

const PDFViewer = ({
  url,
  onSelection = () => {},
  onClose = () => {},
}: {
  url: string;
  onSelection?: (selectedText: string) => void;
  onClose?: () => void;
}) => {
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  // Add this handler to scale up
  const handleScaleUp = () => {
    setScale((prevScale: number) => Math.min(2, prevScale + 0.1)); // Limiting max scale for example to 2 (200%)
    // scale.current = Math.min(2, scale.current + 0.1);
  };

  // Add this handler to scale down
  const handleScaleDown = () => {
    setScale((prevScale: number) => Math.max(0.5, prevScale - 0.1)); // Limiting min scale for example to 0.5 (50%)
    // scale.current = Math.min(2, scale.current + 0.1);
  };

  const handleMouseUp = () => {
    // Get the current selected text
    const selectedText = window.getSelection()?.toString().trim();

    // If there is text selected, call the onSelection callback
    if (selectedText && onSelection) {
      onSelection(selectedText);
    } else {
      onSelection("");
    }
  };

  const handlePageChange = useCallback((currentPage: number) => {
    setPage(currentPage + 1);
  }, []);

  const handleNumPagesChange = useCallback((numPages: number) => {
    setNumPages(numPages);
  }, []);

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const PDFViewerWindowMemoFunc = useMemo(
    () => (
      <PDFViewerWindow
        url={url}
        onClose={handleClose}
        scale={scale}
        onPageChange={handlePageChange}
        onNumPagesChange={handleNumPagesChange}
      />
    ),
    [url, scale, handleClose, handlePageChange, handleNumPagesChange]
  );

  const theme = useMantineTheme();

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: theme.colors.charcoal[6],
      }}
      onMouseUp={handleMouseUp}
    >
      <PDFControlBar
        onClose={() => onClose && onClose()}
        scale={scale}
        onScaleDown={handleScaleDown}
        onScaleUp={handleScaleUp}
        currentPage={page}
        numPages={numPages}
      />
      {PDFViewerWindowMemoFunc}
    </Box>
  );
};

export default PDFViewer;
