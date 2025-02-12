import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import { conferences } from "@/config/conferences";


export type PaperBrowserSearchParams =  { invitation?: string; search?: string };



export default function usePapers({searchParams}: {searchParams: {invitation?: string, search?: string}}) {

    const pathname = usePathname();
    const router = useRouter();

    // State for current values
    const [currentSearch, setCurrentSearch] = useState(searchParams.search || '');
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

    const handleConferenceChange = (label?: string ) => {
      if (label)
        router.push(
            pathname + "?" + createQueryString("invitation", label)
          );
      else
        router.push(pathname);
    }

    // const handleSearchChange = (searchTerm: string) => {
    //     router.push(
    //         pathname + "?" + createQueryString("search", searchTerm)
    //       );
    // }

    // Find the matching conference label for the current invitation
    const currentConference = searchParams.invitation


    // Update URL when debounced search changes
    useEffect(() => {
      const params = new URLSearchParams(searchParams as PaperBrowserSearchParams);
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
    

  return (
    {
        conferences,
        currentConference,
        currentSearch,
        handleConferenceChange,
        handleSearchChange
    }
  )
}
