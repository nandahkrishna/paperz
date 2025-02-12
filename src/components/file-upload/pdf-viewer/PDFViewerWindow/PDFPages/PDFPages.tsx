"use client";
import { Box } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { CSSProperties } from "react";
import { Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { VariableSizeList as List } from "react-window";
// Constants
import { INITIAL_PAGES_THRESHOLD, OVERSCAN_COUNT } from "@/config/const";

// CSS
import "./PDFPages.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFPages = ({
  numItems,
  height,
  width,
  scale = 1,
  onPageChange = () => {},
}: {
  numItems: number;
  height: number;
  width: number;
  scale?: number;
  onPageChange?: (pageIndex: number) => void;
}) => {
  const [displayPages, setDisplayPages] = useState(false);
  const loadSuccessCounter = useRef(0);
  const scaleChanged = useRef(false);
  const visiblePageIndex = useRef(0);
  const [scaleState, setScaleState] = useState(scale);

  const listRef = useRef<List>(null);
  const pageHeights = React.useRef<number[]>([]);

  useEffect(() => {
    setScaleState(scale);
  }, [scale]);

  const Row = ({ index, style }: { index: number; style: CSSProperties }) => {
    const handlePageLoadSuccess = ({ height }: { height: number }) => {
      const scaledHeight = height;

      pageHeights.current[index] = scaledHeight;
      if (listRef.current) {
        listRef.current.resetAfterIndex(index, true);
        // This will scroll to the top of the remembered page after scaling.
      }
      scaleChanged.current = false;

      // Increment the counter
      loadSuccessCounter.current += 1;

      const nPages = numItems ? numItems : INITIAL_PAGES_THRESHOLD;

      // Check if we've reached 10 load success calls
      if (
        loadSuccessCounter.current + 1 >=
        Math.min(INITIAL_PAGES_THRESHOLD, Math.max(nPages, 1))
      ) {
        setDisplayPages(true);
      }
    };

    return (
      <Box
        key={`page_${index + 1}`}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...style,
        }}
      >
        <Page
          pageNumber={index + 1}
          className={displayPages ? "page-visible" : "page-hidden"}
          onLoadSuccess={handlePageLoadSuccess}
          scale={scaleState}
        />
      </Box>
    );
  };

  const getPageHeight = (index: number) => {
    let _height = 100;
    // If pageHeights has a value for the index, return it
    if (pageHeights.current[index - 1]) {
      _height = pageHeights.current[index - 1];
    }

    // Else, use the median value of the first 10 pages as the initial estimate
    if (pageHeights.current.length >= 3) {
      const middle = Math.floor(pageHeights.current.length / 2);
      const median =
        pageHeights.current.length % 2 === 0
          ? (pageHeights.current[middle - 1] + pageHeights.current[middle]) / 2
          : pageHeights.current[middle];
      _height = median;
    }

    if (pageHeights.current.length === 2) {
      _height = pageHeights.current[1];
    }

    if (pageHeights.current.length === 1) {
      _height = pageHeights.current[0];
    }

    return _height;
  };

  return (
    <List
      overscanCount={OVERSCAN_COUNT}
      itemCount={numItems || 0}
      itemSize={getPageHeight}
      height={height}
      width={width}
      ref={listRef}
      onItemsRendered={({ visibleStartIndex }) => {
        onPageChange && onPageChange(visibleStartIndex);
        visiblePageIndex.current = visibleStartIndex;
      }}
    >
      {Row}
    </List>
  );
};

export default PDFPages;
