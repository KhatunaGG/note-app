"use client";
import { useUtilities } from "@/app/store/utilities.store";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NotePropsType = {
  title: string;
  content: string;
  tags: string[];
  _id: string;
  isArchived: boolean;
  lastEdited: string;
  isFirstNote: boolean;
  isLastNote: boolean;

  // selectedTags: string | null;
  isSelected: boolean;
};

const Note = ({
  title,
  tags,
  isArchived,
  lastEdited,
  isFirstNote,
  isLastNote,
  isSelected,
}: NotePropsType) => {
  const { formatDate, isTagsPage, setIsTagsPage } = useUtilities();
  const formatted = formatDate(lastEdited);
  const path = usePathname();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  console.log(isSelected, "isSelected");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsTagsPage(path.includes("/tags"));
  }, [path]);

  // isSelected ? (theme === "dark" ? "bg-#232530CC" : "border-t-[#F3F5F8]") : "";

  return (
    <div
      className={`w-full p-2 flex flex-col gap-3 ${
        isSelected
          ? theme === "dark"
            ? "lg:bg-[#52586699] lg:rounded-md lg:border-none"
            : "lg:bg-[#F3F5F8] lg:rounded-md lg:border-none"
          : ""
      } ${
        theme === "dark"
          ? !isFirstNote
            ? "border-t border-t-[#52586699]"
            : "border-none"
          : !isFirstNote
          ? "border-t border-t-[#E0E4EA]"
          : "border-none"
      } ${
        theme === "dark"
          ? !isLastNote
            ? "border-b border-b-[#52586699]"
            : "border-none"
          : !isLastNote
          ? "border-b border-b-[#E0E4EA]"
          : "border-none"
      }`}
    >
      <h2 className="text-base font-semibold text-primary-light dark:text-primary-dark">
        {title}
      </h2>
      <div className="w-full flex flex-wrap gap-1">
        {tags.map((tag, i) => (
          <div
            key={i}
            className={`${
              theme === "dark" ? "bg-[#525866]" : "bg-[#E0E4EA]"
            } px-[6px] py-[2px]  rounded-sm text-xs w-max`}
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-primary-light dark:text-primary-dark text-xs ">
          {formatted}
        </p>
        {isTagsPage && isArchived === true && (
          <p className="text-[#335CFF] text-xs">Archived</p>
        )}
      </div>
    </div>
  );
};

export default Note;
