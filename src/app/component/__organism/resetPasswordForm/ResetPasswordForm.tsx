"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../__molecules";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { axiosInstance } from "@/app/libs/axiosInstance";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ResetPasswordType } from "@/app/interface";
import { confirmPasswordSchema } from "@/schema/schema";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(confirmPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formState: ResetPasswordType) => {
    const linkToken = searchParams.get("token");
    setIsLoading(true);
    try {
      const res = await axiosInstance.post(`/auth/reset-password`, {
        newPassword: formState.newPassword,
        linkToken: linkToken,
      });
      if (res.status >= 200 && res.status <= 204) {
        reset();
        setIsLoading(false);
        router.push("/sign-in");
      }
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data?.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full pt-6 flex flex-col gap-4"
    >
      <PasswordInput
        register={register}
        errors={errors}
        fieldName="newPassword"
      />
      <PasswordInput
        register={register}
        errors={errors}
        fieldName="confirmPassword"
      />

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full font-semibold text-base text-white py-[12.5px] rounded-lg bg-[#335CFF] hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Reset Password
      </button>
    </form>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
