import { create } from "zustand";
import useManageNotes, { NewNoteType } from "./notes.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "../interface";

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

interface IUseUtilities {
  currentPath: string;
  isArchivedPage: boolean;
  selectedTags: string | null;
  routeToTags: boolean;
  axiosError: string;
  isLoading: boolean;
  filterAllByTag: boolean;
  isAllNotesPage: boolean;
  isTagsPage: boolean;
  isSearchPage: boolean;
  searchValue: string;
  isNotePage: boolean;
  isSettingsDetailsPage: boolean;
  isNoteDetailsPage: boolean;
  isSettingsPage: boolean;
  previousPath: string;
  // showPassword: boolean;
  // setShowPassword: (val: boolean) => void;
  setFilterAllByTag: (val: boolean) => void;
  setIsAllNotesPage: (val: boolean) => void;
  setIsTagsPage: (val: boolean) => void;
  setIsSearchPage: (val: boolean) => void;
  setSearchValue: (value: string) => void;
  setIsNotePage: (val: boolean) => void;
  setIsNoteDetailsPage: (val: boolean) => void;
  setIsSettingsDetailsPage: (val: boolean) => void;
  setIsSettingsPage: (val: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setAxiosError: (axiosError: string) => void;
  setSelectedTag: (tag: string | null) => void;
  setCurrentPath: (path: string) => void;
  setRouteToTags: (value: boolean) => void;
  activeLink: (path: string) => string;
  formatDate: (dateString: string | Date) => string;
  getUniqueTags: (notes: NewNoteType[]) => string[];
  handleRoutes: () => void;
  setIsArchivedPage: (isArchived: boolean) => void;
  capitalize: (v: string) => void;
  getFilteredNotesByTag: (tag: string) => void;
  setPreviousPath: (path: string) => void;

  // handleShowPassword: () => void;



    showPasswordFields: {
    oldPassword: false,
    passwordNew: false,
    passwordConfirm: false,
  },
  togglePasswordField: (field: keyof IUseUtilities["showPasswordFields"]) => void;
}

export const useUtilities = create<IUseUtilities>((set, get) => ({
  currentPath: "",
  isArchivedPage: false,
  selectedTags: null,
  routeToTags: false,
  axiosError: "",
  isLoading: false,
  filterAllByTag: false,
  isAllNotesPage: false,
  isTagsPage: false,
  isSearchPage: false,
  searchValue: "",
  isNotePage: false,
  isNoteDetailsPage: false,
  previousPath: "",
  isSettingsPage: false,
  isSettingsDetailsPage: false,
  // showPassword: false,
  // setShowPassword: (showPassword) => set({ showPassword: !showPassword }),

    showPasswordFields: {
    oldPassword: false,
    passwordNew: false,
    passwordConfirm: false,
  },



  togglePasswordField: (field) => {
    const current = get().showPasswordFields[field];
    set((state) => ({
      showPasswordFields: {
        ...state.showPasswordFields,
        [field]: !current,
      },
    }));
  },





  setFilterAllByTag: (val) => set({ filterAllByTag: val }),
  setIsAllNotesPage: (val) => set({ isAllNotesPage: val }),
  setIsTagsPage: (val) => set({ isTagsPage: val }),
  setIsSearchPage: (val) => set({ isSearchPage: val }),
  setSearchValue: (val) => set({ searchValue: val }),
  setIsNotePage: (val) => set({ isNotePage: val }),
  setIsNoteDetailsPage: (val) => set({ isNoteDetailsPage: val }),
  setPreviousPath: (path: string) => set({ previousPath: path }),
  setIsSettingsPage: (val) => set({ isSettingsPage: val }),
  setIsSettingsDetailsPage: (val) => ({ isSettingsDetailsPage: val }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setAxiosError: (axiosError) => set({ axiosError }),
  setCurrentPath: (path) => set({ currentPath: path }),
  setRouteToTags: (value) => set({ routeToTags: value }),
  setSelectedTag: (tag) => set({ selectedTags: tag }),
  setIsArchivedPage: (isArchived) => set({ isArchivedPage: isArchived }),
  // handleShowPassword: () => set({ showPassword: !get().showPassword }),

  activeLink: (path) => {
    const currentPath = get().currentPath;
    const isDarkMode = document.documentElement.classList.contains("dark");

    if (currentPath.includes(path)) {
      return isDarkMode ? "bg-selectedForDark" : "bg-selectedForLight";
    } else {
      return isDarkMode
        ? "hover:bg-selectedForDark"
        : "hover:bg-selectedForLight";
    }
  },

  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  },

  capitalize: (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  getUniqueTags: (notes) => {
    const tagSet = new Set<string>();
    if (!Array.isArray(notes)) return [];
    notes.forEach((note) => {
      if (Array.isArray(note.tags)) {
        note.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).map(
      (tag) => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
    );
  },

  handleRoutes: () => {
    const path = get().currentPath;
    const isTags = path.includes("/tags");
    const isArchive = path.includes("/archive");
    set({
      isTagsPage: isTags,
      isArchivedPage: isArchive,
      filterAllByTag: isTags,
    });
    if (isTags) {
      const parts = path.split("/");
      const tagFromURL = parts[2] || null;
      if (tagFromURL) {
        set({ selectedTags: tagFromURL });
      }
    }
  },

  getFilteredNotesByTag: async (tag: string) => {
    const { getAllNotes } = useManageNotes.getState();
    set({ isLoading: true, axiosError: "" });
    try {
      await getAllNotes();
      set({ selectedTags: tag.toLowerCase() });
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
