"use client";
import useManageNotes from "@/app/store/notes.store";
import { Archives, Delete } from "../../__atoms";
import { ArchivesButton, DeleteButton, ResetButton } from "../../__molecules";
import { useArchivedNotes } from "@/app/store/archives.store";
import { usePathname } from "next/navigation";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const Overlay = () => {
  const path = usePathname();
  const isOverlay = path === "/overlay";
  const { modal } = useManageNotes();
  const { archiveModal } = useArchivedNotes();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  return (
    <>
      {modal || archiveModal ? (
        <section className="w-full min-h-screen bg-black/40 fixed inset-0 z-50 flex items-center justify-center">
          <div
            className={`${
              isDark ? "bg-[#23252B]" : "bg-white"
            }   rounded-lg shadow-lg w-[72.21%] md:w-[57.29%] lg:w-[30.55%]`}
          >
            <div
              className={`${
                isDark ? "border-b-[#363a42]" : "border-b-[#E0E4EA]"
              } p-5 border-b border-b-lines-light  flex items-start justify-between gap-4`}
            >
              <div
                className={`${
                  isDark ? "bg-[#2A2D34]" : "bg-[#F3F5F8]"
                } w-10 h-10 rounded-lg  flex items-center justify-center`}
              >
                {archiveModal ? (
                  <Archives width="24px" height="25px" />
                ) : (
                  <Delete width="24px" height="25px" />
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <h2 className="text-base font-semibold text-primary-light dark:text-primary-dark">
                  {archiveModal ? "Archive Note" : "Delete Note"}
                </h2>
                <div className="text-xs md:text-sm text-secondary-light dark:text-secondary-dark font-normal">
                  {archiveModal
                    ? "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
                    : "Are you sure you want to permanently delete this note? This action cannot be undone."}
                </div>
              </div>
            </div>
            <div className="w-full py-4 px-5 flex items-center justify-end gap-4">
              <ResetButton isOverlay={true} />
              {archiveModal ? (
                <ArchivesButton isOverlay={true} />
              ) : (
                <DeleteButton isOverlay={true} />
              )}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Overlay;
