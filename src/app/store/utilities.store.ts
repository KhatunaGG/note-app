import { create } from "zustand";
import useManageNotes, { NewNoteType } from "./notes.store";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "../interface";
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

interface IUseUtilities {
  currentPath: string;
  isArchivedPage: boolean;
  selectedTags: string | null;
  routeToTags: boolean;
  axiosError: string;
  isLoading: boolean;

  filterAllByTag: boolean;
  setFilterAllByTag: (val: boolean) => void;

  isAllNotesPage: boolean;
  setIsAllNotesPage: (val: boolean) => void;

  isTagsPage: boolean;
  setIsTagsPage: (val: boolean) => void;

  isSearchPage: boolean;
  setIsSearchPage: (val: boolean) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  isNotePage: boolean;
  setIsNotePage: (val: boolean) => void;

  isNoteDetailsPage: boolean;
  setIsNoteDetailsPage: (val: boolean) => void;



  isSettingsDetailsPage: boolean;
  setIsSettingsDetailsPage: (val: boolean) => void;

  isSettingsPage: boolean;
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
  // getFilteredNotes: (allNotes: NewNoteType[]) => NewNoteType[];
  setIsArchivedPage: (isArchived: boolean) => void;
  capitalize: (v: string) => void;

  // handleRoutes: () => void;

  getFilteredNotesByTag: (tag: string) => void;

  previousPath: string;
  setPreviousPath: (path: string) => void;
}

export const useUtilities = create<IUseUtilities>((set, get) => ({
  currentPath: "",
  isArchivedPage: false,
  selectedTags: null,
  routeToTags: false,
  axiosError: "",
  isLoading: false,

  filterAllByTag: false,
  setFilterAllByTag: (val) => set({ filterAllByTag: val }),

  isAllNotesPage: false,
  setIsAllNotesPage: (val) => set({ isAllNotesPage: val }),

  isTagsPage: false,
  setIsTagsPage: (val) => set({ isTagsPage: val }),

  isSearchPage: false,
  setIsSearchPage: (val) => set({ isSearchPage: val }),

  searchValue: "",
  setSearchValue: (val) => set({ searchValue: val }),

  isNotePage: false,
  setIsNotePage: (val) => set({ isNotePage: val }),

  isNoteDetailsPage: false,
  setIsNoteDetailsPage: (val) => set({ isNoteDetailsPage: val }),

  previousPath: "",
  setPreviousPath: (path: string) => set({ previousPath: path }),

  isSettingsPage: false,
  setIsSettingsPage: (val) => set({isSettingsPage: val}),


  isSettingsDetailsPage: false,
  setIsSettingsDetailsPage: (val) => ({isSettingsDetailsPage: val}),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setAxiosError: (axiosError) => set({ axiosError }),
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


    // const isSettings = path.includes("/settings");

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
    const accessToken = useSignInStore.getState().accessToken;

    const setAllNotes = useManageNotes.getState().setAllNotes;
    set({ isLoading: true, axiosError: "" });
    try {
      const res = await axiosInstance.get(`/note/filtered-by-tag/${tag}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("FIlter by TAG:", res.data);
      if (res.status >= 200 && res.status <= 204) {
        setAllNotes(res.data.filteredByTag);
        get().setSelectedTag(res.data.tag);
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
