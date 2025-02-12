"use client";
import { useModals } from "@/modals/useModals";
import { Tables } from "@/types/database.types";
import { Group, Title, Button } from "@mantine/core";
import { User } from "@supabase/supabase-js";

export const DeckHeader = ({
  decks,
  user,
}: {
  decks: Tables<"vw_final_decks">[];
  user: User;
}) => {
  const { handleCreateDeckModal } = useModals();
  return (
    <Group justify="space-between">
      <Title order={2}>Decks ({decks?.length})</Title>
      <Button onClick={() => handleCreateDeckModal({ user, decks })}>
        New Deck
      </Button>
    </Group>
  );
};
