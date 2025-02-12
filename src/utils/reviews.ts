import { Tables, TablesInsert } from "@/types/database.types";
import { extractClozeIndex, getCardType } from "./cards";

interface ReviewConsolidationInterface {
  reviewsToAdd: TablesInsert<"reviews">[];
  reviewsToUpdate: Tables<"reviews">[];
  reviewsToDelete: Tables<"reviews">[];
}

export function consolidateNewReviewWithOldReviewsFrontBack(
  newReview: TablesInsert<"reviews">,
  oldReviews: Tables<"reviews">[]
) {
  // Return reviews to be added, updated, and deleted
  if (oldReviews.length === 0) {
    return {
      reviewsToAdd: [newReview],
      reviewsToUpdate: [],
      reviewsToDelete: [],
    };
  } else if (
    oldReviews.length === 1 &&
    getCardType(oldReviews[0].editorStateFront) === "frontback"
  ) {
    const oldReview = oldReviews[0];
    return {
      reviewsToAdd: [],
      reviewsToUpdate: [
        {
          ...oldReview,
          editorStateFront: newReview.editorStateFront,
          editorStateBack: newReview.editorStateBack,
        },
      ],
      reviewsToDelete: [],
    };
  } else {
    return {
      reviewsToAdd: [newReview],
      reviewsToUpdate: [],
      reviewsToDelete: oldReviews,
    };
  }
}

export function consolidateNewReviewWithOldReviewsCloze(
  newReviews: TablesInsert<"reviews">[],
  oldReviews: Tables<"reviews">[]
): ReviewConsolidationInterface {
  const oldClozeIds = oldReviews
    .map((review) => extractClozeIndex(review.editorStateFront))
    .flat();

  const newClozeIds = newReviews
    .map((review) => extractClozeIndex(review.editorStateFront))
    .flat();

  const reviewsToAdd: TablesInsert<"reviews">[] = [];
  const reviewsToUpdate: Tables<"reviews">[] = [];
  const reviewsToDelete: Tables<"reviews">[] = [];

  // For every new id, check if it is in the old ids, if it is, update it, if not, add it
  for (let i = 0; i < newReviews.length; i++) {
    const newClozeId = extractClozeIndex(newReviews[i].editorStateFront);
    if (newClozeId === null) continue;
    if (oldClozeIds.includes(newClozeId)) {
      // If the new review is in the old reviews, update it
      const oldReview = oldReviews.find(
        (review) => extractClozeIndex(review.editorStateFront) === newClozeId
      );
      if (!oldReview) continue;
      reviewsToUpdate.push({
        ...oldReview,
        editorStateFront: newReviews[i].editorStateFront,
        editorStateBack: newReviews[i].editorStateBack,
      });
    } else {
      // If the new review is not in the old reviews, add it
      reviewsToAdd.push(newReviews[i]);
    }
  }

  // For every old id, check if it is in the new ids, if it is not, delete it
  for (let i = 0; i < oldReviews.length; i++) {
    const oldClozeId = extractClozeIndex(oldReviews[i].editorStateFront);
    if (oldClozeId == null || !newClozeIds.includes(oldClozeId))
      reviewsToDelete.push(oldReviews[i]);
  }

  return {
    reviewsToAdd,
    reviewsToUpdate,
    reviewsToDelete,
  };
}
