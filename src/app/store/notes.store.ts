import { create } from "zustand";
// import { NoteType } from "../component/__organism/noteDetails/NoteDetails";
import axios, { AxiosError } from "axios";
import {
  ErrorResponse,
  IUseManageNotes,
  NewNoteType,
  NoteType,
} from "../interface";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { useSignInStore } from "./sign-in.store";
import { useArchivedNotes } from "./archives.store";
import { useUtilities } from "./utilities.store";

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

const useManageNotes = create<IUseManageNotes>((set, get) => ({
  isLoading: false,
  axiosError: "",
  success: false,
  createNote: false,
  title: "",
  content: "",
  tags: [],
  isArchived: false,
  lastEdited: new Date(),
  allNotes: [],
  noteById: null,
  activeNote: null,
  modal: false,
  setModal: (Modal) => set({ modal: true }),
  setActiveNote: (id) => set({ activeNote: id }),
  setNoteById: (noteById) => set({ noteById }),
  setAllNotes: (allNotes) => set({ allNotes }),
  setSuccess: (success) => set({ success }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setCreateNote: (createNote) => set({ createNote }),
  setAxiosError: (axiosError) => set({ axiosError }),
  setFormState: (title, content, tags, isArchived) =>
    set({ title, content, tags, isArchived }),
  toggleCreateNote: () =>
    set((state) => ({ createNote: !state.createNote, noteById: null })),

  createNewNote: async (formData: NoteType) => {
    set({ isLoading: true, axiosError: "" });
    const accessToken = useSignInStore.getState().accessToken;
    const tagsArray: string[] = formData.tags
      .toString()
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const newNote = {
      ...formData,
      tags: tagsArray,
      lastEdited: new Date().toString(),
    };

    try {
      const res = await axiosInstance.post("note", newNote, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status >= 200 && res.status <= 204) {
        useManageNotes.getState().getAllNotes();
        set({
          title: "",
          content: "",
          tags: [],
          isArchived: false,
          lastEdited: undefined,
          success: true,
          createNote: false,
        });
        return true;
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
    return false;
  },

  getAllNotes: async () => {
    set({ isLoading: true, axiosError: "" });
    const accessToken = useSignInStore.getState().accessToken;
    if (!accessToken) {
      set({ isLoading: false });
      return;
    }
    const path = useUtilities.getState().currentPath;
    const endpoint = path.includes("/archive")
      ? "/note?isArchived=true"
      : path.includes("/note")
      ? "/note?isArchived=false"
      : "/note";
    try {
      if (!axiosInstance || typeof axiosInstance.get !== "function") {
        set({ isLoading: false });
        return;
      }
      const res = await axiosInstance.get(endpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status >= 200 && res.status <= 204) {
        set({ allNotes: res.data, success: true });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  getNoteById: async (id: string) => {
    const accessToken = useSignInStore.getState().accessToken;
    set({ isLoading: true, axiosError: "" });

    try {
      const res = await axiosInstance.get(`/note/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status >= 200 && res.status <= 204) {
        set({ noteById: res.data, success: true });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  closeModal: () => {
    set({ modal: false });
  },

  resetNewNote: () => {
    set({ createNote: false, noteById: null });
    set({
      title: "",
      content: "",
      tags: [],
      isArchived: false,
      lastEdited: undefined,
      success: true,
      createNote: false,
    });
  },

  deleteNote: async (id: string): Promise<boolean> => {
    const accessToken = useSignInStore.getState().accessToken;
    const closeModal = get().closeModal;
    const getAllNotes = get().getAllNotes;
    set({ isLoading: true, axiosError: "" });
    try {
      const res = await axiosInstance.delete(`note/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status >= 200 && res.status <= 204) {
        closeModal();
        getAllNotes();
        window.location.href = "/note";
        set({ noteById: null, success: true });
        return true;
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
    return false;
  },

  updateNote: async (noteById: NewNoteType) => {
    const accessToken = useSignInStore.getState().accessToken;
    set({ isLoading: true, axiosError: "" });
    if (!accessToken) {
      set({ axiosError: "No access token available" });
      set({ isLoading: false });
      return false;
    }
    try {
      const updatedData = {
        isArchived: !noteById.isArchived,
      };
      const res = await axiosInstance.patch(
        `/note/${noteById._id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.status >= 200 && res.status <= 204) {
        await get().getAllNotes();
        useArchivedNotes.getState().setArchiveModal(false);
        set({ success: true, noteById: null });
        return true;
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false });
    }
    return false;
  },

  showModal: () => {
    set({ modal: true });
  },

  getSearchedNotes: () => {
    const { allNotes } = get();
    const { searchValue, isArchivedPage, selectedTags, isTagsPage } =
      useUtilities.getState();
    let filtered = allNotes || [];
    if (typeof isArchivedPage === "boolean" && !isTagsPage) {
      filtered = filtered.filter((note) => note.isArchived === isArchivedPage);
    }
    if (selectedTags) {
      filtered = filtered.filter((note) =>
        note.tags?.some(
          (tag) => tag.toLowerCase() === selectedTags.toLowerCase()
        )
      );
    }

    if (searchValue?.trim()) {
      const lowerSearch = searchValue.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(lowerSearch) ||
          note.content.toLowerCase().includes(lowerSearch) ||
          note.tags.some((tag) => tag.toLowerCase().includes(lowerSearch))
      );
    }
    return filtered;
  },
}));

export default useManageNotes;
