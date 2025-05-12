"use client";
import { useUtilities } from "@/app/store/utilities.store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export type NotePropsType = {
  title: string;
  content: string;
  tags: string[];
  _id: string;
  isArchived: boolean;
  lastEdited: string;
  isFirstNote: boolean;
  isLastNote: boolean;


  selectedTags: string | null;
};

const Note = ({
  title,
  content,
  tags,
  _id,
  isArchived,
  lastEdited,
  isFirstNote,
  isLastNote,


  selectedTags
}: NotePropsType) => {
  const { formatDate, filterAllByTag, isTagsPage, setIsTagsPage } =
    useUtilities();
  const formatted = formatDate(lastEdited);
  const path = usePathname();




    console.log(selectedTags, "selectedTags");







    

  useEffect(() => {
    setIsTagsPage(path.includes("/tags"));
  }, [path]);

  return (
    <div
      // className={`w-full border-t border-t-[#E0E4EA] p-2 flex flex-col gap-3 border-b border-b-[#E0E4EA]`}
      className={`w-full p-2 flex flex-col gap-3  ${
        !isFirstNote ? "border-t border-t-[#E0E4EA]" : "border-none"
      } ${!isLastNote ? "border-b border-b-[#E0E4EA]" : "border-none"}`}
    >
      <h2 className="text-base font-semibold text-[#0E121B]">{title}</h2>
      <div className="w-full flex flex-wrap gap-1">
        {tags.map((tag, i) => (
          <div
            key={i}
            className="px-[6px] py-[2px] bg-[#E0E4EA] rounded-sm text-xs w-max"
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-between">
        <p className="text-[#2B303B] text-xs ">{formatted}</p>
        {isTagsPage && isArchived === true && (
          <p className="text-[#335CFF] text-xs">Archived</p>
        )}
      </div>
    </div>
  );
};

export default Note;
