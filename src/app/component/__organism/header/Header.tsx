// "use client";
// import { useEffect } from "react";
// import { Logo, Setting } from "../../__atoms";
// import Search from "../../__atoms/search/Search";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { useUtilities } from "@/app/store/utilities.store";
// import { usePathname } from "next/navigation";

// const Header = () => {
//   const { accessToken } = useSignInStore();
//   const { selectedTags, setSearchValue, searchValue, capitalize, setIsSearchPage } =
//     useUtilities();
//   const path = usePathname();
//   const isArchivedPage = path.includes("archive");

//   useEffect(() => {
//     setIsSearchPage(path.includes("/search"));
//   }, [path]);

//   useEffect(() => {
//     (async () => {
//       await useSignInStore.getState().initialize();
//     })();
//   }, []);

//   if (!accessToken) return null;

//   return (
//     <div className="bg-[#F3F5F8] lg:bg-white px-8 w-full h-[54px] md:h-[74px] lg:h-[81px]  flex items-center justify-between lg:px-[2.78%]  lg:border-b lg:border-l lg:border-[#E0E4EA]">
//       <h1 className="font-bold text-[24px] text-[#0E121B] hidden lg:block">
//         {isArchivedPage
//           ? "Archived Notes"
//           : selectedTags
//           ? `Notes Tagged: ${selectedTags}`
//           : searchValue
//           ? `Showing results for: ${capitalize(searchValue)}`
//           : "All Notes"}
//       </h1>
//       <div className="w-full h-full flex items-center justify-start lg:hidden">
//         <Logo />
//       </div>
//       <div className="w-[30.68%] hidden lg:flex">
//         <div className="w-full flex items-center gap-4">
//           <div className=" w-[83.78%] relative">
//             <input
//               onChange={(e) => setSearchValue(e.target.value)}
//               type="text"
//               placeholder="Search by title, content, or tags…"
//               className="py-3 border border-[#CACFD8] rounded-lg  w-full outline-none pl-10 pr-2 text-[#717784] text-sm font-normal"
//             />
//             <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[20px] h-[21px] ">
//               <Search width={"20px"} height={"21px"} />
//             </div>
//           </div>
//           <div className="w-[11.73%] flex items-center justify-center">
//             <Setting width={"24px"} height={"24px"} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

"use client";
import { useEffect } from "react";
import { Logo, Setting } from "../../__atoms";
import Search from "../../__atoms/search/Search";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useUtilities } from "@/app/store/utilities.store";
import { usePathname } from "next/navigation";

const Header = () => {
  const { accessToken } = useSignInStore();
  const {
    selectedTags,
    setSearchValue,
    searchValue,
    capitalize,
    setIsSearchPage,
    isSearchPage,
  } = useUtilities();
  const path = usePathname();
  const isArchivedPage = path.includes("archive");

  useEffect(() => {
    setIsSearchPage(path.includes("/search"));
  }, [path]);

  useEffect(() => {
    (async () => {
      await useSignInStore.getState().initialize();
    })();
  }, []);

  if (!accessToken) return null;

  return (
    <div
      className={`${
        !isSearchPage
          ? "bg-[#F3F5F8] lg:bg-white  w-full"
          : "bg-transparent relative"
      } h-[54px] md:h-[74px] lg:h-[81px] lg:px-[2.78%]  px-8 w-full  flex items-center justify-between  lg:border-b lg:border-l lg:border-[#E0E4EA]  ${
        isSearchPage ? "flex-col gap-[20px] md:gap-6  " : "flex-row lg:gap-0 "
      }`}
    >
      <div className={` w-full flex lg:flex-1`}>
        <h1
          className={`${
            isSearchPage ? "hidden lg:block" : "hidden lg:block"
          }  font-bold text-[24px] text-[#0E121B] `}
        >
          {isArchivedPage
            ? "Archived Notes"
            : selectedTags
            ? `Notes Tagged: ${selectedTags}`
            : searchValue
            ? `Showing results for: ${capitalize(searchValue)}`
            : "All Notes"}
        </h1>
        <div
          className={`${
            isSearchPage &&
            "bg-[#F3F5F8] py-[13px] absolute inset-0 px-4 md:px-8"
          } w-full h-full flex items-center justify-start lg:hidden`}
        >
          <Logo />
        </div>
      </div>

      <div
        className={`${
          !isSearchPage
            ? "hidden lg:flex flex-row lg:w-[30.68%] "
            : "flex w-full flex-col gap-4 absolute z-10 top-[54px] md-[74px] px-4 md:px-8 mt-6 md:mt-[20px]"
        } `}
      >
        <div
          className={`${
            isSearchPage && "flex-col"
          } w-full flex  items-center `}
        >
          {isSearchPage && (
            <h2 className="w-full text-left font-bold text-[24px] text-[#0E121B] ">
              Search
            </h2>
          )}

          <div className={`${isSearchPage && "w-full"} w-[83.78%] relative`}>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search by title, content, or tags…"
              className="py-3 border border-[#CACFD8] rounded-lg  w-full outline-none pl-10 pr-2 text-[#717784] text-sm font-normal"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[20px] h-[21px] ">
              <Search width={"20px"} height={"21px"} />
            </div>
          </div>

          <div
            className={`${
              isSearchPage && "hidden"
            } w-[11.73%] flex items-center justify-center`}
          >
            <Setting width={"24px"} height={"24px"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
