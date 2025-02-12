import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import { conferences } from "@/config/conferences";
import { getNotes, Note } from "@/lib/actions/papers";

export type PaperBrowserSearchParams = { invitation?: string; search?: string };

export default function usePapers({
  searchParams,
}: {
  searchParams: { invitation?: string; search?: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFetching, startTransition] = useTransition();

  // State for current values
  const [currentSearch, setCurrentSearch] = useState(searchParams.search || "");
  const [debouncedSearch] = useDebouncedValue(currentSearch, 300); // 300ms delay

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

  const handleConferenceChange = (label?: string) => {
    if (label)
      router.push(pathname + "?" + createQueryString("invitation", label));
    else router.push(pathname);
  };

  // Find the matching conference label for the current invitation
  const currentConference =
    conferences.find((conf) => conf.invitation === searchParams.invitation)
      ?.label || "";

  // Update URL when debounced search changes
  useEffect(() => {
    const params = new URLSearchParams(
      searchParams as PaperBrowserSearchParams
    );
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, pathname, router]);

  const handleSearchChange = useCallback((value: string) => {
    setCurrentSearch(value);
  }, []);

  // When the searchParams change, update the current search
  useEffect(() => {
    startTransition(async () => {
      try {
        const notes = await getNotes(searchParams);
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    });
  }, [searchParams]);

  return {
    isFetching,
    notes,
    conferences,
    currentConference,
    currentSearch,
    handleConferenceChange,
    handleSearchChange,
  };
}
