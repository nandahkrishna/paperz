// components/deck-selector.tsx
"use client";

import { Tables } from "@/types/database.types";
import { Button, Group, Select } from "@mantine/core";
import { CardSearchParams } from "./useCardFilter";
import { useTransition } from "react";
import { createCard, deleteCards } from "@/lib/actions/cards";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export type CardsFilterProps = {
  decks: Tables<"vw_final_decks">[];
  searchParams: CardSearchParams;
  onDeckChange: (deckId: string) => void;
  isDeleteVisible?: boolean;
  isCreateVisible?: boolean;
};

export function CardsFilter({
  decks,
  searchParams,
  onDeckChange,
  // UI config
  isDeleteVisible = true,
  isCreateVisible = true,
}: CardsFilterProps) {
  const [isDeleting, startDeletingTransition] = useTransition();
  const [isCreating, startCreatingTransition] = useTransition();
  const handleDeckChange = (value: string | null) => {
    if (!value) {
      return;
    }
    onDeckChange(value);
  };
  const cardIds = searchParams.cardIds?.split(",").filter(Boolean) || [];
  const deckId = searchParams.deckId;
  const selectedDeckId = searchParams.deckId;

  return (
    <Group justify="space-between" align="center">
      <Select
        w={300}
        placeholder="Select a deck"
        value={searchParams.deckId}
        onChange={handleDeckChange}
        data={[
          ...decks.map((deck) => ({
            value: deck._id?.toString() || "",
            label: deck.title || "",
          })),
        ]}
        radius={"xl"}
        clearable
      />
      <Group>
        {isDeleteVisible && (
          <Button
            disabled={cardIds.length === 0 || !deckId}
            loading={isDeleting}
            leftSection={<IconTrash />}
            onClick={() => {
              startDeletingTransition(() => {
                deleteCards({ deckId: deckId as string, cardIds });
              });
            }}
          >
            Delete
          </Button>
        )}
        {isCreateVisible && (
          <Button
            leftSection={<IconPlus />}
            disabled={!selectedDeckId}
            onClick={() =>
              startCreatingTransition(async () => {
                await createCard({
                  deckId: selectedDeckId as string,
                  editorStateFront: "",
                  editorStateBack: "",
                });
              })
            }
            loading={isCreating}
          >
            Card
          </Button>
        )}
      </Group>
    </Group>
  );
}
