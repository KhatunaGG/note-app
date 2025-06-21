module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#232530",
        light: "#F3F5F8",

        lines: {
          light: "#E0E4EA",
          dark: "#525866",
        },
      },
      backgroundColor: {
        overlayDark: "#525866",
        primary: {
          light: "#F3F5F8",
          dark: "#232530",
        },
        secondary: {
          light: "#ffffff",
          dark: "#3a3f47",
        },
      },
      textColor: {
        primary: {
          light: "#0E121B",
          dark: "#ffffff",
        },
        secondary: {
          light: "#2B303B",
          dark: "#e1e1e1",
        },
        muted: "#717784",
        subtle: "#99A0AE",
      },
      borderColor: {
        lines: {
          light: "#E0E4EA",
          dark: "#525866",
        },
      },
      fill: {
        primary: {
          light: "#0E121B",
          dark: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
