"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { ResetButton, SubmitButton } from "../../__molecules";
import { FooterPropsType } from "@/app/interface";

const Footer = ({ isSubmitting, createNote }: FooterPropsType) => {
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";
  return (
    <div
      className={`${
        isDark ? "border-t-[#52586699]" : "border-t-[#E0E4EA]"
      } w-full pt-4 pb-5 p-6 lg:flex gap-4 items-center border-t  lg:absolute bottom-0 z-10 left-0 right-0 hidden `}
    >
      <SubmitButton isSubmitting={isSubmitting} createNote={createNote} />
      <ResetButton />
    </div>
  );
};

export default Footer;
