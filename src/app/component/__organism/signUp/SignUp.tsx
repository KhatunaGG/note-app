"use client";
import Form from "../form/Form";
import Link from "next/link";
import { Title } from "../../__molecules";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const SignUp = () => {
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  return (
    <section
      className={`${
        isDark ? "bg-[#2B303B]" : "bg-[#F3F5F8]"
      } w-full min-h-screen flex items-center justify-center`}
    >
      <div
        className={`${
          isDark ? "bg-[#0E121B]" : "bg-white"
        } w-[91.46%] md:w-[67.96%] lg:w-[37.5%] rounded-xl px-4 py-[48px] md:px-8 md:py-[48px] lg:p-[48px] flex flex-col gap-4`}
      >
        <Title />
        <Form />
        <div className="w-full flex items-center justify-center gap-2">
          <p className="text-sm font-normal text-[#525866] dark:text-primary-dark">
            Already have an account?
          </p>
          <Link href={"/sign-in"}>
            <p className="text-sm font-bold text-[#525866] dark:text-primary-dark cursor-pointer hover:underline transition-transform duration-300 ease-in-out hover:scale-105">
              Login
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
