import { create } from "zustand";
import { SignInType } from "../component/__organism/signInForm/SignInForm";
import { axiosInstance } from "../libs/axiosInstance";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ErrorResponse } from "../interface";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

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

export interface IUser {
  _id: string;
  email: string;
  createdAt: Date;
  avatar: string;
}

export interface ISignInStore {
  isLoading: boolean;
  axiosError: string;
  signInEmail: string;
  signInPassword: string;
  success: boolean;
  accessToken: string | null;
  currentUser: IUser | null;
  setCurrentUser: (currentUser: IUser | null) => void;
  setAccessToken: (token: string) => void;
  setSuccess: (success: boolean) => void;
  setFormData: (signInEmail: string, signInPassword: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setAxiosError: (axiosError: string) => void;
  signIn: (formData: SignInType) => void;
  initialize: () => Promise<void>;
  getCurrentUser: (accessToken: string | undefined) => void;
  logout: () => void;
}

export const useSignInStore = create<ISignInStore>((set) => ({
  isLoading: false,
  axiosError: "",
  signInEmail: "",
  signInPassword: "",
  success: false,
  accessToken: null,
  currentUser: null,
  setAccessToken: (token: string) => set({ accessToken: token }),
  setSuccess: (success) => set({ success }),
  setFormData: (signInEmail, signInPassword) =>
    set({ signInEmail, signInPassword }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setAxiosError: (axiosError) => set({ axiosError }),
  setCurrentUser: (currentUser: IUser | null) => set({ currentUser }),

  signIn: async (formData) => {
    const { signInEmail, signInPassword } = formData;
    try {
      set({ isLoading: true, axiosError: "" });
      const res = await axiosInstance.post(`/auth/sign-in`, {
        email: signInEmail,
        password: signInPassword,
      });
      if (res.status >= 200 && res.status <= 204) {
        const { accessToken } = res.data;
        set({ accessToken });
        set({ success: true });
        setCookie("accessToken", res.data.accessToken, { maxAge: 60 * 60 });
        set({ signInEmail: "", signInPassword: "" });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false, axiosError: "" });
    }
  },

  initialize: async () => {
    const token = getCookie("accessToken");
    if (token && typeof token === "string") {
      set({ accessToken: token });
      await useSignInStore.getState().getCurrentUser(token);
    } else {
      window.location.href = "/sign-up";
    }
  },

  getCurrentUser: async (accessToken: string | undefined) => {
    if (!accessToken) return;
    try {
      const res = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status >= 200 && res.status <= 204) {
        const user: IUser = res.data;
        set({ currentUser: user });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  logout: () => {
    deleteCookie("accessToken");
    set({ currentUser: null, accessToken: "" });
    window.location.href = "/sign-up";
  },
}));
