// "use client";
// import Note from "../note/Note";
// import { Plus } from "../../__atoms";
// import Link from "next/link";
// import useManageNotes from "../../../store/notes.store";

// import { usePathname } from "next/navigation";
// import { useEffect } from "react";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { useUtilities } from "@/app/store/utilities.store";
// import GoBack from "../goBack/GoBack";

// const Notes = () => {
//   const { accessToken } = useSignInStore();
//   const { allNotes, getNoteById, getAllNotes, toggleCreateNote, noteById } =
//     useManageNotes();
//   const { isArchivedPage, setIsNotePage, isNotePage } = useUtilities();
//   const path = usePathname();
//   // const isArchivedPage = path.includes("archive");

//   useEffect(() => {
//     setIsArchivedPage(path.includes("/archive"));
//     setIsNotePage(path.includes("/note"));
//   }, [path]);

//   const {
//     routeToTags,
//     setFilterAllByTag,
//     selectedTags,
//     getFilteredNotes,
//     setSelectedTag,
//     setIsArchivedPage,
//     isTagsPage,
//     searchValue,
//     isSearchPage,
//     setIsTagsPage,
//   } = useUtilities();

//   // console.log(noteById, "noteById");
//   // console.log(path, "PATH");
//   // console.log(isNotePage, "isNotePage");

//   useEffect(() => {
//     if (path.includes("archive")) {
//       setIsArchivedPage(true);
//       if (!selectedTags) {
//         setFilterAllByTag(false);
//       }
//     } else {
//       setIsArchivedPage(false);
//     }
//     setIsTagsPage(path.includes("/tags"));
//     if (path.includes("/tags")) {
//       setFilterAllByTag(true);
//       // setSelectedTag(selectedTags);
//     } else if (
//       !path.includes("tags") &&
//       !path.includes("note") &&
//       !path.includes("archive")
//     ) {
//       setFilterAllByTag(false);
//       setSelectedTag(null);
//     }
//   }, [
//     path,
//     setIsArchivedPage,
//     setIsTagsPage,
//     setSelectedTag,
//     setFilterAllByTag,
//   ]);

//   useEffect(() => {
//     getAllNotes();
//   }, []);

//   const notesToRender = getFilteredNotes(allNotes);

//   const handleCreate = () => {
//     toggleCreateNote();
//   };

//   const handleNoteClick = async (id: string) => {
//     await getNoteById(id);
//   };

//   if (!accessToken) return null;

//   return (
//     // <div className="w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] pt-4 lg:pt-0">
//     <div
//       className={`${
//         isSearchPage && "min-h-[calc(100vh-99px)] md:min-h-[calc(100vh-119px)]"
//       }  w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] pt-4 lg:pt-0`}
//     >
//       {isTagsPage && selectedTags && <GoBack isTagsPage={isTagsPage} />}

//       <div
//         className={`${
//           routeToTags && "hidden"
//         }  px-8  lg:pl-8 md:pt-6 lg:pt-[20px] lg:pr-4 flex flex-col
//     lg:border lg:border-[#E0E4EA] rounded-t-xl overflow-hidden lg:rounded-t-[0px]  relative min-h-screen `}
//       >
//         <h1
//           className={`${
//             isTagsPage
//               ? "text-sm font-medium text-[#717784] pt-2"
//               : "font-bold text-[24px] text-[#0E121B]"
//           } ${isSearchPage && "hidden"} block  lg:hidden`}
//         >
//           {isArchivedPage
//             ? "Archived Notes"
//             : isTagsPage
//             ? `Notes Tagged: ${selectedTags}`
//             : "All Notes"}
//         </h1>

//         <div className="w-full flex-flex-col gap-4">
//           <button
//             onClick={handleCreate}
//             className="hidden   transition-transform duration-300 ease-in-out hover:scale-105 w-full bg-[#335CFF] rounded-lg text-white text-sm font-normal py-3 lg:flex items-center justify-center"
//           >
//             + Create New Note
//           </button>

