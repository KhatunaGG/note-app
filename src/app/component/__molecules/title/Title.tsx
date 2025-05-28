"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { Logo } from "../../__atoms";

export type TitlePropsType = {
  isSignInPage?: boolean;
  isForgotPassword?: boolean;
  isResetPassword?: boolean;
};

const Title = ({
  isSignInPage,
  isForgotPassword,
  isResetPassword,
}: TitlePropsType) => {
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <Logo />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <h1
          className={`${
            isDark ? "text-white" : "text-[#0E121B]"
          }   font-bold text-2xl`}
        >
          {isSignInPage
            ? "Welcome to Note"
            : isForgotPassword
            ? "Forgotten your password?"
            : isResetPassword
            ? "Reset Your Password"
            : "Create Your Account"}
        </h1>
        <p className="font-regular text-sm text-[#525866]">
          {isSignInPage
            ? " Please log in to continue"
            : isForgotPassword
            ? "Enter your email below, and we’ll send you a link to reset it."
            : isResetPassword
            ? "Choose a new password to secure your account."
            : "Sign up to start organizing your notes and boost your productivity."}
        </p>
      </div>
    </>
  );
};

export default Title;
