import React from "react";
import { Button, Group, Stack, Title, Text, Flex } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Footer from "@/app/(public)/footer";
import Link from "next/link";
import { PaperBrowser, PaperBrowserProps } from "@/components/paper-browser";
import { getNotes } from "@/lib/actions/papers";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<PaperBrowserProps["searchParams"]>;
}) {
  const awaitedSearchParams = await searchParams;
  const { invitation } = awaitedSearchParams;
  const notes = invitation
    ? await getNotes({
        invitation,
      })
    : [];
  return (
    <Stack h="100%" justify="space-between">
      {/* <Group flex={1} justify="space-around" align="center" wrap="wrap">
        <Flex
          direction={"column"}
          maw={500}
          justify={{ base: "center", md: "flex-start" }}
          align={{ base: "center", md: "flex-start" }}
          gap={"md"}
        >
          <Title style={{ ta: "center" }}>Learn More, Study Less</Title>
          <Text>AI-powered Spaced Repetition</Text>
          <Link href="/login">
            <Button size="lg" rightSection={<IconArrowRight />} radius="xl">
              Get started
            </Button>
          </Link>
        </Flex>
      </Group>
      <Footer /> */}
      <PaperBrowser papers={notes} searchParams={awaitedSearchParams} />
    </Stack>
  );
}
