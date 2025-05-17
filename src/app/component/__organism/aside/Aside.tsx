"use client";
import { useSignInStore } from "@/app/store/sign-in.store";
import { ArchivesButton, DeleteButton } from "../../__molecules";
import { usePathname } from "next/navigation";

const Aside = () => {
  const { accessToken } = useSignInStore();
  const path = usePathname();
  const isArchivedPage = path.includes("archive");

  if (!accessToken) return null;

  return (
    <div className="w-full  pl-4 py-[20px] flex flex-col gap-3">
      <ArchivesButton isArchivedPage={isArchivedPage} />
      <DeleteButton />
    </div>
  );
};

export default Aside;