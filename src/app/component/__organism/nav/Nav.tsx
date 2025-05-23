// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Archives, Home, Search, Setting, Tag } from "../../__atoms";
// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";
// import React from "react";

// const Nav = () => {
//   const pathname = usePathname();
//   // const { theme, systemTheme } = useTheme();
//   // const [mounted, setMounted] = useState(false);

//   // useEffect(() => {
//   //   setMounted(true);
//   // }, []);

//   const navItems = [
//     { href: "/note", icon: <Home width="24px" height="24px" />, label: "Home" },
//     {
//       href: "/search",
//       icon: <Search width="24px" height="24px" />,
//       label: "Search",
//     },
//     {
//       href: "/archive",
//       icon: <Archives width="24px" height="24px" />,
//       label: "Archives",
//     },
//     { href: "/tags", icon: <Tag width="24px" height="24px" />, label: "Tag" },
//     {
//       href: "/settings",
//       icon: <Setting width="24px" height="24px" />,
//       label: "Settings",
//     },
//   ];

//   return (
//     <div
//       style={{ boxShadow: "0 -4px 6px 0 #E0E4EA" }}
//       className={` w-full h-[56px] md:h-[74px] lg:hidden px-8 py-3 grid grid-cols-5 border-t border-t-[#E0E4EA] shadow-t- `}
//     >
//       {navItems.map((item) => {
//         const isActive = pathname === item.href;
//           const IconWithActive = React.cloneElement(item.icon, { isActive });
//         return (
//           <Link
//             key={item.href}
//             href={item.href}
//             className="flex items-center justify-center "
//           >
//             <button
//               className={`flex flex-col items-center justify-center gap-1 rounded-sm  py-1 flex-1

//                  ${
//                    isActive ? "bg-[#EBF1FF]" : "bg-transparent"
//                    isActive
//                      ? theme === "dark"
//                        ? "bg-[#52586699]"
//                        : "bg-[#EBF1FF]"
//                      : "bg-transparent"
//                  }
//                  `}
//             >
//               {item.icon}
//               <p className="text-[#525866] text-xs hidden md:block">
//               {/* <p
//                 className={`${
//                   isActive
//                     ? theme === "dark"
//                       ? "text-[#335CFF]"
//                       : "bg-[#525866]"
//                     : ""
//                 } text-xs hidden md:block`}> */}

//                 {item.label}
//               </p>
//             </button>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default Nav;

// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import * as Icons from "../../__atoms";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { navItems } from "@/app/data/data";
// import { useMountedTheme } from "@/app/hooks/useMountedTheme";

// const Icon = ({
//   name,
//   isActive,
// }: {
//   name: keyof typeof Icons;
//   isActive: boolean;
// }) => {
//   const Component = Icons[name];
//   return Component ? (
//     <Component width="24px" height="24px" isActive={isActive} />
//   ) : null;
// };

// const Nav = () => {
//   const pathname = usePathname();
//   const { mounted, theme } = useMountedTheme();
//   // const { theme, systemTheme } = useTheme();
//   // const [mounted, setMounted] = useState(false);

//   // useEffect(() => {
//   //   setMounted(true);
//   // }, []);

//     const dynamicStyle = !mounted
//     ? ''
//     : theme === 'dark'
//       ? 'text-white'
//       : 'text-black';

//   return (
//     <div
//       style={{
//         boxShadow:
//           theme === "dark"
//             ? "0 -4px 6px 0 rgba(82, 88, 102, 0.3)"
//             : "0 -4px 6px 0 #E0E4EA",
//       }}
//       className={`w-full h-[56px] md:h-[74px] lg:hidden px-8 py-3 grid grid-cols-5 border-t ${
//         theme === "dark" ? "border-t-[#52586699]" : "border-t-[#E0E4EA"
//       }]`}
//     >
//       {navItems.map((item) => {
//         const isActive = pathname === item.href;
//         return (
//           <Link
//             key={item.href}
//             href={item.href}
//             className="flex items-center justify-center"
//           >
//             <button
//               className={`flex flex-col items-center justify-center gap-1 rounded-sm py-1 flex-1 ${
//                 isActive
//                   ? theme === "dark"
//                     ? "bg-[#52586699]"
//                     : "bg-[#EBF1FF]"
//                   : "bg-transparent"
//               }`}
//             >
//               <Icon name={item.iconName} isActive={isActive} />
//               <p
//                 //  className="text-[#525866] text-xs hidden md:block"
//                 className={`${
//                   isActive
//                     ? theme === "dark"
//                       ? "text-[#335CFF]"
//                       : "bg-[#525866]"
//                     : ""
//                 } text-xs hidden md:block`}
//               >
//                 {item.label}
//               </p>
//             </button>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default Nav;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "../../__atoms";
import { navItems } from "@/app/data/data";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

// Icon component: renders the icon based on name and active state
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

const Nav = () => {
  const pathname = usePathname();
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";

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
