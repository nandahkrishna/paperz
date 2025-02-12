"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getCommunityDecks() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const userId = data?.session?.user.id;
  if (!userId) return [];

  return unstable_cache(
    async () => {
      const { data: decks, error } = await supabase
        .from("vw_final_community_decks")
        .select("*")
        .eq("viewerId", userId);
      if (error) throw error;
      return decks;
    },
    ["community"],
    {
      revalidate: false,
      tags: ["community"],
    }
  )();
}

export type SubscriptionParams = {
  communityDeckId: string;
};

export async function subscribeToDeck({ communityDeckId }: SubscriptionParams) {
  // const supabase = await createClient();
  // const { data: authData } = await supabase.auth.getSession();
  // const target_user_id = authData?.session?.user.id;
  // const { data, error } = await supabase.rpc("subscribe_to_deck", {
  //   source_deck_id: communityDeckId,
  //   target_user_id,
  // });
  // if (error) throw error;
  // revalidateTag("decks");
  // revalidateTag("community");
  // return data;

  // Create a task with sourceDeckId and targetUserId
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getSession();
  const targetUserId = authData?.session?.user.id;
  if (!targetUserId) return;
  const { data, error } = await supabase.from("tasks").insert({
    name: "subscribe_deck",
    userId: targetUserId,
    parameters: JSON.stringify({ communityDeckId }),
  });
  if (error) throw error;
  revalidateTag("decks");
  revalidateTag("community");
  return data;
}

export async function unsubscribeFromDeck({
  communityDeckId,
}: {
  communityDeckId: string;
}) {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getSession();
  const userId = authData?.session?.user.id;
  if (!userId) return;
  const { data, error } = await supabase
    .from("vw_final_subscriptions")
    .select("*")
    .eq("communityDeckId", communityDeckId)
    .eq("userId", userId)
    .maybeSingle();
  if (error) throw error;

  // Now delete the deck
  await supabase
    .from("decks")
    .delete()
    .eq("_id", data?.subscriptionDeckId as string);

  revalidateTag("decks");
  revalidateTag("community");
  return data;
}
