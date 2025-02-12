"use client";
import { createDeck } from "@/lib/actions/decks";
import { Tables, TablesInsert } from "@/types/database.types";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContextModalProps } from "@mantine/modals";
import { User } from "@supabase/supabase-js";

export interface CreateDeckModalProps {
  user: User;
  decks: Tables<"vw_final_decks">[];
}

export const CreateDeckModal = ({
  context,
  innerProps,
}: ContextModalProps<CreateDeckModalProps>) => {
  const form = useForm<TablesInsert<"decks">>({
    initialValues: {
      title: "",
      userId: innerProps.user.id,
    },
    validate: {
      title: (value) => {
        if (!value) return "Title is required";
        if (innerProps.decks.map((deck) => deck.title).includes(value))
          return "This title is already taken";
        return null;
      },
    },
  });

  const handleSubmit = form.onSubmit(async (deckData) => {
    await createDeck(deckData);
    context.closeAll();
  });

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput
          label="Deck Title"
          placeholder="Enter deck title"
          required
          {...form.getInputProps("title")}
        />

        <Button type="submit" fullWidth loading={form.submitting}>
          Create Deck
        </Button>
      </Stack>
    </form>
  );
};
