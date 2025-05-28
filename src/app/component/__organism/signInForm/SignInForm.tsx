"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { EmailInput, PasswordInput } from "../../__molecules";
import { GoogleIcon, GoogleText } from "../../__atoms";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { setCookie } from "cookies-next";

export const signInSchema = z.object({
  signInEmail: z
    .string()
    .min(1, "Email is requeued")
    .nonempty("Email password is required"),
  signInPassword: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
});

export type SignInType = z.infer<typeof signInSchema>;

export type SignInFormPropsType = {
  isSignInPage: boolean;
};

const SignInForm = ({ isSignInPage }: SignInFormPropsType) => {
  const queryParams = useSearchParams();
  const { signIn, getCurrentUser } = useSignInStore();
  const router = useRouter();

  useEffect(() => {
    const token = queryParams.get("token");
    if (token) {
      getCurrentUser(token);
      setCookie("accessToken", token, { maxAge: 60 * 60 });
      router.push("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      signInEmail: "",
      signInPassword: "",
    },
  });

  const onSubmit = async (formData: SignInType) => {
    if (Object.keys(errors).length > 0) return;
    await signIn(formData);
    const success = useSignInStore.getState().success;
    if (success) {
      reset();
      router.push("/");
    }
  };

  const signInWithGoogle = () => {
    window.location.href = "http://localhost:3003/auth/google";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full pt-6 flex flex-col gap-4"
    >
      <div className="w-full flex flex-col gap-4 ">
        <EmailInput
          register={register}
          errors={errors}
          fieldName="signInEmail"
        />
        <PasswordInput
          register={register}
          errors={errors}
          fieldName="signInPassword"
          isSignInPage={true}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-semibold text-base text-white py-[12.5px] rounded-lg bg-[#335CFF] hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Sign in
        </button>
      </div>

      <div className="w-full pt-6 flex flex-col gap-4">
        <p className="w-full flex items-center justify-center text-[#525866]">
          Or log in with:
        </p>
        <button
          onClick={signInWithGoogle}
          type="button"
          className="font-semibold text-base text-white py-[12.5px] rounded-lg border border-[#CACFD8] flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <GoogleIcon />
          <GoogleText />
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
