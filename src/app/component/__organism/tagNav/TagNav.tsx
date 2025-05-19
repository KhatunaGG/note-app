// "use client";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { Tag } from "../../__atoms";
// import useManageNotes from "@/app/store/notes.store";
// import { useUtilities } from "@/app/store/utilities.store";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { AnimateSpin } from "../../__molecules";

// const TagNav = () => {
//   const router = useRouter();
//   const path = usePathname();
//   const { accessToken, isLoading } = useSignInStore();
//   const { allNotes, setNoteById } = useManageNotes();

//   const {
//     getUniqueTags,
//     selectedTags,
//     setFilterAllByTag,
//     isTagsPage,
//     setIsTagsPage,
//     getFilteredNotesByTag,
//     isSettingsPage,
//   } = useUtilities();
//   const isArchivedPage = path.includes("archive");

//   const uniqTags = getUniqueTags(allNotes || []);

//   useEffect(() => {
//     setIsTagsPage(path.includes("/tags"));
//   }, [path]);

//   if (isLoading) {
//     return <AnimateSpin />;
//   }

//   if (!accessToken) return null;

//   return (
//     <section
//       className={`${
//         isTagsPage ? "gap-4" : "gap-2"
//       } w-full flex flex-col  border-t border-t-[#E0E4EA]  `}
//     >
//       <h2
//         className={`${
//           isTagsPage
//             ? "text-2xl font-bold text-[#0E121B] pt-[20px] md:pt-6"
//             : "text-sm font-medium text-[#717784] pt-2 md:pt-2"
//         } pl-[15px]`}
//       >
//         Tags
//       </h2>
//       {uniqTags.length > 0
//         ? uniqTags.map((uniqTag, i) => (
//             <div key={i} className="w-full">
//               <button
//                 // onClick={() => {
//                 //   setSelectedTag(uniqTag);

//                 //   if (isTagsPage) {
//                 //     setFilterAllByTag(true);
//                 //     router.push(`/tags/${uniqTag}`);
//                 //   }
//                 // }}

//                 onClick={() => {
//                   getFilteredNotesByTag(uniqTag.toLowerCase());
//                   setNoteById(null);
//                   // setCreateNote(false)
//                   if (path.includes("tags")) {
//                     setFilterAllByTag(true);
//                     router.push(`/tags/${uniqTag}`);
//                   }
//                 }}
//                 disabled={isSettingsPage}
//                 className={`${isTagsPage && "border-b border-b-[#E0E4EA] "} ${
//                   selectedTags === uniqTag.toLowerCase() && !isTagsPage
//                     ? "bg-[#F3F5F8]"
//                     : "bg-transparent"
//                 } w-full rounded-lg hover:bg-[#F3F5F8] pl-[15px] duration-300 easy-in-out text-[#0E121B] font-semibold text-sm  py-[11.5px] flex items-center justify-start gap-2`}
//               >
//                 <Tag width={"20px"} height={"20px"} />
//                 <p className="text-sm text-[#0E121B]">{uniqTag}</p>
//               </button>
//             </div>
//           ))
//         : null}
//     </section>
//   );
// };

// export default TagNav;


"use client";
import { useSignInStore } from "@/app/store/sign-in.store";
import { Tag } from "../../__atoms";
import useManageNotes from "@/app/store/notes.store";
import { useUtilities } from "@/app/store/utilities.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnimateSpin } from "../../__molecules";

const TagNav = () => {
  const router = useRouter();
  const path = usePathname();
  const { accessToken, isLoading } = useSignInStore();
  const { allNotes, setNoteById } = useManageNotes();

  const {
    getUniqueTags,
    selectedTags,
    setFilterAllByTag,
    isTagsPage,
    setIsTagsPage,
    getFilteredNotesByTag,
    isSettingsPage,
  } = useUtilities();
  const isArchivedPage = path.includes("archive");

  const uniqTags = getUniqueTags(allNotes || []);

  useEffect(() => {
    setIsTagsPage(path.includes("/tags"));
  }, [path]);

  if (isLoading) {
    return <AnimateSpin />;
  }

  if (!accessToken) return null;

  return (
    <section
      className={`${
        isTagsPage ? "gap-4" : "gap-2"
      } w-full flex flex-col border-t border-lines-light dark:border-lines-dark`}
    >
      <h2
        className={`${
          isTagsPage
            ? "text-2xl font-bold text-primary-light dark:text-primary-dark pt-[20px] md:pt-6"
            : "text-sm font-medium text-secondary-light dark:text-secondary-dark pt-2 md:pt-2"
        } pl-[15px]`}
      >
        Tags
      </h2>
      {uniqTags.length > 0
        ? uniqTags.map((uniqTag, i) => (
            <div key={i} className="w-full">
              <button
                onClick={() => {
                  getFilteredNotesByTag(uniqTag.toLowerCase());
                  setNoteById(null);
                  if (path.includes("tags")) {
                    setFilterAllByTag(true);
                    router.push(`/tags/${uniqTag}`);
                  }
                }}
                disabled={isSettingsPage}
                className={`${isTagsPage && "border-b border-lines-light dark:border-lines-dark"} ${
                  selectedTags === uniqTag.toLowerCase() && !isTagsPage
                    ? "bg-primary-light dark:bg-secondary-dark"
                    : "bg-transparent"
                } w-full rounded-lg hover:bg-primary-light dark:hover:bg-secondary-dark pl-[15px] duration-300 ease-in-out text-primary-light dark:text-primary-dark font-semibold text-sm py-[11.5px] flex items-center justify-start gap-2`}
              >
                <Tag width={"20px"} height={"20px"} />
                <p className="text-sm text-primary-light dark:text-primary-dark">{uniqTag}</p>
              </button>
            </div>
          ))
        : null}
    </section>
  );
};

export default TagNav;