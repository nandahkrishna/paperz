// app/(public)/layout.tsx
import { ColorSchemeToggle } from "@/components/color-scheme-toggle";
import { Box, Container, Group, Stack, Text } from "@mantine/core";
import { IconBrain } from "@tabler/icons-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container size="lg">
      <Stack h="100vh" justify="space-between">
        <Group
          justify="space-between"
          align="center"
          style={{
            paddingTop: 10,
          }}
        >
          <Group justify="space-between" align="center" w="100%">
            <Group>
              <IconBrain size={28} stroke={1.5} />
              <Text size="xl" fw={700}>
                Paperz
              </Text>
            </Group>
            <ColorSchemeToggle />
          </Group>
        </Group>
        <Box flex={1} style={{ overflowY: "hidden" }}>
          {children}
        </Box>
      </Stack>
    </Container>
  );
}
