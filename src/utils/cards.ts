import { Tables } from "@/types/database.types";

export function getCardType(html: string) {
  return html.includes("data-highlight-type") ? "cloze" : "frontback";
}

const CLOZE_HIGHLIGHT_REGEX = /data-highlight-type=(["'])highlight-\d+\1/g;
export const extractClozeIdentifiers = (html: string) => {
  const classes = new Set(html.match(CLOZE_HIGHLIGHT_REGEX));
  return Array.from(classes);
};

export const extractClozeCards = (inputHtml: string): string[] => {
  // Function to create an output string with only one highlight class
  const clozeIdentifiers = extractClozeIdentifiers(inputHtml);
  const outputStrings = clozeIdentifiers.map((highlightClass) =>
    extractClozeCard(inputHtml, highlightClass)
  );
  return outputStrings;
};

const extractClozeCard = (html: string, highlightClass: string) => {
  return html.replace(CLOZE_HIGHLIGHT_REGEX, (match) => {
    return match.includes(highlightClass) ? match : "";
  });
};

export function createClozeReviewsFromCard(card: Tables<"cards">) {
  const editorStateFrontStrings = extractClozeCards(card.editorStateFront);
  const newReviews = editorStateFrontStrings.map((editorStateFrontString) => {
    return {
      cardId: card._id.toString(),
      cardType: getCardType(editorStateFrontString),
      editorStateFront: editorStateFrontString,
      editorStateBack: card.editorStateBack,
      isNew: true,
    };
  });
  return newReviews;
}

export function createFrontBackReviewFromCard(card: Tables<"cards">) {
  const newReview = {
    cardId: card._id.toString(),
    cardType: getCardType(card.editorStateFront),
    editorStateFront: card.editorStateFront,
    editorStateBack: card.editorStateBack,
    isNew: true,
  };
  return newReview;
}

export const extractClozeIndices = (html: string) => {
  return extractClozeIdentifiers(html).map((match) => {
    const matchArray = match.split("-");
    return matchArray[matchArray.length - 1];
  });
};

export const extractClozeIndex = (html: string): number | null => {
  const ids = extractClozeIndices(html);
  if (ids.length === 0) return null;
  else if (ids.length > 1)
    console.warn(`Multiple cloze deletions found in the card: ${html}`);
  return parseInt(ids[0]);
};

export const getClozeIndex = (htmlString: string): number => {
  // Get index of first cloze encountered (i.e. look for span with "data-highlight-type" attribute)
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const spans = doc.querySelectorAll("span[data-highlight-type]");
  const firstSpanDHTValue = spans[0]?.getAttribute("data-highlight-type");
  if (!firstSpanDHTValue) return -1;
  return parseInt(firstSpanDHTValue.split("-")[1]);
};

export const hasClozeIndex = (
  htmlString: string,
  clozeIndex: number
): boolean => {
  return htmlString.includes(`data-highlight-type="highlight-${clozeIndex}"`);
};

export const hasCloze = (front: string): boolean => {
  const clozeIndices = extractClozeIdentifiers(front);
  if (clozeIndices.length > 0) return true;
  else return false;
};

export const isValidUpdate = (
  cardEditorStateFront: string, // edited
  reviewEditorStateFront: string // previous
) => {
  // If changing from frontback to cloze
  if (hasCloze(cardEditorStateFront) && !hasCloze(reviewEditorStateFront))
    return {
      isValid: false,
      message: "Cannot add new cloze during review",
    };
  else if (
    hasCloze(reviewEditorStateFront) &&
    !hasClozeIndex(cardEditorStateFront, getClozeIndex(reviewEditorStateFront))
  )
    return {
      isValid: false,
      message: `Cannot save without Cloze ${
        getClozeIndex(reviewEditorStateFront) + 1
      }`,
    };
  return {
    isValid: true,
    message: "",
  };
};
