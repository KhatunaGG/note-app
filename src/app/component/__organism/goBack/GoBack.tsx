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
import { usePathname, useRouter } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export type GoBackPropsType = {
  isNoteDetailsPage?: boolean;
  isNotePage?: boolean;
  noteById?: NewNoteType | null;
  isArchivedPage?: boolean;
  isTagsPage?: boolean;
  isSubmitting?: boolean;
  createNote?: boolean;
  selectedTags?: string | null;
  settingsParam?: string;
};

const GoBack = ({
  isNoteDetailsPage,
  noteById,
  isNotePage,
  isArchivedPage,
  isSubmitting,
  createNote,
  selectedTags,
  settingsParam,
}: GoBackPropsType) => {
  const { resetNewNote } = useManageNotes();
  const path = usePathname();
  const router = useRouter();
  const { setIsTagsPage, isTagsPage, isSettingsPage } = useUtilities();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsTagsPage(path.includes("/tags"));
  }, [path]);

  const { previousPath } = useUtilities();
  const handleBackClick = () => {
    if (previousPath) {
      router.push(previousPath);
    } else {
      router.back();
    }
  };

  const isFontThemePage = path === `/settings/${settingsParam}`;
  const isSettingsRootPage = path === "/settings";

  return (
    <div
      className={`${
        isNoteDetailsPage ||
        isTagsPage ||
        (isSettingsPage && settingsParam) ||
        isArchivedPage
          ? "pt-0"
          : "pt-[54px]"
      }
      ${isTagsPage && "px-6 mb-4"}
      ${isTagsPage && noteById && "px-0"}
      

      w-full pb-3 md:pb-4 flex lg:hidden items-center justify-between border-b  md:pt-0
      ${theme === "dark" ? "border-b-[#52586699]" : "border-b-[#E0E4EA]"}
      
      `}
    >
      {/* //   <div
  //   className={`${isFontThemePage ? "pt-0" : "pt-[54px]"} 
  //     ${isTagsPage && "px-6 mb-4"} 
  //     ${isTagsPage && noteById && "px-0"} 
  //     w-full pb-3 md:pb-4 flex lg:hidden items-center justify-between border-b border-b-[#E0E4EA] md:pt-0`}
  // > */}

      <Link
        // href={
        //   isNotePage
        //     ? "/note"
        //     : isTagsPage
        //     ? noteById && selectedTags
        //       ? `/tags/${selectedTags}`
        //       : "/tags"
        //     : "/archive"
        // }

        href={
          isNotePage
            ? "/note"
            : isTagsPage
            ? noteById && selectedTags
              ? `/tags/${selectedTags}`
              : "/tags"
            : isSettingsPage && settingsParam
            ? "/settings"
            : "/archive"
        }
      >
        <div
          onClick={() => {
            resetNewNote();
            handleBackClick();
          }}
          className="flex items-center gap-1"
        >
          <ArrowLeft />
          <p className={`${theme ? "text-white" : "text-[#525866]"} text-sm `}>
            {isSettingsPage ? "Settings" : "Go Back"}
          </p>
        </div>
      </Link>

      <div
        className={`${
          isTagsPage || (isSettingsPage && settingsParam && "hidden")
        } flex gap-4 items-center`}
      >
        {!isNoteDetailsPage && <DeleteButton />}
        {!isNoteDetailsPage && (
          <ArchivesButton isArchivedPage={isArchivedPage} />
        )}
        <ResetButton
          isNoteDetailsPage={isNoteDetailsPage}
          noteById={noteById}
        />
        <SubmitButton
          isSubmitting={isSubmitting ?? false}
          createNote={createNote ?? false}
        />
      </div>
    </div>
  );
};

export default GoBack;
