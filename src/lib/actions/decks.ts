"use server";

import { Tables, TablesInsert } from "@/types/database.types";
import { createClient } from "@/utils/supabase/server";
import { revalidateTag, unstable_cache } from "next/cache";

// utils/supabase-server.ts
export async function getDecks() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const userId = data?.session?.user.id;
  if (!userId) return [];

  return unstable_cache(
    async () => {
      const { data: decks, error } = await supabase
        .from("vw_final_decks")
        .select("*")
        .eq("userId", userId);
      if (error) throw error;
      return decks;
    },
    ["decks"],
    {
      revalidate: false,
      tags: ["decks"],
    }
  )();
}



export async function createDeck(deck: TablesInsert<"decks">) {
  const supabase = await createClient();
  const { error } = await supabase.from("decks").insert(deck);
  if (error) throw error;
  revalidateTag("decks");
}

export async function deleteDeck(deckId: Tables<"decks">["_id"]) {
  const supabase = await createClient();
  const { error } = await supabase.from("decks").delete().eq("_id", deckId);
  if (error) throw error;
  revalidateTag("decks");
}
