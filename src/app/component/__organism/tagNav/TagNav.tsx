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
  const { allNotes, getAllNotes } = useManageNotes();
  const { getUniqueTags, routeToTags } = useUtilities();
  const isArchivedPage = path.includes("archive");

  const notesToUse = isArchivedPage
    ? allNotes.filter((note) => note.isArchived)
    : allNotes.filter((note) => !note.isArchived);
  const uniqTags = getUniqueTags(notesToUse);

  useEffect(() => {
    if (accessToken) {
      getAllNotes();
    }
  }, [accessToken, router]);

  if (isLoading) {
    return <AnimateSpin />;
  }

  if (!accessToken) return null;
  return (
    <section
      className={`${
        routeToTags ? "gap-4" : "gap-2"
      } w-full flex-col  border-t border-t-[#E0E4EA] px-[15px]`}
    >
      <h2
        className={`${
          routeToTags
            ? "text-2xl font-bold text-[#0E121B] pt-[20px] md:pt-6"
            : "text-sm font-medium text-[#717784] pt-2 md:pt-2"
        }`}
      >
        Tags
      </h2>
      {uniqTags.length > 0
        ? uniqTags.map((uniqTag, i) => (
            <div key={i} className="w-full ">
              <button
                className={`${
                  routeToTags && "border-b border-b-[#E0E4EA]"
                } w-full rounded-lg hover:bg-[#F3F5F8] duration-300 easy-in-out text-[#0E121B] font-semibold text-sm  py-[11.5px] flex items-center justify-start gap-2`}
              >
                <Tag width={"20px"} height={"20px"} />
                <p className="text-sm text-[#0E121B]">{uniqTag}</p>
              </button>
            </div>
          ))
        : null}
    </section>
  );
};

export default TagNav;
