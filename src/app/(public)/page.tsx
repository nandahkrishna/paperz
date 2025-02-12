import React from "react";
import { Stack, Box } from "@mantine/core";
import { PaperBrowser, PaperBrowserProps } from "@/components/paper-browser";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<PaperBrowserProps["searchParams"]>;
}) {
  const awaitedSearchParams = await searchParams;
  return (
    <Stack h="100%" justify="space-between">
      <Box flex={1} style={{ overflowY: "hidden" }}>
        {/* Note how many results */}
        <PaperBrowser searchParams={awaitedSearchParams} />
      </Box>
      {/* <Footer /> */}
    </Stack>
  );
}
