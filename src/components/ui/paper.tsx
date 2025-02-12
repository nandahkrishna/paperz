"use client";
import {
  Paper,
  PaperProps,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";

type TPaperProps = PaperProps & { children?: ReactNode };

export default function TPaper(props: TPaperProps) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Paper
      {...props}
      style={{
        // Add styles from props.style
        ...props.style,
        backgroundColor:
          colorScheme === "dark" ? theme.colors.dark[7] : "#F7F7F7",
        border: `1px solid ${
          colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[2]
        }`,
      }}
    />
  );
}
