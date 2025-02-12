"use client";
import { Tables } from "@/types/database.types";
import { Pagination, Stack } from "@mantine/core";
import { CardsFilter, CardsFilterProps } from "../card-filter";
import useCardFilter, { CardSearchParams } from "../card-filter/useCardFilter";
import { FlashcardEditor, FlashcardEditorProps } from "../../card-editor";

const PAGE_SIZE = 20;

export type CardViewerProps = {
  decks: Tables<"vw_final_decks">[];
  cards: Tables<"vw_final_cards">[];
  searchParams: CardSearchParams;
  flashcardEditorProps?: Partial<FlashcardEditorProps>;
  cardsFilterProps?: Partial<CardsFilterProps>;
};

export function CardViewer({
  cards,
  decks,
  searchParams,
  flashcardEditorProps,
  cardsFilterProps,
}: CardViewerProps) {
  const totalPages =
    (decks.find((deck) => deck._id === searchParams.deckId)?.numCards || 0) /
    PAGE_SIZE;
  const page = parseInt(searchParams.page || "1");

  const { handleDeckChange, handlePageChange } = useCardFilter({
    searchParams,
  });

  return (
    <Stack h={"100%"} w={"100%"} style={{ overflow: "hidden" }}>
      <CardsFilter
        decks={decks}
        searchParams={searchParams}
        onDeckChange={handleDeckChange}
        isDeleteVisible={false}
        {...cardsFilterProps}
      />
      <Stack flex={1} w={"100%"} style={{ overflow: "auto" }}>
        {cards.map((card) => (
          <FlashcardEditor
            key={card._id}
            card={card}
            initMode="view"
            {...flashcardEditorProps}
          />
        ))}
      </Stack>
      <Pagination
        value={page + 1}
        onChange={(value) => handlePageChange(value - 1)}
        total={totalPages}
      />
    </Stack>
  );
}
