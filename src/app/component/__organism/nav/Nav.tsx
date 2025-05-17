// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Archives, Home, Search, Setting, Tag } from "../../__atoms";

// const Nav = () => {
//   const pathname = usePathname();

//   const navItems = [
//     { href: "/note", icon: <Home width="24px" height="24px" />, label: "Home" },
//     { href: "/search", icon: <Search width="24px" height="24px" />, label: "Search" },
//     { href: "/archive", icon: <Archives width="24px" height="24px" />, label: "Archives" },
//     { href: "/tags", icon: <Tag width="24px" height="24px" />, label: "Tag" },
//     { href: "/settings", icon: <Setting width="24px" height="24px" />, label: "Settings" },
//   ];

//   return (
//     <div
//       style={{ boxShadow: "0 -4px 6px 0 #E0E4EA" }}
//       className={` w-full h-[56px] md:h-[74px] lg:hidden px-8 py-3 grid grid-cols-5 border-t border-t-[#E0E4EA] shadow-t-lg`}
//     >
//       {navItems.map((item) => {
//         const isActive = pathname === item.href;
//         return (
//           <Link key={item.href} href={item.href} className="flex items-center justify-center px-[28px]">
//             <button
//               className={`flex flex-col items-center justify-center gap-1 rounded-sm px-[28px] py-1 ${
//                 isActive ? "bg-[#EBF1FF]" : "bg-transparent"
//               }`}
//             >
//               {item.icon}
//               <p className="text-[#525866] text-xs hidden md:block">{item.label}</p>
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
import { Archives, Home, Search, Setting, Tag } from "../../__atoms";

const Nav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/note", icon: <Home width="24px" height="24px" />, label: "Home" },
    {
      href: "/search",
      icon: <Search width="24px" height="24px" />,
      label: "Search",
    },
    {
      href: "/archive",
      icon: <Archives width="24px" height="24px" />,
      label: "Archives",
    },
    { href: "/tags", icon: <Tag width="24px" height="24px" />, label: "Tag" },
    {
      href: "/settings",
      icon: <Setting width="24px" height="24px" />,
      label: "Settings",
    },
  ];

  return (
    <div
      style={{ boxShadow: "0 -4px 6px 0 #E0E4EA" }}
      className={` w-full h-[56px] md:h-[74px] lg:hidden px-8 py-3 grid grid-cols-5 border-t border-t-[#E0E4EA] shadow-t- `}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-center "
          >
            <button
              className={`flex flex-col items-center justify-center gap-1 rounded-sm  py-1 flex-1
                 ${
                isActive ? "bg-[#EBF1FF]" : "bg-transparent"
              }`}

              // className={`flex flex-col items-center justify-center gap-1 rounded-sm  py-1 flex-1 bg-green-400
              //  `}
            >
              {item.icon}
              <p className="text-[#525866] text-xs hidden md:block">
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
