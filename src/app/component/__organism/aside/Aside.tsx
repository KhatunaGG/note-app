"use client";
import { useSignInStore } from "@/app/store/sign-in.store";
import { ArchivesButton, DeleteButton } from "../../__molecules";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Aside = () => {
  const { accessToken } = useSignInStore();
  const path = usePathname();
  const isArchivedPage = path.includes("archive");
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!accessToken) return null;

  return (
    <div
      className={`  ${
        theme === "dark" ? "border-l-[#52586699]" : "border-l-[#E0E4EA]"
      }  w-full border-l pl-4 py-[20px] flex flex-col gap-3 `}
    >
      <ArchivesButton isArchivedPage={isArchivedPage} />
      <DeleteButton />
    </div>
  );
};

export default Aside;