//           <Link href={"/noteDetails"}>
//             <button
//               // onClick={resetNewNote}
//               type="button"
//               className=" bg-green-600 text-white text-sm font-normal
//         fixed right-8 bottom-[90px] h-[48px] w-[48px]
//        md:h-[64px] md:w-[64px] rounded-full
//        items-center justify-center lg:hidden  "
//             >
//               <div className="w-full flex items-center justify-center gap-1">
//                 <Plus />
//                 <span className="hidden lg:block lg:text-sm font-medium ">
//                   +
//                 </span>
//                 <span className="hidden text-sm font-medium lg:block">
//                   Create New Note
//                 </span>
//               </div>
//             </button>
//           </Link>

//           {/* pt-[154px] md:pt-[74px] lg:pt-[81px] */}

//           <div
//             className={`${
//               isSearchPage && "mt-[99px] md:mt-[119px]"
//             } w-full flex flex-col md:pb-[114px] lg:pb-[37px] `}
//           >
//             {(notesToRender.length > 0 && !searchValue && !isSearchPage) ||
//             (notesToRender.length > 0 && searchValue && isSearchPage) ? (
//               notesToRender.map((note, i) => {
//                 const isFirstNote = i === 0;
//                 const isLastNote = i === notesToRender.length - 1;
//                 return (
//                   <div
//                     key={note._id}
//                     className="w-full"
//                     onClick={() => handleNoteClick(note._id)}
//                   >
//                     <Link
//                       href={`${
//                         isArchivedPage
//                           ? `/archive/${note._id}`
//                           : `/note/${note._id}`
//                       }`}

//                       // href={`${
//                       //   isArchivedPage
//                       //     ? `/archive/${note._id}`
//                       //     : isTagsPage
//                       //     ? `/tags/${selectedTags}/${note._id}`
//                       //     : `/note/${note._id}`
//                       // }`}
//                     >
//                       <Note
//                         title={note.title}
//                         tags={note.tags}
//                         _id={note._id}
//                         content={note.content}
//                         isArchived={note.isArchived}
//                         lastEdited={note.lastEdited}
//                         isFirstNote={isFirstNote}
//                         isLastNote={isLastNote}
//                         selectedTags={selectedTags}
//                       />
//                     </Link>
//                   </div>
//                 );
//               })
//             ) : (
//               // <div className="w-full flex flex-col gap-4">
//               //   <p className="text-sm font-medium text-[#0E121B]">
//               //     {isArchivedPage
//               //       ? "All your archived notes are stored here. You can restore or delete them anytime."
//               //       : "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."}
//               //   </p>
//               //   <p className="p-2 block rounded-xl bg-[#E0E4EA] text-sm">
//               //     {isArchivedPage
//               //       ? "No notes have been archived yet. Move notes here for safekeeping, or create a new note."
//               //       : ""}
//               //   </p>
//               // </div>

//               <div className="w-full ">
//                 {!isSearchPage ? (
//                   <div className="w-full flex flex-col gap-4">
//                     <p className="text-sm font-medium text-[#0E121B]">
//                       {isArchivedPage
//                         ? "All your archived notes are stored here. You can restore or delete them anytime."
//                         : "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."}
//                     </p>
//                     <p className="p-2 block rounded-xl bg-[#E0E4EA] text-sm">
//                       {isArchivedPage
//                         ? "No notes have been archived yet. Move notes here for safekeeping, or create a new note."
//                         : ""}
//                     </p>
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       {/* <Nav /> */}
//     </div>
//   );
// };

// export default Notes;

"use client";
import Note from "../note/Note";
import { Plus } from "../../__atoms";
import Link from "next/link";
import useManageNotes from "../../../store/notes.store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useUtilities } from "@/app/store/utilities.store";
import GoBack from "../goBack/GoBack";
import SettingList from "../settingList/SettingList";
import { useTheme } from "next-themes";

