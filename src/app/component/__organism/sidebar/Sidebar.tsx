// "use client";
// import { usePathname } from "next/navigation";
// import { Archives, Home, Logo} from "../../__atoms";
// import Link from "next/link";
// import { useUtilities } from "@/app/store/utilities.store";
// import { useEffect } from "react";
// import TagNav from "../tagNav/TagNav";
// import useManageNotes from "@/app/store/notes.store";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { AnimateSpin } from "../../__molecules";

// const Sidebar = () => {
//   const path = usePathname();
//   const { accessToken, isLoading} = useSignInStore();
//   const {
//     activeLink,
//     setSelectedTag,
//     setCurrentPath,
//     handleRoutes,
//   } = useUtilities();
//   const { setNoteById, getAllNotes } = useManageNotes();

//   // useEffect(() => {
//   //   setCurrentPath(path);
//   //   handleRoutes();
//   //   if (accessToken) {
//   //     getAllNotes();
//   //   } else {
//   //     console.log("No accessToken available, skipping note fetch");
//   //   }
//   //   setNoteById(null);
//   // }, [path, accessToken]);

//     useEffect(() => {
//     setCurrentPath(path);
//     handleRoutes();
//     setNoteById(null);
//   }, [path]);

//   useEffect(() => {
//     if (!isLoading && accessToken) {
//       getAllNotes();
//     }
//   }, [accessToken, isLoading]);

// if(isLoading) {
//   return <AnimateSpin />
// }

//   if (!accessToken) return null;

//   return (
//     <div className="hidden w-full min-h-screen py-3 px-4 lg:flex flex-col gap-4">
//       <div className="w-full py-4">
//         <Logo />
//       </div>

//       <div className=" flex flex-col gap-2">
//         <div className="flex flex-col      ">
//           <Link href="/note">
//             <button
//               onClick={() => {
//                 getAllNotes();
//                 setSelectedTag(null);
//               }}
//               // onClick={() => {
//               //   if (isNotePage) {
//               //     getAllNotes();
//               //   }
//               // }}
//               className={`${activeLink(
//                 "/note"
//               )} w-full rounded-lg duration-300 ease-in-out text-[#0E121B] font-semibold text-sm px-[15px] py-[11.5px] flex items-center justify-start gap-2`}
//             >
//               <Home width="20px" height="20px" />
//               <p className="text-sm text-[#0E121B]">All Notes</p>
//             </button>
//           </Link>

//           <Link href={"/archive"}>
//             <button
//               onClick={() => {
//                 getAllNotes();
//                 setSelectedTag(null);
//               }}
//               // onClick={() => {
//               //   if (isArchivedPage) {
//               //     getAllNotesIsArchived();
//               //   }
//               // }}
//               className={`${activeLink(
//                 "/archive"
//               )} w-full rounded-lg hover:bg-[#f8f3f7] duration-300 easy-in-out text-[#0E121B] font-semibold text-sm px-[15px] py-[11.5px] flex items-center justify-start gap-2`}
//             >
//               <Archives width={"20px"} height={"20px"} />
//               <p className="text-sm text-[#0E121B]">Archived Notes</p>
//             </button>
//           </Link>
//         </div>
//         <TagNav />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;






"use client";
import { usePathname } from "next/navigation";
import { Archives, Home, Logo} from "../../__atoms";
import Link from "next/link";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect } from "react";
import TagNav from "../tagNav/TagNav";
import useManageNotes from "@/app/store/notes.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import { AnimateSpin } from "../../__molecules";

const Sidebar = () => {
  const path = usePathname();
  const { accessToken, isLoading} = useSignInStore();
  const {
    activeLink,
    setSelectedTag,
    setCurrentPath,
    handleRoutes,
  } = useUtilities();
  const { setNoteById, getAllNotes } = useManageNotes();

  useEffect(() => {
    setCurrentPath(path);
    handleRoutes();
    setNoteById(null);
  }, [path]);

  useEffect(() => {
    if (!isLoading && accessToken) {
      getAllNotes();
    }
  }, [accessToken, isLoading]);

  if(isLoading) {
    return <AnimateSpin />
  }

  if (!accessToken) return null;

  return (
    <div className="hidden w-full min-h-screen py-3 px-4 lg:flex flex-col gap-4 bg-primary-light dark:bg-primary-dark                sidebar-border">
      <div className="w-full py-4">
        <Logo />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <Link href="/note">
            <button
              onClick={() => {
                getAllNotes();
                setSelectedTag(null);
              }}
              className={`${activeLink(
                "/note"
              )} w-full rounded-lg duration-300 ease-in-out text-primary-light dark:text-primary-dark font-semibold text-sm px-[15px] py-[11.5px] flex items-center justify-start gap-2`}
            >
              <Home width="20px" height="20px" />
              <p className="text-sm text-primary-light dark:text-primary-dark">All Notes</p>
            </button>
          </Link>

          <Link href={"/archive"}>
            <button
              onClick={() => {
                getAllNotes();
                setSelectedTag(null);
              }}
              className={`${activeLink(
                "/archive"
              )} w-full rounded-lg hover:bg-secondary-light dark:hover:bg-secondary-dark duration-300 ease-in-out text-primary-light dark:text-primary-dark font-semibold text-sm px-[15px] py-[11.5px] flex items-center justify-start gap-2`}
            >
              <Archives width={"20px"} height={"20px"} />
              <p className="text-sm text-primary-light dark:text-primary-dark">Archived Notes</p>
            </button>
          </Link>
        </div>
        <TagNav />
      </div>
    </div>
  );
};

export default Sidebar;