"use client";
import { useSignInStore } from "@/app/store/sign-in.store";
import { Tag } from "../../__atoms";
import useManageNotes from "@/app/store/notes.store";
import { useUtilities } from "@/app/store/utilities.store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnimateSpin } from "../../__molecules";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const TagNav = () => {
  const router = useRouter();
  const path = usePathname();
  const { accessToken, isLoading } = useSignInStore();
  const { allNotes, setNoteById, getAllNotes, setCreateNote } =
    useManageNotes();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  const {
    getUniqueTags,
    selectedTags,
    setFilterAllByTag,
    isTagsPage,
    setIsTagsPage,
    getFilteredNotesByTag,
    isSettingsPage,
  } = useUtilities();

  useEffect(() => {
    const run = async () => {
      const isTags = path.includes("/tags");
      setIsTagsPage(isTags);
      if (isTags) {
        await getAllNotes();
      }
    };

    run();
  }, [path]);
  const uniqTags = getUniqueTags(allNotes || []);

  if (isLoading) {
    return <AnimateSpin />;
  }

  if (!accessToken) return null;

  return (
    <section
      className={`${
        isTagsPage ? "gap-4 md:px-8" : "gap-2 px-0"
      } w-full flex flex-col border-t ${
        isDark ? "border-t-[#52586699]" : "border-t-[#E0E4EA]"
      }  `}
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
                  setCreateNote(false);
                  if (path.includes("tags")) {
                    setFilterAllByTag(true);
                    router.push(`/tags/${uniqTag}`);
                  }
                }}
                disabled={isSettingsPage}
                className={`${
                  theme === "dark"
                    ? isTagsPage
                      ? "border-b border-b-[#52586699]"
                      : ""
                    : isTagsPage
                    ? "border-b border-b-[#E0E4EA]"
                    : ""
                } ${
                  selectedTags === uniqTag.toLowerCase() && !isTagsPage
                    ? "bg-primary-light dark:bg-secondary-dark"
                    : "bg-transparent"
                } w-full rounded-lg hover:bg-primary-light dark:hover:bg-secondary-dark pl-[15px] duration-300 ease-in-out text-primary-light dark:text-primary-dark font-semibold text-sm py-[11.5px] flex items-center justify-start gap-2`}
              >
                <Tag width={"20px"} height={"20px"} />
                <p className="text-sm text-primary-light dark:text-primary-dark font-normal">
                  {uniqTag}
                </p>
              </button>
            </div>
          ))
        : null}
    </section>
  );
};

export default TagNav;
