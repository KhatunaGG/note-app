// import useManageNotes from "@/app/store/notes.store";
// import React from "react";
// import { Delete } from "../../__atoms";

// export type DeleteButtonPropsType = {
//   isOverlay?: boolean;
// };

// const DeleteButton = ({ isOverlay }: DeleteButtonPropsType) => {
//   const { showModal, closeModal, resetNewNote, createNote, noteById, deleteNote } = useManageNotes();
//   // console.log(noteById, "noteById from deleteButton")

//   const handleNoteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     // if (isOverlay) {
//     //   closeModal();
//     // } else if (createNote) {
//     //   resetNewNote();
//     // } else {
//     //   showModal();
//     // }

//     if(noteById) {

//       showModal()
//     }

//   };

//   // const baseClass = "text-sm text-[#525866]";
//   // const layoutStyle = "bg-[#F3F5F8] py-3 px-4 rounded-lg";
//   // const noteDetailStyle =
//   //   "bg-transparent py-0 px-0 rounded-none lg:bg-[#F3F5F8] lg:py-3 lg:px-4 lg:rounded-lg";

//     // className="bg-[#FB3748] text-sm py-3 px-4 rounded-lg text-white"

//   return (
//     <button
//     onClick={handleNoteClick}

//     className="lg:w-full lg:rounded-lg lg:border lg:border-[#CACFD8] text-[#0E121B] font-semibold text-sm lg:px-[15px] lg:py-[11.5px] lg:flex lg:items-center lg:justify-start lg:gap-2">
//       <Delete width={"20px"} height={"20px"} />
//       <p className="hidden text-sm text-[#0E121B] font-medium lg:block">
//         Delete Note
//       </p>
//     </button>
//   );
// };

// export default DeleteButton;

"use client";
import useManageNotes from "@/app/store/notes.store";
import React, { useEffect, useState } from "react";
import { Delete } from "../../__atoms";
import { useTheme } from "next-themes";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

export type DeleteButtonPropsType = {
  isOverlay?: boolean;
};

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
      {/* <p className="hidden text-sm text-[#0E121B] font-medium lg:block"> */}
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
