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

// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   darkMode: 'class', // This is crucial for next-themes to work
//   theme: {
//     extend: {
//       colors: {
//         // Define custom colors for both light and dark themes
//         dark: '#232530',
//         light: '#F3F5F8',
//       },
//       backgroundColor: {
//         // Define background colors consistently
//         primary: {
//           light: '#F3F5F8',
//           dark: '#232530',
//         },
//         secondary: {
//           light: '#ffffff',
//           dark: '#3a3f47',
//         }
//       },
//       textColor: {
//         // Define text colors consistently
//         primary: {
//           light: '#0E121B',
//           dark: '#ffffff',
//         },
//         secondary: {
//           light: '#2B303B',
//           dark: '#e1e1e1',
//         }
//       }
//     },
//   },
//   plugins: [],
// }
// tailwind.config.js






// module.exports = {
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   darkMode: "class",
//   theme: {
//     extend: {
//       colors: {
//         light: "#0E121B",
//         dark: "#ffffff",
//         buttonBgForLight: "#E0E4EA",
//         selectedForLight: "#F3F5F8",
//         selectedForDark: "#232530CC",
//         fadeTextColorForDark: "#CACFD8",
//         placeHolderTextColor: "#717784",
//         buttonBgForDark: "#525866",
//         linesForLight: "#E0E4EA",
//         linesForDark: "#52586699",
//       },
//     },
//   },
//   plugins: [],
// };



module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // This is crucial for next-themes to work
  theme: {
    extend: {
      colors: {
        // Define custom colors for both light and dark themes
        dark: '#232530',
        light: '#F3F5F8',
        lines: {
          light: '#E0E4EA',
          dark: '#52586699',
        }
      },
      backgroundColor: {
        // Define background colors consistently
        primary: {
          light: '#F3F5F8',
          dark: '#232530',
        },
        secondary: {
          light: '#ffffff',
          dark: '#3a3f47',
        }
      },
      textColor: {
        // Define text colors consistently
        primary: {
          light: '#0E121B',
          dark: '#ffffff',
        },
        secondary: {
          light: '#2B303B',
          dark: '#e1e1e1',
        }
      },
      borderColor: {
        lines: {
          light: '#E0E4EA',
          dark: '#52586699',
        }
      }
    },
  },
  plugins: [],
}