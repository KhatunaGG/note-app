import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { ErrorResponse, ISignUpStore } from "../interface";
import { toast } from "react-toastify";
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

export const useSignUpStore = create<ISignUpStore>((set) => ({
  isLoading: false,
  axiosError: "",
  email: "",
  password: "",
  success: false,
  setSuccess: (success) => set({ success }),
  setFormData: (email, password) => set({ email, password }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setAxiosError: (axiosError) => set({ axiosError }),
  signUp: async (formData) => {
    set({ isLoading: true, axiosError: "" });
    try {
      set({ email: formData.email, password: formData.password });
      const res = await axiosInstance.post(`/auth/sign-up`, formData);

      if (res.status >= 200 && res.status <= 204) {
        set({ isLoading: false, axiosError: "" });
        set({ success: true });
        toast.success(res.data.message);
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false, axiosError: "" });
    }
  },
}));
