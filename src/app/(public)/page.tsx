import React from "react";
import { Stack, Box } from "@mantine/core";
import { PaperBrowser, PaperBrowserProps } from "@/components/paper-browser";
import { getNotes } from "@/lib/actions/papers";

const filterPapers = (papers: PaperBrowserProps["papers"], search: string) => {
  // Filter papers by search term
  return papers.filter((paper) => {
    return paper.content?.title.value
      .toLowerCase()
      .includes(search.toLowerCase());
  });
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<PaperBrowserProps["searchParams"]>;
}) {
  const awaitedSearchParams = await searchParams;
  const { search, invitation } = awaitedSearchParams;
  const notes = invitation
    ? await getNotes({
        invitation,
      })
    : [];

  const filteredPapers = filterPapers(notes, search || "");
  const totalCount = notes.length;
  const filteredCount = filteredPapers.length;

  return (
    <Stack h="100%" justify="space-between">
      <Box flex={1} style={{ overflowY: "hidden" }}>
        {/* Note how many results */}
        <PaperBrowser
          papers={filteredPapers}
          helperText={
            search
              ? `Showing ${filteredCount} out of ${totalCount} papers`
              : `${totalCount} papers found`
          }
          searchParams={awaitedSearchParams}
        />
      </Box>
      {/* <Footer /> */}
    </Stack>
  );
}
