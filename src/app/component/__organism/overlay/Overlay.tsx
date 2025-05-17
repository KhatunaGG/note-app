"use client";
import useManageNotes from "@/app/store/notes.store";
import { Archives, Delete } from "../../__atoms";
import { ArchivesButton, DeleteButton, ResetButton } from "../../__molecules";
import { useArchivedNotes } from "@/app/store/archives.store";
import { usePathname } from "next/navigation";

const Overlay = () => {
  const path = usePathname();
  const isOverlay = path === "/overlay";
  const { modal } = useManageNotes();
  const { archiveModal } = useArchivedNotes();

  return (
    <>
      {modal || archiveModal ? (
        <section className="w-full min-h-screen bg-black/40 fixed inset-0 z-20 flex items-center justify-center">
          <div className=" bg-white  rounded-lg shadow-lg w-[72.21%] md:w-[57.29%] lg:w-[30.55%]">
            <div className="p-[20px] border-b border-b-[#E0E4EA] flex items-start justify-between gap-4">
              {archiveModal ? (
                <div className="w-10 h-10 rounded-lg bg-[#F3F5F8] flex items-center justify-center">
                  <Archives width="24px" height={"25px"} />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-[#F3F5F8] flex items-center justify-center">
                  <Delete width={"24px"} height={"25px"} />
                </div>
              )}
              <div className="flex flex-col gap-[6px] flex-1">
                <h2 className="text-base font-semibold text-[#0E121B]">
                  {archiveModal ? "Archive Note" : "Delete Note"}
                </h2>
                <div className="text-xs md:text-sm text-[#2B303B] font-normal">
                  {archiveModal
                    ? "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
                    : "Are you sure you want to permanently delete this note? This action cannot be undone."}
                </div>
              </div>
            </div>
            <div className="w-full py-4 px-[20px] flex items-center justify-end gap-4">
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