"use client";
import { useEffect } from "react";
import { Logo, Setting } from "../../__atoms";
import Search from "../../__atoms/search/Search";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useUtilities } from "@/app/store/utilities.store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSettingsStore } from "@/app/store/settings.store";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const Header = ({ activeSetting }: { activeSetting?: string }) => {
  const { accessToken } = useSignInStore();
  const {
    selectedTags,
    setSearchValue,
    searchValue,
    capitalize,
    setIsSearchPage,
    isSearchPage,
    setIsSettingsPage,
    isSettingsPage,
    setSelectedTag,
    isTagsPage,
    setIsTagsPage,
  } = useUtilities();
  const path = usePathname();
  const { setActiveSetting } = useSettingsStore();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";
  const isArchivedPage = path.includes("archive");

  useEffect(() => {
    setIsSearchPage(path.includes("/search"));
    setIsSettingsPage(path.includes("/settings"));
    setIsTagsPage(path.includes("/tags"));
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
        !isSearchPage || activeSetting
          ? isDark
            ? "bg-[#232530CC] lg:bg-transparent"
            : "bg-[#F3F5F81A] lg:bg-transparent"
          : isDark
          ? "bg-[#232530CC] relative lg:bg-transparent"
          : "bg-[#F3F5F81A] relative lg:bg-transparent"
      }
${
  isTagsPage
    ? isDark
      ? "#232530CC absolute"
      : "bg-[#F3F5F8] lg:bg-transparent absolute"
    : "bg-[#F3F5F8] absolute pt-54px md:pt-0"
}
      ${
        isDark
          ? "lg:border-b-[#52586699] lg:border-l-[#52586699]"
          : "lg:border-b-[#E0E4EA] lg:border-l-[#E0E4EA]"
      }
      h-[54px] md:h-[74px] lg:h-[81px] lg:px-[2.78%] px-8 w-full flex items-center justify-between lg:border-b lg:border-l ${
        isSearchPage ? "flex-col gap-[20px] md:gap-6" : "flex-row lg:gap-0 "
      }`}
    >
      <div className={` w-full flex lg:flex-1`}>
        <h1
          className={`${
            isSearchPage ? "hidden lg:block" : "hidden lg:block"
          }  font-bold text-[24px] text-primary-light dark:text-primary-dark `}
        >
          {isArchivedPage
            ? "Archived Notes"
            : selectedTags
            ? `Notes Tagged: ${capitalize(selectedTags)}`
            : searchValue
            ? `Showing results for: ${capitalize(searchValue)}`
            : isSettingsPage
            ? "Settings"
            : "All Notes"}
        </h1>
        <div
          className={`${
            isSearchPage || !isTagsPage
              ? isDark
                ? "#232530CC"
                : "bg-[#F3F5F8] lg:bg-transparent"
              : "bg-[#F3F5F8]"
          }
             py-[13px] absolute inset-0 px-4 md:px-8
          }  w-full h-full flex items-center justify-start lg:hidden`}
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
          className={`${isSearchPage && "flex-col"} w-full flex  items-center `}
        >
          {isSearchPage && (
            <h2 className="w-full text-left font-bold text-[24px] text-primary-light dark:text-primary-dark pt-6">
              Search
            </h2>
          )}

          <div className={`${isSearchPage && "w-full"} w-[83.78%] relative`}>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              readOnly={isSettingsPage}
              placeholder="Search by title, content, or tags…"
              className={`
                ${theme === "dark" ? "border-[#52586699]" : "border-[#E0E4EA]"}
                py-3 border rounded-lg  w-full outline-none pl-10 pr-2 text-[#717784] text-sm font-normal`}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[20px] h-[21px] ">
              <Search width={"20px"} height={"21px"} />
            </div>
          </div>

          <Link href={"/settings"} className="w-[11.73%] ">
            <div
              onClick={() => {
                setActiveSetting(null);
                setSelectedTag(null);
              }}
              className={`${
                isSearchPage && "hidden"
              } flex items-center justify-center w-full`}
            >
              <Setting width={"24px"} height={"24px"} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
