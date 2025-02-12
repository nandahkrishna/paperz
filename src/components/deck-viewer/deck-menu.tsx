"use client";
import { deleteDeck } from "@/lib/actions/decks";
import { Tables } from "@/types/database.types";
import { Menu, UnstyledButton } from "@mantine/core";
import {
  IconPlus,
  IconChartBar,
  IconSettings,
  IconTrash,
  IconDotsVertical,
  IconDownload,
  IconShare,
  IconBrain,
} from "@tabler/icons-react";
import React from "react";

const menuSections = [
  {
    label: "Actions",
    items: [
      {
        label: "Add cards",
        icon: IconPlus,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handler: (deck: Tables<"vw_final_decks">) => {},
      },
      {
        label: "Create Cram Session",
        icon: IconBrain,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handler: (deck: Tables<"vw_final_decks">) => {},
      },
    ],
  },
  {
    label: "Options",
    items: [
      {
        label: "Deck Settings",
        icon: IconSettings,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handler: (deck: Tables<"vw_final_decks">) => {},
      },
      {
        label: "View Stats",
        icon: IconChartBar,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handler: (deck: Tables<"vw_final_decks">) => {},
      },
      {
        label: "Publish",
        icon: IconShare,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handler: (deck: Tables<"vw_final_decks">) => {},
      },
      {
        label: "Export",
        icon: IconDownload,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handler: (deck: Tables<"vw_final_decks">) => {},
      },
    ],
  },
  {
    label: "Danger Zone",
    items: [
      {
        label: "Delete",
        icon: IconTrash,
        color: "red",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        handler: (deck: Tables<"vw_final_decks">) => {
          deleteDeck(deck._id as string);
        },
      },
    ],
  },
] as const;

export function DeckMenu({ deck }: { deck: Tables<"vw_final_decks"> }) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <UnstyledButton>
          <IconDotsVertical size={20} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        {menuSections.map((section, index) => (
          <React.Fragment key={section.label}>
            <Menu.Label>{section.label}</Menu.Label>
            {
              // @ts-expect-error - Unused color
              section.items.map(({ label, icon: Icon, color, handler }) => (
                <Menu.Item
                  key={label}
                  leftSection={<Icon size={14} />}
                  color={color}
                  onClick={() => handler(deck)}
                >
                  {label}
                </Menu.Item>
              ))
            }
            {index < menuSections.length - 1 && <Menu.Divider />}
          </React.Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
