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
import { ChangePasswordFormData } from "../component/__organism/changePassword/ChangePassword";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interface";
import { toast } from "react-toastify";
import { useSignInStore } from "./sign-in.store";
import { axiosInstance } from "../libs/axiosInstance";

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    toast.error(errorMessage);
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  toast.error(unexpectedError);
  return unexpectedError;
};

const getDefaultTheme = () => {
  if (typeof window !== "undefined") {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark mode";
    }
    return "light mode";
  }
  return "system";
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
  isLoading: boolean;
  currentTheme: string;
  selectedTheme: string;
  filteredData: SettingItem | null;
  selectedButton: string | null;
  axiosError: string | null;

  newPassword: string;
  passwordNew: string;

  setAxiosError: (msg: string | null) => void;
  setSelectedButton: (button: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;

  applySelectedTheme: () => void;

  resetSelectedTheme: () => void;

  setFilteredData: (filteredData: SettingItem | null) => void;
  setSelectedTheme: (selectedTheme: string) => void;
  setActiveSetting: (val: string | null) => void;
  setFilteredSettings: (title: string) => void;

  // changePassword: (FormData: ChangePasswordFormData) => void;
  changePassword: (formData: ChangePasswordFormData) => Promise<boolean>;
}

export const useSettingsStore = create<IUseSettingsStore>()(
  persist(
    (set, get) => ({
      activeSetting: null,
      filteredSettings: [],
      currentTheme: getDefaultTheme(),
      selectedTheme: getDefaultTheme(),
      filteredData: null,
      isLoading: false,

      selectedButton: null,
      axiosError: null,

      newPassword: "",
      passwordNew: "",
      passwordConfirm: "",

      setAxiosError: (axiosError) => set({ axiosError }),
      setSelectedButton: (button) => set({ selectedButton: button }),
      setIsLoading: (isLoading) => set({ isLoading }),
      applySelectedTheme: () => {
        const state = get();
        if (state.selectedTheme) {
          set({ currentTheme: state.selectedTheme });
        }
      },
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

      changePassword: async (formData) => {
        const accessToken = useSignInStore.getState().accessToken;
        set({ isLoading: true });
        try {
          const res = await axiosInstance.post(
            `/auth/change-password`,
            {
              newPassword: formData.passwordNew,
              oldPassword: formData.oldPassword,
            },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          if (res.status >= 200 && res.status <= 204) {
            toast.success("Password changed successfully");
            return true;
          }
        } catch (e) {
          const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
          set({ axiosError: errorMessage });
        } finally {
          set({ isLoading: false, axiosError: "" });
        }
        return false;
      },
    }),
    {
      name: "settings-storage",
      partialize: (state) => ({
        activeSetting: state.activeSetting,
        currentTheme: state.currentTheme,
        selectedTheme: state.currentTheme,
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
