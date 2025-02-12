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
  Center,
} from "@mantine/core";
import usePapers from "./usePapers";
import { IconBooks, IconSearch } from "@tabler/icons-react";

export type PaperBrowserProps = {
  searchParams: { invitation?: string; search?: string };
};

export function PaperBrowser({ searchParams }: PaperBrowserProps) {
  const {
    isFetching,
    error,
    notes,
    conferences,
    currentConference,
    currentSearch,
    handleConferenceChange,
    handleSearchChange,
  } = usePapers({ searchParams });

  return (
    <Stack gap="xl" h="100%">
      <Group align="center">
        <Autocomplete
          clearable
          label="Conference"
          placeholder="Choose a conference"
          data={conferences.map(({ label }) => label)} // Only pass labels as data
          value={currentConference || ""} // Use the label for value
          onChange={(label) => {
            // find matching conf.inviation
            const value =
              conferences.find((conf) => conf.label === label)?.invitation ||
              "";
            handleConferenceChange(value);
          }}
          leftSection={<IconBooks size={16} />}
          radius="md"
        />
        <TextInput
          flex={1}
          label="Search term"
          placeholder="Search for papers"
          onChange={(event) => handleSearchChange(event.currentTarget.value)}
          value={currentSearch}
          leftSection={<IconSearch size={16} />}
          radius="md"
        />
      </Group>

      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}

      <Box
        style={{
          flex: 1,
          minHeight: 0, // Critical for nested flex containers
          overflow: "auto",
        }}
      >
        {!searchParams.invitation ? (
          <Center h="100%">
            <Text>Select a conference to view papers</Text>
          </Center>
        ) : isFetching ? (
          <Center h="100%">
            <Text>Loading...</Text>
          </Center>
        ) : notes.length > 0 ? (
          <Stack gap={"md"}>
            {notes.map((paper, index) => (
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
                      href={`https://openreview.net/pdf?id=${paper.id}`}
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
        ) : (
          <Text>No papers found</Text>
        )}
      </Box>
    </Stack>
  );
}
