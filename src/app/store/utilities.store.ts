import { create } from "zustand";
import { NewNoteType } from "./notes.store";

interface IUseUtilities {
  currentPath: string;
  isArchivedPage: boolean;
  selectedTags: string | null;
  routeToTags: boolean;

  filterAllByTag: boolean;
  setFilterAllByTag: (val: boolean) => void;

  isAllNotesPage: boolean;
  setIsAllNotesPage: (val: boolean) => void;

  isTagsPage: boolean;
  setIsTagsPage: (val: boolean) => void;

  setSelectedTag: (tag: string | null) => void;
  setCurrentPath: (path: string) => void;
  setRouteToTags: (value: boolean) => void;
  activeLink: (path: string) => string;
  formatDate: (dateString: string | Date) => string;
  getUniqueTags: (notes: NewNoteType[]) => string[];
  handleRoutes: () => void;
  getFilteredNotes: (allNotes: NewNoteType[]) => NewNoteType[];
  setIsArchivedPage: (isArchived: boolean) => void;
}

export const useUtilities = create<IUseUtilities>((set, get) => ({
  currentPath: "",
  isArchivedPage: false,
  selectedTags: null,
  routeToTags: false,



  filterAllByTag: false,
  setFilterAllByTag: (val) => set({ filterAllByTag: val }),


  isAllNotesPage: false,
  setIsAllNotesPage: (val) => set({ isAllNotesPage: val }),



  isTagsPage: false,
  setIsTagsPage: (val) => set({ isTagsPage: val }),



  setCurrentPath: (path) => set({ currentPath: path }),
  setRouteToTags: (value) => set({ routeToTags: value }),
  setSelectedTag: (tag) => set({ selectedTags: tag }),
  setIsArchivedPage: (isArchived) => set({ isArchivedPage: isArchived }),

  activeLink: (path) => {
    const currentPath = get().currentPath;
    return currentPath.includes(path) ? "bg-[#F3F5F8]" : "hover:bg-[#F3F5F8]";
  },

  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  },

  getUniqueTags: (notes) => {
    const tagSet = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).map(
      (tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
    );
  },

  handleRoutes: () => set({ routeToTags: true }),

  getFilteredNotes: (allNotes) => {
    const { isArchivedPage, selectedTags, filterAllByTag } = get();
    let notes = allNotes;

    if (!filterAllByTag) {
      notes = isArchivedPage
        ? allNotes.filter((note) => note.isArchived)
        : allNotes.filter((note) => !note.isArchived);
    }

    if (selectedTags) {
      notes = notes.filter((note) => note.tags.includes(selectedTags.toLowerCase()));
    }

    return notes;
  },
}));
