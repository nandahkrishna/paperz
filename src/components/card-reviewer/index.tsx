"use client";
import { Tables } from "@/types/database.types";
import React from "react";
import TPaper from "../ui/paper";
import { Stack, Title } from "@mantine/core";
import FlashcardReviewMode from "../card-review-mode";

export type ReviewerProps = {
  deckId: string;
  reviews: Tables<"vw_final_reviews">[];
};

export default function FlashcardReviewer({ deckId, reviews }: ReviewerProps) {
  const currentReview = reviews[0];

  return (
    <TPaper h="100%" w="100%">
      <Stack h="100%" w="100%">
        <Title order={3}>Reviews ({reviews.length})</Title>
        <FlashcardReviewMode review={currentReview} />
      </Stack>
    </TPaper>
  );
}
