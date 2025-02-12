"use server";
import { Tables, TablesInsert, TablesUpdate } from "@/types/database.types";
import {
  createClozeReviewsFromCard,
  createFrontBackReviewFromCard,
  getCardType,
} from "@/utils/cards";
import {
  consolidateNewReviewWithOldReviewsCloze,
  consolidateNewReviewWithOldReviewsFrontBack,
} from "@/utils/reviews";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag, unstable_cache } from "next/cache";

type GetCardsParams = {
  deckId: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export async function getCards({
  deckId,
  page = 0,
  pageSize = 5,
  sortBy = "createdAt",
  sortOrder = "desc",
}: GetCardsParams) {
  const supabase = await createClient();
  return unstable_cache(
    async () => {
      // Calculate the range for pagination
      const start = page * pageSize;
      const end = start + pageSize - 1;

      // Build the query
      const query = supabase
        .from("vw_final_cards")
        .select("*", { count: "exact" })
        .eq("deckId", deckId)
        .order(sortBy, { ascending: sortOrder === "asc" })
        .range(start, end);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: data || [],
        count: count || 0,
        page,
        pageSize,
        hasMore: (count || 0) > (page + 1) * pageSize,
      };
    },

    [`decks/${deckId}/cards/${page}`],
    {
      revalidate: false, // Cache for 60 seconds
      tags: ["cards", `decks/${deckId}/cards`, `decks/${deckId}/cards/${page}`], // Use tags for cache invalidation
    }
  )();
}

export async function createCard(card: TablesInsert<"cards">) {
  const supabase = await createClient();

  // 1. Create card
  const resCard = await supabase.from("cards").insert(card).select().single();
  if (!resCard || resCard.error) {
    throw new Error("Error creating card");
  }
  revalidateTag(`decks/${card.deckId}/cards`);

  // 2. Create reviews
  // @ts-expect-error - We know that resCard is not null
  const reviewsToAddTotal: TablesInsert<"reviews">[] = [resCard.data].flatMap(
    (card) => {
      if (getCardType(card.editorStateFront) === "frontback")
        return [createFrontBackReviewFromCard(card as Tables<"cards">)];
      else return createClozeReviewsFromCard(card as Tables<"cards">);
    }
  );
  const resReviews = await supabase
    .from("reviews")
    .insert(reviewsToAddTotal)
    .select();
  if (!resReviews || resReviews.error) {
    throw new Error("Error creating reviews");
  }
  revalidateTag(`decks/${card.deckId}/reviews`);

  return {
    data: resCard.data,
    success: true,
  };
}

export async function updateCard({
  card,
  page,
}: {
  card: TablesUpdate<"cards"> & { _id: string; deckId: string };
  page?: number;
}) {
  // 1. Update card
  const { _id, ...cardData } = card;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cards")
    .update(cardData)
    .eq("_id", _id)
    .select();

  if (error) {
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error("Card not found");
  }
  if (page) revalidateTag(`decks/${card.deckId}/cards/${page}`);
  else revalidateTag(`decks/${card.deckId}/cards`);

  // 2. Update reviews
  const { reviewsToAddTotal, reviewsToUpdateTotal, reviewsToDeleteTotal } =
    await getReviewUpdateData([data[0]]);
  await Promise.all([
    supabase.from("reviews").insert(reviewsToAddTotal).select(),
    ...[
      reviewsToUpdateTotal.map((ru) =>
        supabase.from("reviews").update(ru).eq("_id", ru._id).select()
      ),
    ],
    supabase
      .from("reviews")
      .delete()
      .in(
        "_id",
        reviewsToDeleteTotal.map((r) => r._id)
      )
      .select(),
  ]);
  revalidateTag(`decks/${card.deckId}/reviews`);

  return {
    data: data[0],
    success: true,
  };
}

export async function deleteCards({
  deckId,
  cardIds,
}: {
  deckId: string;
  cardIds: string[];
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cards")
    .delete()
    .in("_id", cardIds)
    .select();

  if (error) {
    throw error;
  }

  revalidateTag(`decks/${deckId}/cards`);
  revalidateTag(`decks/${deckId}/reviews`);

  return {
    data,
    success: true,
  };
}

async function getReviewUpdateData(cards: Tables<"cards">[]) {
  const supabase = await createClient();

  const reviewsToAddTotal: TablesInsert<"reviews">[] = [];
  const reviewsToUpdateTotal: Tables<"reviews">[] = [];
  const reviewsToDeleteTotal: Tables<"reviews">[] = [];

  for (const card of cards) {
    const oldReviews = await supabase
      .from("reviews")
      .select()
      .eq("cardId", card._id);

    let reviewsToAdd: TablesInsert<"reviews">[] = [];
    let reviewsToUpdate: Tables<"reviews">[] = [];
    let reviewsToDelete: Tables<"reviews">[] = [];

    if (getCardType(card.editorStateFront) === "frontback") {
      const newReview = createFrontBackReviewFromCard(card);
      ({ reviewsToAdd, reviewsToUpdate, reviewsToDelete } =
        consolidateNewReviewWithOldReviewsFrontBack(newReview, oldReviews));
    } else {
      const newReviews = createClozeReviewsFromCard(card);
      ({ reviewsToAdd, reviewsToUpdate, reviewsToDelete } =
        consolidateNewReviewWithOldReviewsCloze(newReviews, oldReviews));
    }
    reviewsToAddTotal.push(...reviewsToAdd);
    reviewsToUpdateTotal.push(...reviewsToUpdate);
    reviewsToDeleteTotal.push(...reviewsToDelete);
  }

  return {
    reviewsToAddTotal,
    reviewsToUpdateTotal,
    reviewsToDeleteTotal,
  };
}
