import { create } from "zustand";
import { ForgotPasswordType } from "../component/__organism/ForgotPasswordForm/ForgotPasswordForm";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../interface";
import { toast } from "react-toastify";
import { axiosInstance } from "../libs/axiosInstance";
import { ResetPasswordType } from "../component/__organism/resetPasswordForm/ResetPasswordForm";

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

export interface IChangePassword {
  isLoading: boolean;
  axiosError: string;
  resendEmail: string;
  success: boolean;
  newPassword: string;

  sendVerificationLink: (formData: ForgotPasswordType) => void;
  // changePassword: (FormData: ResetPasswordType) => void;
}

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

  // changePassword: async (formData: ResetPasswordType) => {

  //   try {
  //     set({isLoading: true, axiosError: ""})
      

  //   } catch(e){
  //     const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
  //     set({ axiosError: errorMessage });
  //   }

  // }
}));
