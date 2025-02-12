import { Split } from "@gfazioli/mantine-split-pane";
import { useMantineTheme } from "@mantine/core";
import React from "react";

export function SplitLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const theme = useMantineTheme();
  return (
    <Split
      hoverColor={theme.primaryColor}
      style={{ height: "100%", overflow: "hidden" }}
      spacing="md"
    >
      <Split.Pane initialWidth="65%">{left}</Split.Pane>
      <Split.Pane initialWidth="35%" grow>
        {right}
      </Split.Pane>
    </Split>
  );
}
