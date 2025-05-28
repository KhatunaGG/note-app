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
  currentFont: string;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  applySelectedFont: () => void;
  setAxiosError: (msg: string | null) => void;
  setSelectedButton: (button: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  applySelectedTheme: () => void;
  resetSelectedTheme: () => void;
  setFilteredData: (filteredData: SettingItem | null) => void;
  setSelectedTheme: (selectedTheme: string) => void;
  setActiveSetting: (val: string | null) => void;
  setFilteredSettings: (title: string) => void;
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
      currentFont: "Inter",
      selectedFont: "Inter",
      setSelectedFont: (font) => set({ selectedFont: font }),
      applySelectedFont: () => {
        const { selectedFont } = get();
        set({ currentFont: selectedFont });
      },
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
        currentFont: state.currentFont,
        selectedFont: state.selectedFont,
      }),
      storage:
        typeof window !== "undefined"
          ? createJSONStorage(() => localStorage)
          : undefined,
    }
  )
);
