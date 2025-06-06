"use client";
import { useArchivedNotes } from "@/app/store/archives.store";
import { Archives, Restore } from "../../__atoms";
import useManageNotes from "@/app/store/notes.store";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect } from "react";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { ArchiveButtonPropsType } from "@/app/interface";

const ArchivesButton = ({
  isOverlay,
  isArchivedPage,
}: ArchiveButtonPropsType) => {
  const path = usePathname();
  const { noteById, updateNote } = useManageNotes();
  const { setArchiveModal } = useArchivedNotes();
  const { isNotePage, setIsNotePage, setIsSearchPage } = useUtilities();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    setIsNotePage(path.includes("/note"));
    setIsSearchPage(path.includes("/search"));
  }, [path]);

  const handleNoteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isOverlay && noteById) {
      setArchiveModal(true);
    } else if (isOverlay && noteById) {
      await updateNote(noteById);
    } else if (isArchivedPage && noteById) {
      await updateNote(noteById);
    }
  };

  return (
    <button
      onClick={handleNoteClick}
      type="button"
      className={`${
        isOverlay
          ? "bg-[#335CFF] py-3 px-4  rounded-lg text-white"
          : "bg-transparent text-[#0E121B]"
      }  ${theme === "dark" ? "lg:border-[#52586699]" : "lg:border-[#E0E4EA]"}
      
      lg:rounded-lg lg:border lg:px-4  lg:py-[11.5px] lg:flex lg:items-center lg:justify-start lg:gap-2 cursor-pointer`}
    >
      <div className={`${isOverlay && "hidden"}`}>
        {isArchivedPage ? (
          <Restore width={"20px"} height={"20px"} />
        ) : (
          <Archives width={"20px"} height={"20px"} />
        )}
      </div>
      <p
        className={`${isDark ? "text-white" : "text-[#0E121B]"} ${
          isOverlay ? "block" : "hidden lg:flex "
        } text-sm font-medium `}
      >
        {isArchivedPage
          ? "Restore Note"
          : isNotePage
          ? "Archive Note"
          : "Restore Note"}
      </p>
    </button>
  );
};

export default ArchivesButton;
