"use client";
import useManageNotes from "@/app/store/notes.store";
import { Delete } from "../../__atoms";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { DeleteButtonPropsType } from "@/app/interface";

const DeleteButton = ({ isOverlay }: DeleteButtonPropsType) => {
  const { showModal, noteById, deleteNote, modal } = useManageNotes();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  const handleNoteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (noteById) {
      await showModal();
    }
    if (isOverlay && noteById) {
      deleteNote(noteById?._id || "");
    }
  };

  return (
    <button
      onClick={handleNoteClick}
      className={`${
        isOverlay && modal
          ? "bg-[#FB3748] py-3 px-4  rounded-lg text-white"
          : "bg-transparent text-[#0E121B]"
      }  
       ${theme === "dark" ? "lg:border-[#52586699]" : "lg:border-[#E0E4EA]"}
      
      lg:rounded-lg lg:border lg:px-4  lg:py-[11.5px] lg:flex lg:items-center lg:justify-start lg:gap-2 cursor-pointer`}
    >
      <div className={`${isOverlay && "hidden"}`}>
        <Delete width={"20px"} height={"20px"} />
      </div>
      <p
        className={`${isDark ? "text-white" : "text-[#0E121B]"} ${
          isOverlay ? "block" : "hidden lg:flex "
        } text-sm font-medium `}
      >
        Delete Note
      </p>
    </button>
  );
};

export default DeleteButton;
