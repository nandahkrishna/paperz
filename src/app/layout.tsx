// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@gfazioli/mantine-split-pane/styles.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "@/config/theme";
import { CreateDeckModal } from "@/modals/CreateDeckModal";
import { ModalsProvider } from "@mantine/modals";
import { ImageOcclusionModal } from "@/modals/ImageOcclusionModal";

export const metadata = {
  title: "Dekki",
  description: "Learn More, Study Less",
};

const modals = {
  // deleteUser: DeleteUserModal,
  // batchAction: BatchActionModal,
  createDeck: CreateDeckModal,
  // deleteDeck: DeleteDeckModal,
  imageOcclusion: ImageOcclusionModal,
  // renameDeck: RenameDeckModal,
  // publishDeck: PublishDeckModal,
  // deckStats: DeckStatsModal,
  // subscription: SubscriptionModal,
  // manageSubscription: ManageSubscriptionModal,
  // previewDeck: PreviewDeckModal,
  // kbdShortcuts: KeyboardShortcutsModal,
};

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof modals;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <ModalsProvider modals={modals}>{children}</ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
