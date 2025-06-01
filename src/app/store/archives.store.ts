import { create } from "zustand";
import { IArchivedNotes } from "../interface";

export const useArchivedNotes = create<IArchivedNotes>((set) => ({
  archiveModal: false,
  setArchiveModal: (archiveModal: boolean) => set({ archiveModal }),
}));
