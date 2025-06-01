"use client";
import { EmailInput } from "../../__molecules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChangePasswordStore } from "@/app/store/change-password.store";
import { useEffect } from "react";
import { ForgotPasswordType } from "@/app/interface";
import { forgotPasswordSchema } from "@/schema/schema";

const ForgotPasswordForm = () => {
  const { sendVerificationLink, success } = useChangePasswordStore();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      resendEmail: "",
    },
  });

  const onSubmit = async (formData: ForgotPasswordType) => {
    await sendVerificationLink(formData);
  };

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full pt-6 flex flex-col gap-4"
    >
      <EmailInput register={register} errors={errors} fieldName="resendEmail" />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-semibold text-base text-white py-[12.5px] rounded-lg bg-[#335CFF] hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
