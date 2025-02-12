import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const conferences = [
    {
      label: "NeurIPS (2024)",
      invitation: "NeurIPS.cc/2024/Conference/-/Submission",
    },
  ];


export default function usePapers({searchParams}: {searchParams: {invitation?: string}}) {

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

    const handleConferenceChange = (invitation: string ) => {
        router.push(
            pathname + "?" + createQueryString("invitation", invitation)
          );
    }

    const handleSearchChange = (searchTerm: string) => {
        router.push(
            pathname + "?" + createQueryString("search", searchTerm)
          );
    }

  return (
    {
        conferences,
        handleConferenceChange,
        handleSearchChange
    }
  )
}
