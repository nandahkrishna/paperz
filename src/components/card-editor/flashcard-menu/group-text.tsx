"use client";
import { ActionIcon, Group, Tooltip, useMantineTheme } from "@mantine/core";
import { IconBold, IconItalic } from "@tabler/icons-react";
import React from "react";

export type TextGroupProps = {
  onBoldClick?: () => void;
  onItalicClick?: () => void;
  onClozeClick?: () => void;
};

export function TextGroup({ onBoldClick, onItalicClick }: TextGroupProps) {
  const theme = useMantineTheme();
  const actions = [
    {
      icon: <IconBold />,
      label: "Bold",
      onClick: onBoldClick,
    },
    {
      icon: <IconItalic />,
      label: "Italic",
      onClick: onItalicClick,
    },
  ];

  const menuButtonStyle = {
    size: "xs",
    variant: "subtle",
    color: theme.primaryColor || "red",
  };

  return (
    <Group gap={theme.spacing.sm} align="center">
      {/* Text */}
      {actions.map(({ icon, label, onClick }) => (
        <React.Fragment key={label}>
          {onClick && (
            <Tooltip label={label}>
              <ActionIcon {...menuButtonStyle} onClick={onClick}>
                {icon}
              </ActionIcon>
            </Tooltip>
          )}
        </React.Fragment>
      ))}
    </Group>
  );
}
