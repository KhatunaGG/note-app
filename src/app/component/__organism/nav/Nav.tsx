"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "../../__atoms";
import { navItems } from "@/app/data/data";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { useUtilities } from "@/app/store/utilities.store";
import { NavPropsTypes } from "@/app/interface";

const Icon = ({
  name,
  isActive,
}: {
  name: keyof typeof Icons;
  isActive: boolean;
}) => {
  const Component = Icons[name];
  return Component ? (
    <Component width="24px" height="24px" isActive={isActive} />
  ) : null;
};

const Nav = ({ noteParam }: NavPropsTypes) => {
  const pathname = usePathname();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";
  const { setSelectedTag, setFilterAllByTag } = useUtilities();
  const shadowStyle = isDark
    ? "0 -4px 6px 0 rgba(82, 88, 102, 0.3)"
    : "0 -4px 6px 0 #E0E4EA";
  const borderColor = isDark ? "border-t-[#52586699]" : "border-t-[#E0E4EA]";

  return (
    <div
      style={{ boxShadow: shadowStyle }}
      className={`w-full h-[56px] md:h-[74px] lg:hidden px-8 py-3 grid grid-cols-5 border-t ${borderColor}`}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        const buttonBgClass = isActive
          ? isDark
            ? "bg-[#52586699]"
            : "bg-[#EBF1FF]"
          : "bg-transparent";

        const labelTextClass = isActive
          ? isDark
            ? "text-[#335CFF]"
            : "text-[#525866]"
          : "text-[#99A0AE]";

        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-center"
          >
            <button
              onClick={() => {
                setSelectedTag(null);
                setFilterAllByTag(false);
              }}
              className={`flex flex-col items-center justify-center gap-1 rounded-sm py-1 flex-1 ${buttonBgClass}`}
            >
              <Icon name={item.iconName} isActive={isActive} />
              <p className={`${labelTextClass} text-xs hidden md:block`}>
                {item.label}
              </p>
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default Nav;
