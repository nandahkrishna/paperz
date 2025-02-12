import { useCallback, useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import { conferences } from "@/config/conferences";
import { getNotes, Note } from "@/lib/actions/papers";

export type PaperBrowserSearchParams = { invitation?: string; search?: string };

const filterPapers = (papers: Note[], search: string) => {
  // Filter papers by search term
  return papers.filter((paper) => {
    return paper.content?.title.value
      .toLowerCase()
      .includes(search.toLowerCase());
  });
};

export default function usePapers({
  searchParams,
}: {
  searchParams: { invitation?: string; search?: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { search, ...filteredSearchParams } = searchParams;
        const notes = await getNotes(filteredSearchParams);
        setNotes(notes);
      } catch (error: unknown) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "Failed to load papers."
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.invitation]);

  return {
    isFetching,
    error,
    notes: filterPapers(notes, debouncedSearch),
    conferences,
    currentConference,
    currentSearch,
    handleConferenceChange,
    handleSearchChange,
  };
}