const Notes = () => {
  const { accessToken } = useSignInStore();
  const {
    allNotes,
    getNoteById,
    noteById,
    getAllNotes,
    toggleCreateNote,
    getSearchedNotes,
  } = useManageNotes();

  const path = usePathname();
  const filteredNotes = getSearchedNotes();

  const {
    routeToTags,
    selectedTags,
    setIsArchivedPage,
    isTagsPage,
    searchValue,
    isSearchPage,
    setCurrentPath,
    isSettingsPage,
    isArchivedPage,
    setIsNotePage,
    setIsSettingsPage,
  } = useUtilities();
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsArchivedPage(path.includes("/archive"));
    setIsNotePage(path.includes("/note"));
  }, [path]);

  // console.log(noteById, "noteById");
  // console.log(path, "PATH");
  // console.log(isNotePage, "isNotePage");

  // useEffect(() => {
  //   if (path.includes("archive")) {
  //     setIsArchivedPage(true);
  //     if (!selectedTags) {
  //       setFilterAllByTag(false);
  //     }
  //   } else {
  //     setIsArchivedPage(false);
  //   }
  //   setIsTagsPage(path.includes("/tags"));
  //   if (path.includes("/tags")) {
  //     setFilterAllByTag(true);
  //     // setSelectedTag(selectedTags);
  //   } else if (
  //     !path.includes("tags") &&
  //     !path.includes("note") &&
  //     !path.includes("archive")
  //   ) {
  //     setFilterAllByTag(false);
  //     setSelectedTag(null);
  //   }
  // }, [
  //   path,
  //   setIsArchivedPage,
  //   setIsTagsPage,
  //   setSelectedTag,
  //   setFilterAllByTag,
  // ]);

  // useEffect(() => {
  //   getAllNotes();
  // }, []);

  useEffect(() => {
    setCurrentPath(path);
    setIsArchivedPage(path.includes("/archive"));
    setIsNotePage(path.includes("/note"));
    setIsSettingsPage(path.includes("/settings"));
    if (accessToken) {
      getAllNotes();
    }
  }, [path, accessToken]);

  const handleCreate = () => {
    toggleCreateNote();
  };

  // console.log(isSettingsPage, "isSettingsPage");

  const handleNoteClick = async (id: string) => {
    await getNoteById(id);
  };

  // const shouldRenderNotes =
  //   Array.isArray(allNotes) &&
  //   allNotes.length > 0 &&
  //   ((!searchValue && !isSearchPage && !isTagsPage) ||
  //     (searchValue && isSearchPage) ||
  //     isTagsPage ||
  //     selectedTags);

  const shouldRenderNotes =
    Array.isArray(allNotes) &&
    allNotes.length > 0 &&
    ((!isSearchPage && !isTagsPage) ||
      (isTagsPage && selectedTags) ||
      (isSearchPage && searchValue.trim().length > 0));

  if (!accessToken) return null;

  // console.log(routeToTags, "routeToTags");

  return (
    <>
      {!isSettingsPage ? (
        <div
          className={`${
            isSearchPage &&
            allNotes.length > 0 &&
            "min-h-[calc(100vh-99px)] md:min-h-[calc(100vh-119px)]"
          }  w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] pt-4 lg:pt-0  `}
        >
          {isTagsPage && selectedTags && <GoBack isTagsPage={isTagsPage} />}

          <div
            className={`${
              routeToTags && "hidden"
            }  px-8  lg:pl-8 md:pt-6 lg:pt-[20px] lg:pr-4 flex flex-col border-r border-l border-b
            
            ${
              theme === "dark"
                ? "border-r-[#52586699] border-l-[#52586699] border-b-[#52586699]"
                : "border-r-[#E0E4EA] border-l-[#E0E4EA] border-b-[#E0E4EA]"
            }
     rounded-t-xl overflow-hidden lg:rounded-t-[0px]  relative min-h-screen `}
          >
            <h1
              className={`${
                isTagsPage
                  ? // ? "text-sm font-medium text-[#717784] pt-2"
                    "text-sm font-medium text-muted dark:text-primary-dark pt-2"
                  : // : "font-bold text-[24px] text-[#0E121B]"
                    "font-bold text-[24px] text-primary-light"
              } ${isSearchPage && "hidden"} block  lg:hidden`}
            >
              {isArchivedPage
                ? "Archived Notes"
                : isTagsPage
                ? `Notes Tagged: ${selectedTags}`
                : "All Notes"}
            </h1>

            <div className="w-full flex-flex-col gap-4">
              <button
                onClick={handleCreate}
                // className="hidden   transition-transform duration-300 ease-in-out hover:scale-105 w-full bg-[#335CFF] rounded-lg text-white text-sm font-normal py-3 lg:flex items-center justify-center"
                className="hidden   transition-transform duration-300 ease-in-out hover:scale-105 w-full bg-[#335CFF] rounded-lg text-primary-light dark:text-primary-dark text-sm font-normal py-3 lg:flex items-center justify-center"
              >
                + Create New Note
              </button>

              <Link href={"/noteDetails"}>
                <button
                  // onClick={resetNewNote}
                  type="button"
                  className=" bg-green-600 text-primary-light dark:text-primary-dark text-sm font-normal  
        fixed right-8 bottom-[90px] h-[48px] w-[48px]
       md:h-[64px] md:w-[64px] rounded-full 
       items-center justify-center lg:hidden  "
                >
                  <div className="w-full flex items-center justify-center gap-1">
                    <Plus />
                    <span className="hidden lg:block lg:text-sm font-medium ">
                      +
                    </span>
                    <span className="hidden text-sm font-medium lg:block">
                      Create New Note
                    </span>
                  </div>
                </button>
              </Link>

              {/* pt-[154px] md:pt-[74px] lg:pt-[81px] */}

              <div
                className={`${
                  isSearchPage && "mt-[99px] md:mt-[119px]"
                } w-full flex flex-col md:pb-[114px] lg:pb-[37px]  lg:mt-4 `}
              >
                {shouldRenderNotes ? (
                  filteredNotes.map((note, i) => {
                    const isFirstNote = i === 0;
                    const isLastNote = i === allNotes.length - 1;
                    const isSelected = noteById?._id === note._id;
                    return (
                      <div
                        key={note._id}
                        className="w-full"
                        onClick={() => handleNoteClick(note._id)}
                      >
                        <Link
                          href={`${
                            isArchivedPage
                              ? `/archive/${note._id}`
                              : `/note/${note._id}`
                          }`}
                        >
                          <Note
                            title={note.title}
                            tags={note.tags}
                            _id={note._id}
                            content={note.content}
                            isArchived={note.isArchived}
                            lastEdited={note.lastEdited}
                            isFirstNote={isFirstNote}
                            isLastNote={isLastNote}
                            // selectedTags={selectedTags}
                            isSelected={isSelected}
                          />
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="w-full ">
                    {!isSearchPage ? (
                      <div className="w-full flex flex-col gap-4">
                        {/* <p className="text-sm font-medium text-[#0E121B]"> */}
                        <p className="text-sm font-medium text-primary-light dark:text-primary-dark">
                          {isArchivedPage
                            ? "All your archived notes are stored here. You can restore or delete them anytime."
                            : "You don’t have any notes yet. Start a new note to capture your thoughts and ideas."}
                        </p>
                        <p className="p-2 block rounded-xl bg-[#E0E4EA] text-sm">
                          {isArchivedPage
                            ? "No notes have been archived yet. Move notes here for safekeeping, or create a new note."
                            : ""}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SettingList />
      )}
    </>
  );
};

export default Notes;
