"use client";
import { Tables } from "@/types/database.types";
import {
  Badge,
  Button,
  Table,
  TableTdProps,
  TableThProps,
  Text,
  TextProps,
} from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { DeckMenu } from "./deck-menu";
import { useRouter } from "next/navigation";

const headerStyles: TextProps = {
  fw: "bold",
  ta: "center",
};

type TColumn = {
  thProps?: TableThProps; // Applied to the header <th> element
  tdProps?: (deck: Tables<"vw_final_decks">) => TableTdProps; // Applied to inner data cell <td> element
}[];

export function DeckViewer({ decks }: { decks: Tables<"vw_final_decks">[] }) {
  const router = useRouter();
  const columns: TColumn = [
    {
      thProps: {
        children: (
          <Text {...headerStyles} ta={"left"}>
            Title
          </Text>
        ),
      },
      tdProps: (deck) => ({
        align: "left",
        children: deck.title,
      }),
    },
    {
      tdProps: (deck) => ({
        align: "left",
        children: (
          <Button
            onClick={() => router.push("/review" + "?deckId=" + deck._id)}
          >
            Study
          </Button>
        ),
      }),
    },
    {
      thProps: {
        children: <Text {...headerStyles}>Half-life</Text>,
      },
      tdProps: () => ({
        align: "center",
      }),
    },
    {
      thProps: {
        children: <Text {...headerStyles}>New</Text>,
      },
      tdProps: () => ({
        align: "center",
      }),
    },
    {
      thProps: {
        children: <Text {...headerStyles}>Reviews</Text>,
      },
      tdProps: (deck) => ({
        align: "center",
        children: deck.numCards,
      }),
    },
    {
      thProps: {
        align: "center",
        children: <Text {...headerStyles}>Last reviewed</Text>,
      },
      tdProps: () => ({
        align: "center",
        children: (
          <Badge leftSection={<IconCalendar />} variant="transparent">
            Never
          </Badge>
        ),
      }),
    },
    {
      thProps: {
        align: "center",
        children: <Text {...headerStyles}>Actions</Text>,
      },
      tdProps: (deck) => ({
        align: "center",
        children: <DeckMenu deck={deck} />,
      }),
    },
  ];

  const rows = decks.map((deck) => (
    <Table.Tr key={deck._id}>
      {columns.map((col, id2) => (
        <Table.Td key={id2} {...(col.tdProps ? col.tdProps(deck) : {})} />
      ))}
    </Table.Tr>
  ));

  const headers = columns.map((col, id) => (
    <Table.Th key={id} {...col.thProps} />
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>{headers}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
