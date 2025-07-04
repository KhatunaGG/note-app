"use client";
import { GoogleIcon, GoogleText } from "../../__atoms";
import { EmailInput, PasswordInput } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpStore } from "@/app/store/sign-up.store";
import { useRouter } from "next/navigation";
import { SignUpType } from "@/app/interface";
import { signUpSchema } from "@/app/schema/schema";

const Form = () => {
  const { signUp } = useSignUpStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: SignUpType) => {
    if (Object.keys(errors).length > 0) return;
    await signUp(formData);
    const success = useSignUpStore.getState().success;
    if (success) {
      reset();
      router.push("/sign-in");
    }
  };

  const signInWithGoogle = () => {
    window.location.href = "https://note-app-server-x9lx.onrender.com/auth/google";
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full pt-6 flex flex-col gap-4"
    >
      <div className="w-full flex flex-col gap-4 ">
        <EmailInput register={register} errors={errors} fieldName="email" />
        <PasswordInput
          register={register}
          errors={errors}
          fieldName="password"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full font-semibold text-base text-white py-[12.5px] rounded-lg bg-[#335CFF] hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Sign up
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

export default Form;
