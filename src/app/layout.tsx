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

export const metadata = {
  title: "Dekki",
  description: "Learn More, Study Less",
};

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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
