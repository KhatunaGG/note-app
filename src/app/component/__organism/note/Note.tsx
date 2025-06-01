"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { NotePropsType } from "@/app/interface";
import { useUtilities } from "@/app/store/utilities.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setIsTagsPage(path.includes("/tags"));
  }, [path]);

  return (
    <div
      className={`w-full p-2 flex flex-col gap-3 ${
        isSelected
          ? isDark
            ? "lg:bg-[#52586699] lg:rounded-md lg:border-none"
            : "lg:bg-[#F3F5F8] lg:rounded-md lg:border-none"
          : ""
      } ${
        isDark
          ? !isFirstNote
            ? "border-t border-t-[#52586699]"
            : "border-none"
          : !isFirstNote
          ? "border-t border-t-[#E0E4EA]"
          : "border-none"
      } ${
        isDark
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
