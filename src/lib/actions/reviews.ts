import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";

export async function getReviews({ deckId }: { deckId: string }) {
  const supabase = await createClient();

  return unstable_cache(
    async () => {
      const { data: decks, error } = await supabase
        .from("vw_final_reviews_due_eod")
        .select("*")
        .eq("deckId", deckId);
      if (error) throw error;
      return decks;
    },
    [`decks/${deckId}/reviews`],
    {
      revalidate: false,
      tags: [`decks/${deckId}/reviews`],
    }
  )();
}
