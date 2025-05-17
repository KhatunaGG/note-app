"use client";
import { useArchivedNotes } from "@/app/store/archives.store";
import useManageNotes, { NewNoteType } from "@/app/store/notes.store";
import { useUtilities } from "@/app/store/utilities.store";
import { useRouter } from "next/navigation";
import React from "react";

export type ResetButtonPropsType = {
  isOverlay?: boolean;
  isNoteDetailsPage?: boolean;
  noteById?: NewNoteType | null;
};

const ResetButton = ({
  isOverlay,
  isNoteDetailsPage,
}: ResetButtonPropsType) => {
  const {  closeModal, resetNewNote, createNote, noteById } =
    useManageNotes();
  const {  setArchiveModal } = useArchivedNotes();
  const { isArchivedPage } = useUtilities();
  const router = useRouter();

  // const handleNoteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (isOverlay) {
  //     closeModal();
  //     setArchiveModal(false);
  //   } else if (createNote) {
  //     resetNewNote();
  //   } else if (isNoteDetailsPage) {
  //     router.push("/note");
  //     resetNewNote();
  //   } else if (!createNote && noteById) {
  //     router.push("/note");
  //   } else if (!createNote && noteById && isArchivedPage) {
  //     router.push("/archive");
  //   }
  // };

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
  const layoutStyle = "bg-[#F3F5F8] py-3 px-4 rounded-lg";
  const noteDetailStyle =
    "bg-transparent py-0 px-0 rounded-none lg:bg-[#F3F5F8] lg:py-3 lg:px-4 lg:rounded-lg";

  return (
    <button
      onClick={handleNoteClick}
      // className="bg-transparent py-0 px-0 rounded-none text-sm text-[#525866] lg:bg-[#F3F5F8]  lg:py-3 lg:px-4 lg:rounded-lg"
      className={`${baseClass} ${isOverlay ? layoutStyle : noteDetailStyle}`}
    >
      Cancel
    </button>
  );
};

export default ResetButton;
