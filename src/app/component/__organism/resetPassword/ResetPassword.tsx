"use client";
import { usePathname } from "next/navigation";
import { Title } from "../../__molecules";
import ResetPasswordForm from "../resetPasswordForm/ResetPasswordForm";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const ResetPassword = () => {
  const path = usePathname();
  const isResetPassword = path === "/reset-password";
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  return (
    <section
      className={`${
        isDark ? "bg-[#2B303B]" : "bg-[#F3F5F8]"
      }  w-full min-h-screen flex items-center justify-center`}
    >
      <div
        className={`${
          isDark ? "bg-[#0E121B]" : "bg-white"
        } w-[91.46%] md:w-[67.96%] lg:w-[37.5%] rounded-xl px-4 py-[48px] md:px-8 md:py-[48px] lg:p-[48px] flex flex-col gap-4`}
      >
        <Title isResetPassword={true} />
        <ResetPasswordForm />
      </div>
    </section>
  );
};

export default ResetPassword;
