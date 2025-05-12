
"use client";
import { usePathname } from "next/navigation";
import { Archives, Home, Logo, Tag } from "../../__atoms";
import Link from "next/link";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect } from "react";
import TagNav from "../tagNav/TagNav";
import useManageNotes from "@/app/store/notes.store";

const Sidebar = () => {
  const pathname = usePathname();

  // const { setCurrentPath, activeLink } = useUtilities();
  
  // useEffect(() => {
  //     setCurrentPath(pathname);
  //   }, [pathname]);
    
    const { setCurrentPath, activeLink, setSelectedTag } = useUtilities();
    const { setNoteById} = useManageNotes()
    useEffect(() => {
      setCurrentPath(pathname);
      setSelectedTag(null);
    }, [pathname]);






  return (
    <div className="hidden w-full min-h-screen py-3 px-4 lg:flex flex-col gap-4 bg-white">
      <div className="w-full py-4">
        <Logo />
      </div>

      <div className=" flex flex-col gap-2">
        <div className="flex flex-col      ">
          <Link href="/note">
            <button

            //  onClick={() => setSelectedTag(null)}
             onClick={() => {
              setSelectedTag(null)
               setNoteById(null)
             }}

              className={`${activeLink(
                "/note"
              )} w-full rounded-lg duration-300 ease-in-out text-[#0E121B] font-semibold text-sm px-[15px] py-[11.5px] flex items-center justify-start gap-2`}
            >
              <Home width="20px" height="20px" />
              <p className="text-sm text-[#0E121B]">All Notes</p>
            </button>
          </Link>

          <Link href={"/archive"}>
            <button

            //  onClick={() => setSelectedTag(null)}
             onClick={() => {
              setSelectedTag(null)
              setNoteById(null)
             }}

              className={`${activeLink(
                "/archive"
              )} w-full rounded-lg hover:bg-[#f8f3f7] duration-300 easy-in-out text-[#0E121B] font-semibold text-sm px-[15px] py-[11.5px] flex items-center justify-start gap-2`}
            >
              <Archives width={"20px"} height={"20px"} />
              <p className="text-sm text-[#0E121B]">Archived Notes</p>
            </button>
          </Link>
        </div>
        <TagNav />
      </div>
    </div>
  );
};

export default Sidebar;