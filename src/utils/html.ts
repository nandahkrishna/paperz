"use client";
export const getRawTextFromHtml = (htmlString: string) => {
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  }
  // Fallback for server-side
  return htmlString;
};

export const getNumImagesFromHtml = (htmlString: string) => {
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.getElementsByTagName("img").length;
  }
  // Fallback for server-side
  return 0;
};

export function updateHTMLClozeAttributes(
  htmlString: string,
  attributes: Record<string, string>
) {
  // Define the regular expression pattern to find the specific data-highlight-type with a digit
  // Convert attributes object to a string of `key="value"` pairs
  const attributesString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  // Define the regular expression pattern to find the specific data-highlight-type with a digit
  const pattern = /(data-highlight-type="highlight-\d")/g;

  // Replace the found pattern with the pattern plus the additional attributes
  const updatedHtmlString = htmlString.replace(
    pattern,
    `$1 ${attributesString}`
  );

  return updatedHtmlString;
}
