import { create } from "zustand";
import axios, { AxiosError } from "axios";
import {
  ErrorResponse,
  ForgotPasswordType,
  IChangePassword,
} from "../interface";
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

export const useChangePasswordStore = create<IChangePassword>((set) => ({
  isLoading: false,
  axiosError: "",
  resendEmail: "",
  success: false,
  newPassword: "",
  sendVerificationLink: async (formData: ForgotPasswordType) => {
    const { resendEmail } = formData;
    try {
      set({ isLoading: true, axiosError: "" });
      const res = await axiosInstance.post(`/auth/check-by-email`, {
        email: resendEmail,
      });
      if (res.status >= 200 && res.status <= 204) {
        set({ success: true, resendEmail: "" });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    } finally {
      set({ isLoading: false, axiosError: "", resendEmail: "" });
    }
  },
}));
