"use client";
import { Tables } from "@/types/database.types";
import {
  Box,
  Checkbox,
  Pagination,
  Stack,
  TableTdProps,
  TableThProps,
  Text,
  TextProps,
} from "@mantine/core";
import { PTable } from "../../paginated-table";
import { CardsFilter } from "../card-filter";
import useCardFilter, { CardSearchParams } from "../card-filter/useCardFilter";
import { getRawTextFromHtml } from "@/utils/html";
import { SplitLayout } from "../../split-layout";
import { FlashcardEditor } from "../../card-editor";

type TColumn = {
  thProps?: TableThProps; // Applied to the header <th> element
  tdProps?: (deck: Tables<"vw_final_cards">) => TableTdProps; // Applied to inner data cell <td> element
}[];

const headerStyles: TextProps = {
  fw: "bold",
  ta: "center",
};

const PAGE_SIZE = 20;

export type CardViewerProps = {
  decks: Tables<"vw_final_decks">[];
  cards: Tables<"vw_final_cards">[];
  searchParams: CardSearchParams;
};

export function CardViewer({ cards, decks, searchParams }: CardViewerProps) {
  const totalPages =
    (decks.find((deck) => deck._id === searchParams.deckId)?.numCards || 0) /
    PAGE_SIZE;
  const page = parseInt(searchParams.page || "1");

  const {
    selectedCardIds,
    handleDeckChange,
    handlePageChange,
    handleSelectedCardIdsChange,
  } = useCardFilter({
    searchParams,
  });

  const columns: TColumn = [
    {
      tdProps: (card) => ({
        align: "left",
        children: (
          <Checkbox
            aria-label="Select row"
            checked={selectedCardIds.includes(card._id as string)}
            onChange={(event) =>
              handleSelectedCardIdsChange(
                event.currentTarget.checked
                  ? [...selectedCardIds, card._id]
                  : selectedCardIds.filter((cId) => cId !== card._id)
              )
            }
          />
        ),
        width: "5%",
      }),
    },
    {
      thProps: {
        children: (
          <Text {...headerStyles} ta={"left"}>
            Front
          </Text>
        ),
      },
      tdProps: (card) => ({
        align: "left",
        children: getRawTextFromHtml(card.editorStateFront || ""),
        width: "45%",
      }),
    },
    {
      thProps: {
        children: (
          <Text {...headerStyles} ta={"left"}>
            Back
          </Text>
        ),
      },
      tdProps: (card) => ({
        align: "left",
        children: getRawTextFromHtml(card.editorStateBack || ""),
        width: "50%",
      }),
    },
  ];

  const selectedCard = selectedCardIds.length
    ? cards.find((c) => c._id == selectedCardIds[selectedCardIds.length - 1])
    : null;

  return (
    <Stack h={"100%"} w={"100%"} style={{ overflow: "hidden" }}>
      <CardsFilter
        decks={decks}
        searchParams={searchParams}
        onDeckChange={handleDeckChange}
      />

      <Box flex={1} w={"100%"} style={{ overflow: "auto" }}>
        <SplitLayout
          left={
            <Box h={"100%"} w={"100%"} style={{ overflow: "auto" }}>
              <PTable items={cards} columns={columns} isLoading={false} />
            </Box>
          }
          right={
            <Box h="100%" w="100%" style={{ overflow: "hidden" }}>
              {selectedCard && <FlashcardEditor card={selectedCard} />}
            </Box>
          }
        />
      </Box>
      <Pagination
        value={page + 1}
        onChange={(value) => handlePageChange(value - 1)}
        total={totalPages}
      />
    </Stack>
  );
}
