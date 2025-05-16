import { create } from "zustand";

export interface IUseSettingsStore {
  activeSetting: string | null;
  setActiveSetting: (val: string | null) => void;
}

export const useSettingsStore = create<IUseSettingsStore>((set) => ({
  activeSetting: null,
  setActiveSetting: (val) => set({ activeSetting: val }),
}));
