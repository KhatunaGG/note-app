"use client";
import { useArchivedNotes } from "@/app/store/archives.store";
import { Archives, Restore } from "../../__atoms";
import useManageNotes from "@/app/store/notes.store";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect } from "react";

export type ArchiveButtonPropsType = {
  isOverlay?: boolean;
  isArchivedPage?: boolean;
};

const ArchivesButton = ({
  isOverlay,
  isArchivedPage,
}: ArchiveButtonPropsType) => {
  const path = usePathname();
  // const isArchiePage = path === "/archive";
  const { noteById, updateNote } = useManageNotes();
  const { setArchiveModal } = useArchivedNotes();
  const { isNotePage, setIsNotePage, setIsSearchPage } =
    useUtilities();

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
      }  lg:rounded-lg lg:border lg:border-[#CACFD8] lg:px-4  lg:py-[11.5px] lg:flex lg:items-center lg:justify-start lg:gap-2 cursor-pointer`}
    >
      <div className={`${isOverlay && "hidden"}`}>
        {isArchivedPage ? (
          <Restore width={"20px"} height={"20px"} />
        ) : (
          <Archives width={"20px"} height={"20px"} />
        )}
      </div>
      <p
        className={`${
          isOverlay ? "block text-white" : "hidden lg:flex text-[#0E121B] "
        } text-sm font-medium `}
      >
        {/* {isArchivedPage ? "Restore Note" : "Archive Note"} */}

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
