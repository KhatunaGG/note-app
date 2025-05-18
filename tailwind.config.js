// module.exports = {
//   files: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class',
//   theme: {
//     extend: {
//       colors: {
//         darkest: "#0E121B",
//         dark: "#525866",
//         neutral: "#717784",
//         primaryBlue: "#335CFF",
//       },
//       minHeight: {
//         'screen-minus-155': 'calc(100vh - 155px)',
//         'screen-minus-137': 'calc(100vh - 137px)',
//       }
//     },
//   },
//   plugins: [],
// };

module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
