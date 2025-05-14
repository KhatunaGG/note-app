import { create } from "zustand";
import { NoteType } from "../component/__organism/noteDetails/NoteDetails";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interface";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { useSignInStore } from "./sign-in.store";
import { useArchivedNotes } from "./archives.store";

export type NewNoteType = {
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  lastEdited: string;
  _id: string;
};

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

export interface IUseManageNotes {
  isLoading: boolean;
  axiosError: string;
  success: boolean;
  createNote: boolean;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  lastEdited: Date;
  allNotes: NewNoteType[] | [];
  noteById: NewNoteType | null;
  activeNote: string | null;
  modal: boolean;

  setModal: (modal: boolean) => void;
  setActiveNote: (id: string) => void;
  setNoteById: (noteById: NewNoteType | null) => void;
  setSuccess: (success: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setCreateNote: (createNote: boolean) => void;
  setAxiosError: (axiosError: string) => void;
  setFormState: (
    title: string,
    content: string,
    tags: string[],
    isArchived: boolean,
    lastEdited: Date
  ) => void;
  // createNewNote: (formData: NoteType) => void;
  createNewNote: (formData: NoteType) => Promise<boolean>;
  getAllNotes: () => void;
  setAllNotes: (allNotes: NewNoteType[] | []) => void;
  getNoteById: (id: string) => Promise<void>;
  toggleCreateNote: () => void;
  deleteNote: (id: string) => void;
  showModal: () => void;
  closeModal: () => void;
  resetNewNote: () => void;
  updateNote: (noteById: NewNoteType) => void;
  getAllNotesIsArchived: () => void;
}

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
  // set((state) => ({ createNote: !state.createNote})),

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
    try {
      const res = await axiosInstance.get("/note", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
   console.log("FIlter by NOT Archived:", res.data);
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

  getAllNotesIsArchived: async () => {
    const accessToken = useSignInStore.getState().accessToken;
     
    set({ isLoading: true, axiosError: "" });
    try {
      const res = await axiosInstance.get("/note/all-archived-notes", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
   console.log("FIlter by IS Archived:", res.data);
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
        // lastEdited: new Date().toString()
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

        // toast.success("Note archived.")
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
}));

export default useManageNotes;
