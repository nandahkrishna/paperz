import {
  Mark, // markInputRule,
  // markPasteRule,
  mergeAttributes,
} from "@tiptap/core";

export interface HighlightOptions {
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    HighlightMark: {
      /**
       * Set a highlight mark
       */
      setHighlight: (options: HighlightOptions) => ReturnType;
      /**
       * Toggle a highlight mark
       */
      toggleHighlight: (options: HighlightOptions) => ReturnType;
      /**
       * Unset a highlight mark
       */
      unsetHighlight: (options: HighlightOptions) => ReturnType;
    };
  }
}

export const HighlightMark = Mark.create<HighlightOptions>({
  name: "HighlightMark",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      "data-highlight-type": {
        default: null, // Default to null, will be set dynamically
        parseHTML: (element) => element.getAttribute("data-highlight-type"),
        renderHTML: (attributes) => {
          if (!attributes["data-highlight-type"]) {
            return {};
          }
          return {
            "data-highlight-type": attributes["data-highlight-type"],
          };
        },
      },
      "text-visible": {
        default: "null",
        parseHTML: (element) => element.getAttribute("text-visible"),
        renderHTML: (attributes) => {
          if (!attributes["text-visible"]) {
            return {};
          }
          return {
            "text-visible": attributes["text-visible"],
          };
        },
      },
      "background-visible": {
        default: "yes",
        parseHTML: (element) => element.getAttribute("background-visible"),
        renderHTML: (attributes) => {
          if (!attributes["background-visible"]) {
            return {};
          }
          return {
            "background-visible": attributes["background-visible"],
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
      },
      {
        tag: "b",
        getAttrs: (node) =>
          (node as HTMLElement).style.fontWeight !== "normal" && null,
      },
      {
        style: "font-weight",
        getAttrs: (value) =>
          /^(highlight(er)?|[5-9]\d{2,})$/.test(value as string) && null,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setHighlight:
        (
          options // Now accepting options
        ) =>
        ({ commands }) => {
          return commands.setMark(this.name, options);
        },
      toggleHighlight:
        (
          options // Now accepting options
        ) =>
        ({ commands }) => {
          return commands.toggleMark(this.name, options);
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  //   addKeyboardShortcuts() {
  //     return {
  //       "Mod-b": () => this.editor.commands.toggleHighlight(),
  //       "Mod-B": () => this.editor.commands.toggleHighlight(),
  //     };
  //   },

  //   addInputRules() {
  //     return [
  //       markInputRule({
  //         find: starInputRegex,
  //         type: this.type,
  //       }),
  //       markInputRule({
  //         find: underscoreInputRegex,
  //         type: this.type,
  //       }),
  //     ];
  //   },

  //   addPasteRules() {
  //     return [
  //       markPasteRule({
  //         find: starPasteRegex,
  //         type: this.type,
  //       }),
  //       markPasteRule({
  //         find: underscorePasteRegex,
  //         type: this.type,
  //       }),
  //     ];
  //   },
});
