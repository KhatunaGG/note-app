"use client";
import { useSignInStore } from "@/app/store/sign-in.store";
import { ArchivesButton, DeleteButton } from "../../__molecules";
import { usePathname } from "next/navigation";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

const Aside = () => {
  const { accessToken } = useSignInStore();
  const path = usePathname();
  const isArchivedPage = path.includes("archive");
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

  if (!accessToken) return null;

  return (
    <div
      className={`  ${
        isDark ? "border-l-[#52586699]" : "border-l-[#E0E4EA]"
      }  w-full border-l pl-4 py-[20px] flex flex-col gap-3 `}
    >
      <ArchivesButton isArchivedPage={isArchivedPage} />
      <DeleteButton />
    </div>
  );
};

export default Aside;
