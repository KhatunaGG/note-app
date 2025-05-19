// import { create } from "zustand";
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
//   // filteredData: SettingItem[];
//   filteredData: SettingItem | null;

//   // setFilteredData: (filteredData: SettingItem[] | []) => void;
//   setFilteredData: (filteredData: SettingItem | null) => void;
//   setSelectedTheme: (selectedTheme: string) => void;
//   setActiveSetting: (val: string | null) => void;
//   setFilteredSettings: (title: string) => void;
//   // applyTheme: (val: string) => void;
// }

// export const useSettingsStore = create<IUseSettingsStore>((set, get) => ({
//   activeSetting: null,
//   filteredSettings: [],
//   selectedTheme: "",
//   filteredData: null,

//   setFilteredData: (filteredData) => set({ filteredData }),
//   setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
//   setActiveSetting: (val) => set({ activeSetting: val }),
//   setFilteredSettings: (title) => {
//     const match = settingsData.find((item) => item.text === title);
//     const filtered = match?.settingTheme || [];
//     set({ filteredSettings: filtered });
//   },
//   // applyTheme: (theme: string) => {
//   //   set({ selectedTheme: theme });
//   //   if (typeof window !== 'undefined')  {

//   //     localStorage.setItem("selectedTheme", get().selectedTheme);

//   //     console.log(theme, "THEME form Store")
//   //    if (theme === "Dark Mode") {
//   //     document.documentElement.classList.add("dark");
//   //      localStorage.setItem("theme", "dark");
//   //   } else if(theme === "Light Mode") {
//   //     document.documentElement.classList.remove("dark");
//   //       localStorage.setItem("theme", "light");
//   //   }
//   //   }
//   // },
// }));

// "use client";

// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";
// import { settingsData } from "../data/data";

// // Add default theme detection based on system preference
// const getDefaultTheme = () => {
//   // This only works client-side
//   if (typeof window !== 'undefined') {
//     if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       return "dark mode";
//     }
//     return "light mode";
//   }
//   return "system"; // Default fallback for server-side
// };

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

//   setFilteredData: (filteredData: SettingItem | null) => void;
//   setSelectedTheme: (selectedTheme: string) => void;
//   setActiveSetting: (val: string | null) => void;
//   setFilteredSettings: (title: string) => void;
// }

// export const useSettingsStore = create<IUseSettingsStore>()(
//   persist(
//     (set, get) => ({
//       activeSetting: null,
//       filteredSettings: [],
//       // Initialize with default theme if none set
//       selectedTheme: getDefaultTheme(),
//       filteredData: null,

//       setFilteredData: (filteredData) => set({ filteredData }),
//       setSelectedTheme: (selectedTheme) => set({ selectedTheme }),
//       setActiveSetting: (val) => set({ activeSetting: val }),
//       setFilteredSettings: (title) => {
//         const match = settingsData.find((item) => item.text === title);
//         const filtered = match?.settingTheme || [];
//         set({ filteredSettings: filtered });
//       },
//     }),
//     {
//       name: "settings-storage",
//       // Only store specific keys we want to persist - not the methods
//       partialize: (state) => ({
//         activeSetting: state.activeSetting,
//         selectedTheme: state.selectedTheme,
//         filteredData: state.filteredData,
//         filteredSettings: state.filteredSettings,
//       }),
//       // Correctly use createJSONStorage for type safety
//       storage: typeof window !== 'undefined'
//         ? createJSONStorage(() => localStorage)
//         : undefined
//     }
//   )
// );












"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { settingsData } from "../data/data";

// Add default theme detection based on system preference
const getDefaultTheme = () => {
  // This only works client-side
  if (typeof window !== "undefined") {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark mode";
    }
    return "light mode";
  }
  return "system"; // Default fallback for server-side
};

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
  
  // Currently applied theme (persisted)
  currentTheme: string;
  
  // Temporarily selected theme (not applied yet)
  selectedTheme: string;
  
  filteredData: SettingItem | null;

  // Apply the selected theme (update currentTheme to match selectedTheme)
  applySelectedTheme: () => void;
  
  // Reset selectedTheme to match currentTheme (cancel selection)
  resetSelectedTheme: () => void;

  setFilteredData: (filteredData: SettingItem | null) => void;
  setSelectedTheme: (selectedTheme: string) => void;
  setActiveSetting: (val: string | null) => void;
  setFilteredSettings: (title: string) => void;
}

export const useSettingsStore = create<IUseSettingsStore>()(
  persist(
    (set, get) => ({
      activeSetting: null,
      filteredSettings: [],
      currentTheme: getDefaultTheme(), // The actually applied theme (persisted)
      selectedTheme: getDefaultTheme(), // Initialize selected theme to match current theme
      filteredData: null,
      
      // Apply the selected theme (save it as current)
      applySelectedTheme: () => {
        const state = get();
        if (state.selectedTheme) {
          set({ currentTheme: state.selectedTheme });
        }
      },
      
      // Reset selected theme to match current (cancel selection)
      resetSelectedTheme: () => {
        const state = get();
        set({ selectedTheme: state.currentTheme });
      },

      setSelectedTheme: (theme) => set({ selectedTheme: theme }),
      setFilteredData: (filteredData) => set({ filteredData }),
      setActiveSetting: (val) => set({ activeSetting: val }),
      setFilteredSettings: (title) => {
        const match = settingsData.find((item) => item.text === title);
        const filtered = match?.settingTheme || [];
        set({ filteredSettings: filtered });
      },
    }),
    {
      name: "settings-storage",
      partialize: (state) => ({
        activeSetting: state.activeSetting,
        currentTheme: state.currentTheme, // Persist the applied theme
        selectedTheme: state.currentTheme, // Initialize selectedTheme from currentTheme
        filteredData: state.filteredData,
        filteredSettings: state.filteredSettings,
      }),
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);