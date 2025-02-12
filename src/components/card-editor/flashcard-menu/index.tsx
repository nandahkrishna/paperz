"use client";
import { Group } from "@mantine/core";
import React from "react";
import ClozeGroup, { ClozeGroupProps } from "./group-cloze";
import { TextGroup, TextGroupProps } from "./group-text";
import { ImageGroup, ImageGroupProps } from "./group-image";

export type FlashcardMenuProps = {
  textGroupProps?: TextGroupProps;
  clozeGroupProps?: ClozeGroupProps;
  imageGroupProps?: ImageGroupProps;
};

export function FlashcardMenu({
  textGroupProps,
  clozeGroupProps,
  imageGroupProps,
}: FlashcardMenuProps) {
  return (
    <Group gap="sm" align="center">
      {textGroupProps && <TextGroup {...textGroupProps} />}
      {imageGroupProps && <ImageGroup {...imageGroupProps} />}
      {clozeGroupProps && <ClozeGroup {...clozeGroupProps} />}
    </Group>
  );
}
