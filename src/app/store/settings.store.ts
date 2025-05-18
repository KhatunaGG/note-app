// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { settingsData } from "../data/data";

// export interface SettingThemeItem {
//   icon: string;
//   mode: string;
//   pText: string;
// }

// export interface SettingItem {
//   text: string;
//   logoName: string;
//   pText?: string;
//   settingTheme?: SettingThemeItem[];
// }

// export interface IUseSettingsStore {
//   activeSetting: string | null;
//   filteredSettings: SettingThemeItem[];
//   selectedTheme: string;
//   filteredData: SettingItem | null;
//   mode: string | null;

//   setMode: (mode: string | null) => void;
//   setFilteredData: (filteredData: SettingItem | null) => void;
//   setSelectedTheme: (selectedTheme: string) => void;
//   setActiveSetting: (val: string | null) => void;
//   setFilteredSettings: (title: string) => void;
//   applyTheme: (theme: string) => void;
// }

// export const useSettingsStore = create<IUseSettingsStore>()(
//   persist(
//     (set, get) => ({
//       activeSetting: null,
//       filteredSettings: [],
//       selectedTheme: "Light Mode",
//       filteredData: null,
//       mode: "",

//       setMode: (mode) => set({ mode }),
//       setFilteredData: (filteredData) => set({ filteredData }),
//       // setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
//       setActiveSetting: (val) => set({ activeSetting: val }),
//       setFilteredSettings: (title) => {
//         const match = settingsData.find((item) => item.text === title);
//         const filtered = match?.settingTheme || [];
//         set({ filteredSettings: filtered });
//       },

//       setSelectedTheme: (theme: string) => {
//         set({ selectedTheme: theme });
//         get().applyTheme(theme); // <-- apply the theme right after set
//       },

//       applyTheme: (theme?: string) => {
//         if (typeof window === "undefined") return;
//         const currentTheme = theme || get().selectedTheme;

//         const root = document.documentElement;
//         if (currentTheme === "Dark Mode") {
//           root.classList.add("dark");
//           localStorage.setItem("theme", "dark");
//         } else if (currentTheme === "Light Mode") {
//           root.classList.remove("dark");
//           localStorage.setItem("theme", "light");
//         } else if (currentTheme === "System") {
//           const prefersDark = window.matchMedia(
//             "(prefers-color-scheme: dark)"
//           ).matches;
//           prefersDark
//             ? root.classList.add("dark")
//             : root.classList.remove("dark");
//           localStorage.setItem("theme", "system");
//         }
//       },
//     }),
//     // {
//     //   name: "settings-storage",
//     //   partialize: (state) => ({ selectedTheme: state.selectedTheme }),
//     // }

//     {
//       name: "settings-storage",
//       partialize: (state) => ({ selectedTheme: state.selectedTheme }),
//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           // Automatically apply theme on hydration
//           state.applyTheme(state.selectedTheme);
//         }
//       },
//     }
//   )
// );

import { create } from "zustand";
import { settingsData } from "../data/data";

export interface SettingThemeItem {
  icon: string;
  mode: string;
  pText: string;
}

export interface SettingItem {
  text: string;
  logoName: string;
  pText?: string;
  settingTheme?: SettingThemeItem[];
}

export interface IUseSettingsStore {
  activeSetting: string | null;
  filteredSettings: SettingThemeItem[];
  selectedTheme: string;
  // filteredData: SettingItem[];
  filteredData: SettingItem | null;

  // setFilteredData: (filteredData: SettingItem[] | []) => void;
  setFilteredData: (filteredData: SettingItem | null) => void;
  setSelectedTheme: (selectedTheme: string) => void;
  setActiveSetting: (val: string | null) => void;
  setFilteredSettings: (title: string) => void;
  // applyTheme: (val: string) => void;
}

export const useSettingsStore = create<IUseSettingsStore>((set, get) => ({
  activeSetting: null,
  filteredSettings: [],
  selectedTheme: "",
  filteredData: null,

  setFilteredData: (filteredData) => set({ filteredData }),
  setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
  setActiveSetting: (val) => set({ activeSetting: val }),
  setFilteredSettings: (title) => {
    const match = settingsData.find((item) => item.text === title);
    const filtered = match?.settingTheme || [];
    set({ filteredSettings: filtered });
  },
  // applyTheme: (theme: string) => {
  //   set({ selectedTheme: theme });
  //   if (typeof window !== 'undefined')  {

  //     localStorage.setItem("selectedTheme", get().selectedTheme);
  
  //     console.log(theme, "THEME form Store")
  //    if (theme === "Dark Mode") {
  //     document.documentElement.classList.add("dark");
  //      localStorage.setItem("theme", "dark");
  //   } else if(theme === "Light Mode") {
  //     document.documentElement.classList.remove("dark");
  //       localStorage.setItem("theme", "light");
  //   }
  //   }
  // },
}));
