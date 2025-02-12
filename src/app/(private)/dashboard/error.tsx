"use client";
import { Center, Stack, Text } from "@mantine/core";

export default function ErrorPage() {
  return (
    <Stack h="100%" flex={1}>
      <Center h="100%">
        <Text>Something went wrong. Please try again later.</Text>
      </Center>
    </Stack>
  );
}
