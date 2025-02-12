// ConferencePapers.tsx
"use client";
import {
  Title,
  Text,
  Stack,
  Anchor,
  Card,
  TextInput,
  Group,
  Autocomplete,
  Box,
} from "@mantine/core";
import usePapers from "./usePapers";
import { Note } from "@/lib/actions/papers";
import { IconBooks, IconSearch } from "@tabler/icons-react";

export type PaperBrowserProps = {
  papers: Note[];
  helperText?: string;
  searchParams: { invitation?: string; search?: string };
};

export function PaperBrowser({
  papers,
  helperText,
  searchParams,
}: PaperBrowserProps) {
  const { conferences, handleConferenceChange, handleSearchChange } = usePapers(
    { searchParams }
  );

  return (
    <Stack gap="xl" h="100%">
      {/* <Title order={1}>Conference Papers</Title> */}

      <Group align="center">
        <Autocomplete
          label="Conference"
          placeholder="Choose a conference"
          data={conferences.map(({ label, invitation }) => ({
            label,
            value: invitation,
          }))}
          onChange={(value) => {
            const conference = conferences.find((conf) => conf.label === value);
            if (conference) {
              handleConferenceChange(conference.invitation);
            }
          }}
          leftSection={<IconBooks size={16} />}
          radius="md"
        />
        <TextInput
          flex={1}
          label="Search term"
          placeholder="Search for papers"
          onChange={(event) => handleSearchChange(event.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          radius="md"
        />
      </Group>

      {helperText && (
        <Text size="sm" c="dimmed">
          {helperText}
        </Text>
      )}

      <Box
        style={{
          flex: 1,
          minHeight: 0, // Critical for nested flex containers
          overflow: "auto",
        }}
      >
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
      </Box>
    </Stack>
  );
}
