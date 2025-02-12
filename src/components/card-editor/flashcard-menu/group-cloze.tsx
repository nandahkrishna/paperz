import {
  ActionIcon,
  Box,
  Group,
  rem,
  Select,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { ClozeID } from "../use-flashcard-editor";
import { CLOZE_COLOR_MAP } from "@/config/const";

export type ClozeGroupProps = {
  clozeId: ClozeID;
  onClozeClick: () => void;
  onClozeIdChange: (id: ClozeID) => void;
};

export default function ClozeGroup({
  clozeId,
  onClozeClick,
  onClozeIdChange,
}: ClozeGroupProps) {
  const theme = useMantineTheme();

  const clozeIds = Object.values(ClozeID).map((highlightStr) => ({
    value: highlightStr,
    label: highlightStr.replace("highlight-", "").toString(),
  }));

  const renderOption = (highlightStr: ClozeID) => (
    <Group gap="xs">
      <Box
        w={rem(12)}
        h={rem(12)}
        style={(theme) => ({
          backgroundColor: CLOZE_COLOR_MAP[highlightStr],
          borderRadius: theme.radius.xl,
          border: `1px solid ${theme.colors.gray[3]}`,
        })}
      />
      <Text size="xs">{highlightStr.replace("highlight-", "")}</Text>
    </Group>
  );

  const menuButtonStyle = {
    size: "xs",
    variant: "subtle",
    color: theme.primaryColor || "red",
  };

  return (
    <Group>
      <Tooltip label={"Cloze"}>
        <ActionIcon {...menuButtonStyle} onClick={onClozeClick}>
          <Text>[..]</Text>
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Change index">
        <Select
          value={clozeId}
          onChange={(value) => onClozeIdChange(value as ClozeID)}
          data={clozeIds}
          size="xs"
          renderOption={(option) =>
            renderOption(option.option.value as ClozeID)
          }
          placeholder="Select highlight"
          leftSection={
            <Box
              w={rem(12)}
              h={rem(12)}
              style={(theme) => ({
                backgroundColor: CLOZE_COLOR_MAP[clozeId as ClozeID],
                borderRadius: theme.radius.xl,
                border: `1px solid ${theme.colors.gray[3]}`,
              })}
            />
          }
          p={0}
          m={0}
          radius={theme.radius.lg}
          styles={{
            input: {
              minHeight: rem(24),
              height: rem(24),
              // backgroundColor: theme.colors.charcoal[0],
              paddingRight: rem(24),
              paddingLeft: rem(24),
              width: rem(70),
            },
          }}
        />
      </Tooltip>
    </Group>
  );
}
