// ConferencePapers.tsx
"use client";
import {
  Select,
  Title,
  Text,
  Stack,
  Container,
  Anchor,
  Card,
} from "@mantine/core";
import usePapers from "./usePapers";
import { Note } from "@/lib/actions/papers";

// dict_keys(['title', 'authors', 'authorids', 'keywords', 'TLDR', 'abstract', 'primary_area', 'venue', 'venueid', 'pdf', '_bibtex', 'paperhash'])
export type PaperBrowserProps = {
  papers: Note[];
  searchParams: { invitation?: string };
};

export function PaperBrowser({ papers, searchParams }: PaperBrowserProps) {
  const { conferences, handleConferenceChange } = usePapers({ searchParams });

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1}>Conference Papers</Title>

        <Select
          label="Select Conference"
          placeholder="Choose a conference"
          data={conferences.map(({ label, invitation }) => ({
            label,
            value: invitation,
          }))}
          onChange={(value) => value && handleConferenceChange(value)}
        />

        <Stack gap={"md"}>
          {papers.map((paper, index) => (
            <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
              <Stack>
                <Title order={5}>
                  {paper.content?.title.value || "Untitled"}
                </Title>

                <Text size="sm" c="dimmed">
                  {paper.content?.authors?.value.join(", ") ||
                    "No authors listed"}
                </Text>

                {paper.content?.abstract && (
                  <Text size="sm" lineClamp={3}>
                    {paper.content.abstract.value}
                  </Text>
                )}

                {paper.content?.pdf && (
                  <Anchor
                    href={paper.content.pdf.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                  >
                    View PDF
                  </Anchor>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}
