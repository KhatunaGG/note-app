"use client";
import { ResetButton, SubmitButton } from "../../__molecules";

export type FooterPropsType = {
  isSubmitting: boolean;
  // noteId: string | null;
  createNote: boolean;
};

const Footer = ({ isSubmitting, createNote }: FooterPropsType) => {
  return (
    <div className="w-full pt-4 pb-5 p-6 lg:flex gap-4 items-center border-t border-t-[#E0E4EA] lg:absolute bottom-0 z-10 left-0 right-0 hidden ">
      <SubmitButton isSubmitting={isSubmitting} createNote={createNote} />
      <ResetButton />
    </div>
  );
};

export default Footer;
