// app/(public)/layout.tsx
import SignInButton from "@/components/buttons/sign-in";
import { ColorSchemeToggle } from "@/components/color-scheme-toggle";
import { Box, Container, Group, Stack, Text, ActionIcon } from "@mantine/core";
import { IconPaperclip, IconBrandGithub } from "@tabler/icons-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack h="100vh" justify="space-between" style={{ paddingBottom: 20 }}>
      <Container w="100%" size="lg">
        <Group
          justify="space-between"
          align="center"
          style={{
            paddingTop: 10,
          }}
        >
          <Group justify="space-between" align="center" w="100%">
            <Group>
              <IconPaperclip size={28} stroke={1.5} />
              <Text size="xl" fw={700}>
                Papers
              </Text>
            </Group>
            <Group>
              <ActionIcon
                variant="subtle"
                size="lg"
                component="a"
                href="https://github.com/marawangamal/papers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <IconBrandGithub size={18} />
              </ActionIcon>
              <SignInButton />
              <ColorSchemeToggle />
            </Group>
          </Group>
        </Group>
      </Container>
      <Box flex={1} style={{ overflowY: "hidden" }}>
        {children}
      </Box>
    </Stack>
  );
}
