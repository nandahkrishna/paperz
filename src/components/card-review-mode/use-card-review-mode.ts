import useFlashcardEditor from "@/components/card-editor/use-flashcard-editor";
import { Tables, TablesUpdate } from "@/types/database.types";
import { extractClozeCards, extractClozeIdentifiers } from "@/utils/cards";
import { updateHTMLClozeAttributes } from "@/utils/html";
import { isValidUpdate } from "@/utils/cards";
import { useState } from "react";

const visibleCSS = {
  "text-visible": "yes",
  "background-visible": "yes",
};

const hiddenCSS = {
  "text-visible": "no",
  "background-visible": "yes",
};

export const useFlashcardReviewMode = ({
  review,
  onSuspend,
  onUndo,
  onAnswer,
  onUpdate,
}: {
  review: Tables<"vw_final_reviews">;
  onSuspend?: (reviewId: string) => void;
  onUndo?: () => void;
  onAnswer?: (
    evaluation: { score: Tables<"revlogs">["evaluation"] },
    review: Tables<"vw_final_reviews">
  ) => void;
  onUpdate?: (card: TablesUpdate<"cards">) => void;
}) => {
  const [isBackVisible, setIsBackVisible] = useState(false);
  const initialReviewFront = updateHTMLClozeAttributes(
    review.editorStateFront as string,
    hiddenCSS
  );
  const handleKeyboardShortcutskModal = () => {};

  /**
   * Editors
   */

  const {
    editor: editorStateFront,
    replaceContent: replaceContentFront,
    showOcclusions,
    hideOcclusions,
  } = useFlashcardEditor({
    initHtml: initialReviewFront,
    editable: false,
    isResettable: true,
  });

  const { editor: editorStateBack, replaceContent: replaceContentBack } =
    useFlashcardEditor({
      initHtml: review.editorStateBack || "",
      editable: false,
      isResettable: true,
    });

  const {
    editor: editorStateFrontOriginal,
    toggleBold: handleBoldClickFront,
    toggleItalic: handleItalicClickFront,
    // Cloze
    clozeId: clozeIdFront,
    toggleCloze: handleClozeClickFront,
    setClozeId: handleClozeChangeFront,
    // Image
    prependImage: prependImageFront,
    // Occlusion
    prependOccludedImage: prependOccludedImageFront,
  } = useFlashcardEditor({
    initHtml: review.editorStateFrontOriginal || "",
    editable: true,
    isResettable: true,
  });

  const {
    editor: editorStateBackOriginal,
    toggleBold: handleBoldClickBack,
    toggleItalic: handleItalicClickBack,
    prependBasicImage: prependImageBack,
  } = useFlashcardEditor({
    initHtml: review.editorStateBackOriginal || "",
    editable: true,
    isResettable: true,
  });

  /**
   * Handlers
   */

  const handleHideAnswer = () => {
    const newValue = updateHTMLClozeAttributes(
      review.editorStateFront,
      hiddenCSS
    );
    editorStateFront?.commands.setContent(newValue);
    showOcclusions();
    setIsBackVisible(false);
  };

  const handleShowAnswer = () => {
    const newValue = updateHTMLClozeAttributes(
      review.editorStateFront,
      visibleCSS
    );
    editorStateFront?.commands.setContent(newValue);
    hideOcclusions();
    setIsBackVisible(true);
  };

  const handleUndo = () => {
    handleHideAnswer();
    onUndo && onUndo();
  };

  const handleAnswer = (evaluation: EvaluationPayloadSchema) => {
    onAnswer && onAnswer(evaluation, review);
    handleHideAnswer();
  };

  const handleSuspend = () => {
    onSuspend && onSuspend(review._id.toString());
  };

  const handleUpdateContent = () => {
    // Update the editorStateFrontReview and editorStateBackReviewable
    const newBackOriginal = editorStateBackOriginal?.getHTML();
    const newFrontOriginal = editorStateFrontOriginal?.getHTML();
    let newFront = newFrontOriginal;
    const reviewClozeIdentifiers = extractClozeIdentifiers(
      editorStateFront?.getHTML()
    );
    if (reviewClozeIdentifiers.length > 0)
      newFront = extractClozeCards(newFront, reviewClozeIdentifiers[0]);
    newFront = updateHTMLClozeAttributes(
      newFront,
      isBackVisible ? visibleCSS : hiddenCSS
    );

    replaceContentFront(newFront);
    replaceContentBack(newBackOriginal);
    onUpdate &&
      onUpdate({
        ...review,
        editorStateFrontOriginal: newFrontOriginal,
        editorStateBackOriginal: newBackOriginal,
      });
  };

  const handleSkip = () => handleAnswer({ score: "skip" });

  const { isValid: isValidEdit, message: isValidEditMessage } = isValidUpdate(
    editorStateFrontOriginal?.getHTML() || "",
    review.editorStateFront as string
  );

  return {
    isBackVisible,
    editorStateFrontOriginal,
    editorStateBackOriginal,
    editorStateFront,
    editorStateBack,
    isValidEdit,
    isValidEditMessage,
    handleUndo,
    handleShowAnswer,
    handleAnswer,
    handleSkip,
    handleSuspend,
    handleUpdateContent,
    handleShortcutsClick: handleKeyboardShortcutskModal,
    // Editor Commands
    // Front handlers
    clozeIdFront,
    handleBoldClickFront,
    handleItalicClickFront,
    handleClozeClickFront,
    handleClozeChangeFront,
    prependImageFront,
    prependOccludedImageFront,

    // Back
    handleBoldClickBack,
    handleItalicClickBack,
    prependImageBack,
  };
};
