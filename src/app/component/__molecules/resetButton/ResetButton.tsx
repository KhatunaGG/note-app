"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { ResetButtonPropsType } from "@/app/interface";
import { useArchivedNotes } from "@/app/store/archives.store";
import useManageNotes from "@/app/store/notes.store";
import { useUtilities } from "@/app/store/utilities.store";
import { useRouter } from "next/navigation";

const ResetButton = ({
  isOverlay,
  isNoteDetailsPage,
  noteParam,
}: ResetButtonPropsType) => {
  const { closeModal, resetNewNote, createNote, noteById } = useManageNotes();
  const { setArchiveModal } = useArchivedNotes();
  const { isArchivedPage, isNotePage } = useUtilities();
  const router = useRouter();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

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
  const layoutStyle = `${
    isDark ? "bg-[#2A2D34] text-[#E0E4EA]" : "bg-[#F3F5F8] text-[#525866]"
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
      } ${noteParam && "bg-transparent"} `}
    >
      Cancel
    </button>
  );
};

export default ResetButton;
