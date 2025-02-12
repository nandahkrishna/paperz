"use server";

import { createClient } from "@/utils/supabase/server";
import { unstable_cache } from "next/cache";

// utils/supabase-server.ts
export async function getTasks() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const userId = data?.session?.user.id;
  if (!userId) return [];

  return unstable_cache(
    async () => {
      const { data: decks, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("userId", userId);
      if (error) throw error;
      return decks;
    },
    ["tasks", userId], // Include userId in cache key
    {
      revalidate: 1, // Revalidate every second
      tags: ["tasks"],
    }
  )();
}
