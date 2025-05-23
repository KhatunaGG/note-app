"use client";
import { usePathname } from "next/navigation";
import { Archives, ArrowRight, Home, Logo } from "../../__atoms";
import Link from "next/link";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect } from "react";
import TagNav from "../tagNav/TagNav";
import useManageNotes from "@/app/store/notes.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import { AnimateSpin } from "../../__molecules";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const Sidebar = () => {
  const path = usePathname();
  const { accessToken, isLoading } = useSignInStore();
  const { activeLink, setSelectedTag, setCurrentPath, handleRoutes } =
    useUtilities();
  const { setNoteById, getAllNotes } = useManageNotes();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

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

  if (isLoading) {
    return <AnimateSpin />;
  }

  if (!accessToken) return null;

  return (
    <div
      className={`${
        theme === "dark" ? "border-t-[#52586699]" : "border-t-[#E0E4EA]"
      } hidden w-full min-h-screen py-3 px-4 lg:flex flex-col gap-4 bg-primary-light dark:bg-primary-dark `}
    >
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
              className={`${activeLink("/note")} w-full ${
                path === "/note"
                  ? isDark
                    ? "bg-[#52586699]"
                    : "bg-[#F3F5F8]"
                  : ""
              } rounded-lg  `}
            >
              <div className="w-full flex items-center justify-between duration-300 ease-in-out text-primary-light dark:text-primary-dark font-semibold text-sm px-[15px] py-[11.5px]">
                <div className="flex items-center justify-start gap-2">
                  <Home width="20px" height="20px" />
                  <p className="text-sm text-primary-light dark:text-primary-dark">
                    All Notes
                  </p>
                </div>
                {activeLink("/note") !== "" && (
                  <ArrowRight isActive={path === "/note"} />
                )}
              </div>
            </button>
          </Link>

          <Link href={"/archive"}>
            <button
              onClick={() => {
                getAllNotes();
                setSelectedTag(null);
              }}
              className={`${activeLink("/archive")} w-full ${
                path === "/archive"
                  ? isDark
                    ? "bg-[#52586699]"
                    : "bg-[#F3F5F8]"
                  : ""
              } rounded-lg  `}
            >
              <div className="w-full flex items-center justify-between duration-300 ease-in-out text-primary-light dark:text-primary-dark font-semibold text-sm px-[15px] py-[11.5px]">
                <div className="flex items-center justify-start gap-2">
                  <Archives width={"20px"} height={"20px"} />
                  <p className="text-sm text-primary-light dark:text-primary-dark">
                    Archived Notes
                  </p>
                </div>
                {activeLink("/archive") !== "" && (
                  <ArrowRight isActive={path === "/archive"} />
                )}
              </div>
            </button>
          </Link>
        </div>
        <TagNav />
      </div>
    </div>
  );
};

export default Sidebar;
