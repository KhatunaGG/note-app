"use client";
import { ArrowLeft } from "../../__atoms";
import Link from "next/link";
import {
  ArchivesButton,
  DeleteButton,
  ResetButton,
  SubmitButton,
} from "../../__molecules";
import useManageNotes, { NewNoteType } from "@/app/store/notes.store";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect } from "react";

export type GoBackPropsType = {
  isNoteDetailsPage?: boolean;
  isNotePage?: boolean;
  noteById?: NewNoteType | null;
  isArchivedPage?: boolean;
  isTagsPage?: boolean;
  isSubmitting?: boolean;
  createNote?: boolean;
  selectedTags?: string | null;
};

const GoBack = ({
  isNoteDetailsPage,
  noteById,
  isNotePage,
  isArchivedPage,
  isSubmitting,
  createNote,
  selectedTags,
}: GoBackPropsType) => {
  const { resetNewNote } = useManageNotes();
  const path = usePathname();
  const { setIsTagsPage, isTagsPage } = useUtilities();

  useEffect(() => {
    setIsTagsPage(path.includes("/tags"));
  }, [path]);

  return (
    // <div className="w-full pb-3 md:pb-4 flex lg:hidden items-center justify-between border-b border-b-[#E0E4EA] pt-[54px] md:pt-0    ">
    <div
      className={`${isNoteDetailsPage || isTagsPage ? "pt-0" : "pt-[54px]"} 
      ${isTagsPage && selectedTags && "px-6 mb-4"}
      ${isTagsPage && noteById && "px-0"}
      
      w-full pb-3 md:pb-4 flex lg:hidden items-center justify-between border-b border-b-[#E0E4EA] md:pt-0`}
    >
      {/* <Link href={isNotePage ? "/note" : isTagsPage ? "/tags" : "/archive"}> */}
      <Link
        href={
          isNotePage
            ? "/note"
            : isTagsPage
            ? noteById && selectedTags
              ? `/tags/${selectedTags}`
              : "/tags"
            : "/archive"
        }
      >
        <div onClick={resetNewNote} className="flex items-center gap-1">
          <ArrowLeft />
          <p className="text-sm text-[#525866]">Go Back</p>
        </div>
      </Link>

      <div className={`${isTagsPage && "hidden"} flex gap-4 items-center`}>
        {!isNoteDetailsPage && <DeleteButton />}
        {!isNoteDetailsPage && (
          <ArchivesButton isArchivedPage={isArchivedPage} />
        )}

        <ResetButton
          isNoteDetailsPage={isNoteDetailsPage}
          noteById={noteById}
        />
        {/* <p className="text-sm  text-[#335CFF]">Save Note</p> */}
        <SubmitButton
          isSubmitting={isSubmitting ?? false}
          createNote={createNote ?? false}
        />
      </div>
    </div>
  );
};

export default GoBack;
