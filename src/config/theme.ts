import { createTheme, MantineColorsTuple } from "@mantine/core";

const charcoal: MantineColorsTuple = [
  "#F7F7F7", // 0 (PRIMARY_50)
  "#F2F2F2", // 1 (PRIMARY_100)
  "#E2E2E1", // 2 (PRIMARY_200)
  "#989898", // 3 (PRIMARY_300)
  "#6D6D6D", // 4 (PRIMARY_400)
  "#333333", // 5 (PRIMARY_500)
  "#2B2B2B", // 6 <-- default
  "#242424", // 7
  "#1C1C1C", // 8
  "#151515", // 9
];

export const theme = createTheme({
  colors: {
    charcoal,
  },
  primaryColor: "charcoal",

  fontFamily: "Inter, sans-serif",
  components: {
    Button: {
      defaultProps: {
        radius: "xl",
      },
    },
    Notification: {
      styles: {
        root: {
          backgroundColor: "#f8f9fa",
        },
      },
    },
    Text: {
      styles: {
        root: {
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    Modal: {
      styles: {
        content: {
          borderRadius: "1rem",
        },
        title: {
          fontWeight: 700,
        },
      },
    },
  },
});
