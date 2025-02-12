"use client";

import { EditorContent } from "@tiptap/react";

import useFlashcardEditor from "./use-flashcard-editor";
import {
  ActionIcon,
  Group,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import TPaper from "../ui/paper";
import { FlashcardMenu } from "./flashcard-menu";
import { Tables, TablesUpdate } from "@/types/database.types";
import { deleteCards, updateCard } from "@/lib/actions/cards";
import { useDebouncedCallback, useMounted } from "@mantine/hooks";
import { useState, useTransition } from "react";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";
import { getRawTextFromHtml } from "@/utils/html";
import "./flashcard-editor.css";

export type FlashcardEditorProps = {
  card: Tables<"vw_final_cards">;
  initMode?: "edit" | "view";
  isModeChangeVisible?: boolean;
  isDeleteVisible?: boolean;
};

export const FlashcardEditor = ({
  card,
  // UI config
  initMode = "edit",
  isModeChangeVisible = true,
  isDeleteVisible = true,
}: FlashcardEditorProps) => {
  // Hooks
  const theme = useMantineTheme();
  const isMounted = useMounted();

  const [isUpdating, startTransition] = useTransition();
  const [isDeleting, startDeletingTransition] = useTransition();
  const [mode, setMode] = useState(initMode);
  const handleDebouncedSave = useDebouncedCallback(
    async (card: TablesUpdate<"cards"> & { _id: string; deckId: string }) => {
      // updateCard(card);
      startTransition(() => {
        updateCard({ card });
      });
    },
    // Debounce for 500ms
    500
  );

  const {
    editor: editorFront,
    toggleBold: toggleBoldFront,
    toggleItalic: toggleItalicFront,
    toggleCloze: toggleClozeFront,
    clozeId: clozeIdFront,
    setClozeId: setClozeIdFront,
    prependImage: prependImageFront,
    prependOccludedImage: prependOccludedImageFront,
  } = useFlashcardEditor({
    initHtml: card.editorStateFront as string,
    onContentChange: (editorStateFront: string) => {
      handleDebouncedSave({
        _id: card._id as string,
        deckId: card.deckId as string,
        editorStateFront,
      });
    },
  });

  const {
    editor: editorBack,
    toggleBold: toggleBoldBack,
    toggleItalic: toggleItalicBack,
  } = useFlashcardEditor({
    initHtml: card.editorStateBack as string,
    onContentChange: (editorStateBack: string) => {
      handleDebouncedSave({
        _id: card._id as string,
        deckId: card.deckId as string,
        editorStateBack,
      });
    },
  });

  if (!isMounted) {
    return null;
  }

  return (
    <TPaper
      style={{
        height: "100%",
        width: "100%",
        overflow: "auto",
        cursor: mode === "view" ? "pointer" : "auto",
      }}
    >
      {/* Header */}
      <Stack gap="sm" p="sm">
        <Group
          justify="space-between"
          gap="xs"
          wrap="nowrap"
          style={{ flex: "0 1 auto", minWidth: 0 }}
          align="center"
        >
          {mode === "edit" ? (
            <Text>Front</Text>
          ) : (
            <>
              <Text size="sm" truncate>
                {getRawTextFromHtml(card.editorStateFront as string)}
              </Text>
            </>
          )}

          <Group gap="xs" wrap="nowrap" align="center">
            {isUpdating && <Loader size={theme.fontSizes.sm} />}
            {isDeleteVisible && (
              <ActionIcon
                variant="subtle"
                disabled={isDeleting}
                loading={isDeleting}
                color={theme.colors.red[6]}
                onClick={() => {
                  startDeletingTransition(() => {
                    deleteCards({
                      deckId: card.deckId as string,
                      cardIds: [card._id as string],
                    });
                  });
                }}
                size="sm"
              >
                <IconTrash />
              </ActionIcon>
            )}
            {isModeChangeVisible && (
              <ActionIcon
                variant="subtle"
                color={theme.colors.charcoal[4]}
                onClick={() =>
                  setMode((prev) => (prev === "edit" ? "view" : "edit"))
                }
                size="sm"
              >
                {mode === "edit" ? <IconChevronUp /> : <IconChevronDown />}
              </ActionIcon>
            )}
          </Group>
        </Group>

        {mode === "edit" && (
          <>
            <EditorContent editor={editorFront} style={{}} />
            <FlashcardMenu
              textGroupProps={{
                onBoldClick: toggleBoldFront,
                onItalicClick: toggleItalicFront,
              }}
              // Cloze
              clozeGroupProps={{
                clozeId: clozeIdFront,
                onClozeIdChange: setClozeIdFront,
                onClozeClick: toggleClozeFront,
              }}
              imageGroupProps={{
                onImageUpload: prependImageFront,
                onOccludedImageUpload: prependOccludedImageFront,
              }}
            />
            <Text>Back</Text>
            <EditorContent editor={editorBack} />
            <FlashcardMenu
              textGroupProps={{
                onBoldClick: toggleBoldBack,
                onItalicClick: toggleItalicBack,
              }}
            />
          </>
        )}
      </Stack>
    </TPaper>
  );
};
