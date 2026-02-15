import { EditorView } from "@codemirror/view";

export const customTheme = EditorView.theme({
  "&": {
    outline: "none !important",
        height: "100%",
        color: "#ffffff",
     backgroundColor: "#000000 !important",
  },
  ".cm-content": {
    fontFamily: "var(--font-plex-mono), monospace",
    fontSize: "14px",
  },
  ".cm-scroller": {
    scrollbarWidth: "thin",
    scrollbarColor: "#3f3f46 transparent",
    },
   ".cm-gutters": {
      backgroundColor: "#000000 !important",
      color: "#666666 !important",
      border: "none",
    },
});
