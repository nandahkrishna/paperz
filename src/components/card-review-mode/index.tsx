"use client";
import {
  Button,
  Divider,
  Group,
  Loader,
  Menu,
  Progress,
  Stack,
  Tooltip,
} from "@mantine/core";
import {
  IconCommand,
  IconDeviceFloppy,
  IconDotsVertical,
  IconPencil,
  IconPlayerPause,
  IconRotate2,
  IconRotateClockwise,
  IconX,
} from "@tabler/icons-react";
import { EditorContent } from "@tiptap/react";
import React from "react";
import { FlashcardMenu } from "../card-editor/flashcard-menu";
import EvalButtons from "./eval-buttons";
import { Tables, TablesUpdate } from "@/types/database.types";
import { getNumImagesFromHtml, getRawTextFromHtml } from "@/utils/html";
import { useFlashcardReviewMode } from "./use-card-review-mode";

export type FlashcardReviewModeProps = {
  review: Tables<"vw_final_reviews">;
  progress?: number;
  isEditing?: boolean;
  isUndoDisabled?: boolean;
  leftSection?: React.ReactNode;
  isUpdatingCardContent?: boolean;
  onSuspend?: (reviewId: string) => void;
  onUndo?: () => void;
  onAnswer?: (
    evaluation: { score: Tables<"revlogs">["evaluation"] },
    review: Tables<"vw_final_reviews">
  ) => void;
  onEdit?: () => void;
  onUpdate?: (card: TablesUpdate<"cards">) => void;
  onEditCancel?: () => void;
};

export default function FlashcardReviewMode({
  review,
  progress,
  isEditing = false,
  isUndoDisabled = false,
  isUpdatingCardContent = false,
  leftSection,
  onSuspend,
  onUndo,
  onAnswer,
  onEdit,
  onUpdate,
  onEditCancel,
}: FlashcardReviewModeProps) {
  const {
    isBackVisible,
    editorStateFront,
    editorStateBack,
    editorStateFrontOriginal,
    editorStateBackOriginal,
    isValidEdit,
    isValidEditMessage,
    handleUndo,
    handleShowAnswer,
    handleAnswer,
    handleSuspend,
    handleSkip,
    handleUpdateContent,
    handleShortcutsClick,

    handleBoldClickFront,
    handleItalicClickFront,
    prependImageFront,
    prependOccludedImageFront,

    // Back Edits
    handleBoldClickBack,
    handleItalicClickBack,
  } = useFlashcardReviewMode({
    review,
    onSuspend,
    onUndo,
    onAnswer,
    onUpdate,
  });

  const menuActions = [
    {
      children: "Undo",
      onClick: handleUndo,
      disabled: isUndoDisabled,
      leftSection: <IconRotate2 />,
    },
    {
      children: "Skip",
      onClick: handleSkip,
      leftSection: <IconRotateClockwise />,
    },
    {
      children: "Suspend",
      onClick: handleSuspend,
      leftSection: <IconPlayerPause />,
    },
    {
      children: "Edit",
      onClick: onEdit || (() => {}),
      leftSection: <IconPencil />,
    },
    {
      children: "Shortcuts",
      onClick: handleShortcutsClick,
      leftSection: <IconCommand />,
    },
  ];

  const editorFront = isEditing ? editorStateFrontOriginal : editorStateFront;
  const editorBack = isEditing ? editorStateBackOriginal : editorStateBack;

  const isBackEmpty = !(
    getRawTextFromHtml(editorBack?.getHTML()).length > 0 ||
    getNumImagesFromHtml(editorBack?.getHTML()) > 0
  );

  return (
    <Stack h="100%" w="100%">
      <Stack flex={1} p="sm" style={{ overflow: "hidden" }} w="100%">
        <Group justify="space-between" align="center">
          {leftSection}
          <Group justify="flex-end" gap={0}>
            {isEditing ? (
              <Group>
                <Button
                  variant="outline"
                  leftSection={<IconX />}
                  children="Cancel"
                  onClick={onEditCancel}
                />
                <Tooltip label={isValidEditMessage} disabled={isValidEdit}>
                  <Button
                    disabled={!isValidEdit || isUpdatingCardContent}
                    children="Save and Exit"
                    onClick={handleUpdateContent}
                    leftSection={
                      isUpdatingCardContent ? (
                        <Loader size="xs" />
                      ) : (
                        <IconDeviceFloppy />
                      )
                    }
                  />
                </Tooltip>
              </Group>
            ) : (
              <Button>Explain</Button>
            )}

            <Menu position="bottom-end" shadow="md">
              <Menu.Target>
                <Button
                  variant="transparent"
                  size="sm"
                  disabled={isEditing}
                  p={0}
                >
                  <IconDotsVertical />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {menuActions.map((props, id) => (
                  <Menu.Item key={id} {...props} />
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
        <Stack gap={10} style={{ overflow: "auto" }}>
          <EditorContent editor={editorFront} />
          {isEditing && (
            <FlashcardMenu
              textGroupProps={{
                onBoldClick: handleBoldClickFront,
                onItalicClick: handleItalicClickFront,
              }}
              imageGroupProps={{
                onImageUpload: prependImageFront,
                onOccludedImageUpload: prependOccludedImageFront,
              }}
              clozeGroupProps={{
                clozeId: clozeIdFront,
                onClozeClick: handleClozeClickFront,
                onClozeIdChange: handleClozeIdChangeFront,
              }}
            />
          )}
          {((isBackVisible && !isBackEmpty) || isEditing) && (
            <>
              <Divider orientation="horizontal" />
              <Stack>
                <EditorContent editor={editorBack} />
                {isEditing && (
                  <FlashcardMenu
                    textGroupProps={{
                      onBoldClick: handleBoldClickBack,
                      onItalicClick: handleItalicClickBack,
                    }}
                  />
                )}
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
      {!isEditing && (
        <Stack gap={1}>
          <EvalButtons />
          <Progress size="sm" value={progress || 0} />
        </Stack>
      )}
    </Stack>
  );
}
