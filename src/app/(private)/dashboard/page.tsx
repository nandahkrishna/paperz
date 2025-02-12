import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Stack } from "@mantine/core";
import { DeckHeader } from "../../../components/deck-header";
import { config } from "@/config/const";
import { DeckViewer } from "@/components/deck-viewer";
import { getDecks } from "@/lib/actions/decks";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data?.session?.user) {
    redirect(config.loginUrl);
  }
  const decks = await getDecks();

  return (
    <Stack h="100%" flex={1}>
      <DeckHeader decks={decks} user={data.session.user} />
      <DeckViewer decks={decks} />
    </Stack>
  );
}
