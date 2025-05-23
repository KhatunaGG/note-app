// "use client";
// import { useArchivedNotes } from "@/app/store/archives.store";
// import useManageNotes, { NewNoteType } from "@/app/store/notes.store";
// import { useUtilities } from "@/app/store/utilities.store";
// import { useRouter } from "next/navigation";
// import React from "react";

// export type ResetButtonPropsType = {
//   isOverlay?: boolean;
//   isNoteDetailsPage?: boolean;
//   noteById?: NewNoteType | null;
// };

// const ResetButton = ({
//   isOverlay,
//   isNoteDetailsPage,
// }: ResetButtonPropsType) => {
//   const { closeModal, resetNewNote, createNote, noteById } = useManageNotes();
//   const { setArchiveModal } = useArchivedNotes();
//   const { isArchivedPage } = useUtilities();
//   const router = useRouter();

//   const handleNoteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     if (isOverlay) {
//       closeModal();
//       setArchiveModal(false);
//     } else if (createNote) {
//       resetNewNote();
//     } else if (isNoteDetailsPage) {
//       router.push("/note");
//       resetNewNote();
//     } else if (!createNote && noteById && isArchivedPage) {
//       router.push("/archive");
//     } else if (!createNote && noteById) {
//       router.push("/note");
//     }
//   };

//   const baseClass = "text-sm text-[#525866]";
//   const layoutStyle = "bg-[#F3F5F8] py-3 px-4 rounded-lg";
//   const noteDetailStyle =
//     "bg-transparent py-0 px-0 rounded-none lg:bg-[#F3F5F8] lg:py-3 lg:px-4 lg:rounded-lg";

//   return (
//     <button
//       onClick={handleNoteClick}
//       className={`${baseClass} ${isOverlay ? layoutStyle : noteDetailStyle}`}
//     >
//       Cancel
//     </button>
//   );
// };

// export default ResetButton;

"use client";
import { useArchivedNotes } from "@/app/store/archives.store";
import useManageNotes, { NewNoteType } from "@/app/store/notes.store";
import { useUtilities } from "@/app/store/utilities.store";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type ResetButtonPropsType = {
  isOverlay?: boolean;
  isNoteDetailsPage?: boolean;
  noteById?: NewNoteType | null;
};

const ResetButton = ({
  isOverlay,
  isNoteDetailsPage,
}: ResetButtonPropsType) => {
  const { closeModal, resetNewNote, createNote, noteById } = useManageNotes();
  const { setArchiveModal } = useArchivedNotes();
  const { isArchivedPage, isNotePage } = useUtilities();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNoteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isOverlay) {
      closeModal();
      setArchiveModal(false);
    } else if (createNote) {
      resetNewNote();
    } else if (isNoteDetailsPage) {
      router.push("/note");
      resetNewNote();
    } else if (!createNote && noteById && isArchivedPage) {
      router.push("/archive");
    } else if (!createNote && noteById) {
      router.push("/note");
    }
  };

  const baseClass = "text-sm text-[#525866]";
  // const layoutStyle = "bg-[#F3F5F8] py-3 px-4 rounded-lg";
  const layoutStyle = `${
    theme === "dark"
      ? "bg-[#2A2D34] text-[#E0E4EA]"
      : "bg-[#F3F5F8] text-[#525866]"
  }  py-3 px-4 rounded-lg`;
  const noteDetailStyle =
    "bg-transparent py-0 px-0 rounded-none lg:bg-[#F3F5F8] lg:py-3 lg:px-4 lg:rounded-lg";

  return (
    <button
      onClick={handleNoteClick}
      className={`${baseClass} ${
        isOverlay || isNotePage || isArchivedPage
          ? layoutStyle
          : noteDetailStyle
      }`}
    >
      Cancel
    </button>
  );
};

export default ResetButton;
