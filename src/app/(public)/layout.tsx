// app/(public)/layout.tsx
import { Logo } from "@/lib/icons/logo";
import { Container, Group, Stack } from "@mantine/core";

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
          <Logo />
        </Group>
        {children}
      </Stack>
    </Container>
  );
}
