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
}

export const useSettingsStore = create<IUseSettingsStore>((set) => ({
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
}));
