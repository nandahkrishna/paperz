"use client";
import { Tables } from "@/types/database.types";
import React, { memo, useCallback, useState } from "react";
import { SplitLayout } from "../split-layout";
import { Button, Stack } from "@mantine/core";
import { CardSearchParams } from "../card-browser/card-filter/useCardFilter";
import FileUpload from "../file-upload";
import { CardViewer } from "../card-browser/list";

type FlashcardCreatorProps = {
  decks: Tables<"vw_final_decks">[];
  cards: Tables<"vw_final_cards">[];
  searchParams: CardSearchParams;
};

const MemoizedFileUpload = memo(FileUpload);

export default function FlashcardCreator({
  decks,
  cards,
  searchParams,
}: FlashcardCreatorProps) {
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const handleSelection = useCallback((text: string) => {
    setSelectedText(text);
    console.log(text);
  }, []); // Empty dependency array since it only depends on setSelectedText which is stable

  return (
    <SplitLayout
      left={
        <Stack w="100%">
          <MemoizedFileUpload onSelection={handleSelection} />
          <Button disabled={!selectedText}>Generate</Button>
        </Stack>
      }
      right={
        <CardViewer
          decks={decks}
          cards={cards}
          searchParams={searchParams}
          cardsFilterProps={{
            isDeleteVisible: false,
          }}
        />
      }
    />
  );
}
