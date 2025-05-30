// "use client";
// import { useMountedTheme } from "@/app/hooks/useMountedTheme";
// import { useArchivedNotes } from "@/app/store/archives.store";
// import useManageNotes, { NewNoteType } from "@/app/store/notes.store";
// import { useUtilities } from "@/app/store/utilities.store";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";

// export type ResetButtonPropsType = {
//   isOverlay?: boolean;
//   isNoteDetailsPage?: boolean;
//   noteById?: NewNoteType | null;


//   noteParam?: string;
// };

// const ResetButton = ({
//   isOverlay,
//   isNoteDetailsPage,
//   noteParam
// }: ResetButtonPropsType) => {
//   const { closeModal, resetNewNote, createNote, noteById } = useManageNotes();
//   const { setArchiveModal } = useArchivedNotes();
//   const { isArchivedPage, isNotePage, setIsNoteDetailsPage } = useUtilities();
//   const router = useRouter();
//   // const [mounted, setMounted] = useState(false);
//   // const { theme, systemTheme } = useTheme();
//   const { mounted, theme } = useMountedTheme();
//   const isDark = mounted && theme === "dark";




// //   const path = usePathname()
// // useEffect(() => {
// //   const isDetails = /^\/note\/[a-zA-Z0-9]+$/.test(path);
// //   setIsNoteDetailsPage(isDetails);
// // }, [path]);





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
//   const layoutStyle = `${
//     isDark ? "bg-[#2A2D34] text-[#E0E4EA]" : "bg-[#F3F5F8] text-[#525866]"
//   }  py-3 px-4 rounded-lg`;
//   const noteDetailStyle =
//     "bg-transparent py-0 px-0 rounded-none lg:bg-[#F3F5F8] lg:py-3 lg:px-4 lg:rounded-lg";

//     const smallScreenStyles = "bg-[#2A2D34] text-[#E0E4EA]"

//     // console.log(noteById, "noteById")
//     // console.log(noteParam, "noteParam")
//     // console.log(isNoteDetailsPage, "isNoteDetailsPage")



//   return (
//     <button
//       onClick={handleNoteClick}
//       className={`${baseClass} ${
//         isOverlay || isNotePage || isArchivedPage
//           ? layoutStyle
//           : noteDetailStyle
//       }`}
//     >
//       Cancel
//     </button>
//   );
// };

// export default ResetButton;




"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { useArchivedNotes } from "@/app/store/archives.store";
import useManageNotes, { NewNoteType } from "@/app/store/notes.store";
import { useUtilities } from "@/app/store/utilities.store";
import {  useRouter } from "next/navigation";


export type ResetButtonPropsType = {
  isOverlay?: boolean;
  isNoteDetailsPage?: boolean;
  noteById?: NewNoteType | null;


  noteParam?: string;
};

const ResetButton = ({
  isOverlay,
  isNoteDetailsPage,
  noteParam
}: ResetButtonPropsType) => {
  const { closeModal, resetNewNote, createNote, noteById } = useManageNotes();
  const { setArchiveModal } = useArchivedNotes();
  const { isArchivedPage, isNotePage } = useUtilities();
  const router = useRouter();
  // const [mounted, setMounted] = useState(false);
  // const { theme, systemTheme } = useTheme();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";




//   const path = usePathname()
// useEffect(() => {
//   const isDetails = /^\/note\/[a-zA-Z0-9]+$/.test(path);
//   setIsNoteDetailsPage(isDetails);
// }, [path]);





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
