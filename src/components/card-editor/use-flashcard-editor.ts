"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { HighlightMark } from "./mark-highlight";
import { useEffect, useState } from "react";
import { EditorState } from "@tiptap/pm/state";

import {
  Occlusion,
  OcclusionInterface,
  UpdateOcclusionsFunction,
} from "./node-occlusion/OcclusionNode";
import { useModals } from "@/modals/useModals";
import { useOcclusions } from "./use-image-occlusion";
import ImageNode from "./node-image/ImageNode";

export enum ClozeID {
  HIGHLIGHT_0 = "highlight-0",
  HIGHLIGHT_1 = "highlight-1",
  HIGHLIGHT_2 = "highlight-2",
  HIGHLIGHT_3 = "highlight-3",
  HIGHLIGHT_4 = "highlight-4",
  HIGHLIGHT_5 = "highlight-5",
  HIGHLIGHT_6 = "highlight-6",
  HIGHLIGHT_7 = "highlight-7",
  HIGHLIGHT_8 = "highlight-8",
}

export default function useFlashcardEditor({
  initHtml,
  isResettable = false,
  isImagesEnabled = true,
  editable = true,
  onContentChange,
}: {
  initHtml: string;
  isResettable?: boolean;
  editable?: boolean;
  isImagesEnabled?: boolean;
  onContentChange?: (html: string) => void;
}) {
  const { handleImageOcclusion } = useModals();
  const updateOcclusions: UpdateOcclusionsFunction = ({
    src,
    occlusions,
    onUpdate,
  }) => {
    handleImageOcclusion({
      image: src,
      initialOcclusions: occlusions,
      onSave: onUpdate,
    });
  };

  const extensions = [
    StarterKit,
    HighlightMark,
    Occlusion.extend({
      addOptions() {
        return {
          onUpdateAttrs: updateOcclusions, // Your callback function
          ignoreDoubleClicks: !editable,
          ignoreClicks: !editable,
        };
      },
    }),
  ];

  if (isImagesEnabled) {
    extensions.push(ImageNode);
  }

  // Initialize the editor
  const editor = useEditor({
    extensions,
    content: initHtml,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onContentChange?.(html);
    },
  });

  // Function to toggle bold formatting
  const toggleBold = () => {
    if (editor) {
      editor.chain().focus().toggleBold().run();
    }
  };

  // Function to toggle italic formatting
  const toggleItalic = () => {
    if (editor) {
      editor.chain().focus().toggleItalic().run();
    }
  };

  /**
   * Highlight mark
   */
  // TODO: make this a ref
  const [clozeId, setClozeId] = useState<ClozeID>(ClozeID.HIGHLIGHT_0);

  const toggleCloze = () => {
    console.log("toggleCloze");
    if (editor) {
      // Assuming `setHighlight` is the command name you've defined in HighlightNode
      editor
        .chain()
        .focus()
        .toggleHighlight({
          "data-highlight-type": `${clozeId}`,
        })
        .run();
    }
  };

  /**
   * Image occlusion
   */

  const {
    prependOccludedImage,
    removeOcclusion,
    hideOcclusions,
    showOcclusions,
  } = useOcclusions(editor);

  const prependImage = (src: string) => {
    // Get image width and height
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const occlusions: OcclusionInterface[] = [];
      prependOccludedImage(src, occlusions, { width, height });
    };
  };
  const prependBasicImage = (src: string) => {
    editor?.commands.insertContent({
      type: "image",
      attrs: {
        src,
      },
    });
  };

  /**
   * MISC
   */

  const replaceContent = (htmlContent: string) => {
    editor?.commands.setContent(htmlContent);
  };

  /**
   * Side effect to reset the editor content
   */
  // TODO: why do we need this?
  useEffect(() => {
    if (editor && initHtml !== editor.getHTML() && isResettable) {
      editor?.commands?.setContent(initHtml);
      const newEditorState = EditorState.create({
        doc: editor.state.doc,
        plugins: editor.state.plugins,
        schema: editor.state.schema,
      });
      editor.view.updateState(newEditorState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initHtml]);

  return {
    editor,
    toggleBold,
    toggleItalic,
    toggleCloze,
    // Cloze state
    clozeId,
    setClozeId,
    // Images
    prependImage,
    prependBasicImage,
    // Occlusions
    prependOccludedImage,
    removeOcclusion,
    hideOcclusions,
    showOcclusions,
    // Misc
    replaceContent,
  };
}
