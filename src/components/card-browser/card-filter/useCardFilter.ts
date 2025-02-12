"use client";
import { Tables } from "@/types/database.types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export type CardSearchParams = {
  deckId?: string;
  page?: string;
  cardIds: string;
};

export default function useCardFilter({
  searchParams,
}: {
  searchParams: CardSearchParams;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      // Start with the current searchParams entries
      const params = new URLSearchParams();

      // Preserve existing params except the one we're updating
      Object.entries(searchParams).forEach(([key, val]) => {
        if (key !== name) {
          // Skip the param we're about to set
          params.set(key, String(val)); // Ensure value is converted to string
        }
      });
      params.set(name, value);
      return params.toString();
    },

    [searchParams]
  );

  const handleDeckChange = (value: string | null) => {
    if (!value) {
      router.push(pathname);
      return;
    }
    router.push(pathname + "?" + `deckId=${value}` + "&" + `page=0`);
  };

  const handlePageChange = (page: number) =>
    router.push(pathname + "?" + createQueryString("page", String(page)));

  const handleSelectedCardIdsChange = (
    cardIds: Tables<"vw_final_cards">["_id"][]
  ) =>
    router.push(
      pathname + "?" + createQueryString("cardIds", cardIds.join(","))
    );

  return {
    handleDeckChange,
    handlePageChange,
    handleSelectedCardIdsChange,
    selectedCardIds: searchParams.cardIds?.split(",") || [],
  };
}
