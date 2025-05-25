// "use client";
// import { settingsData } from "@/app/data/data";
// import { ArrowRight } from "../../__atoms";
// import * as Icons from "../../__atoms";
// import { useSettingsStore } from "@/app/store/settings.store";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useUtilities } from "@/app/store/utilities.store";
// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";
// import { useSignInStore } from "@/app/store/sign-in.store";

// export type SettingDataType = {
//   text: string;
//   logoName: string;
// };

// export type SettingListPropsType = {
//   settingParams?: string | undefined;
// };

// const Icon = ({ name }: { name: string }) => {
//   const Icon = Icons[name as keyof typeof Icons];
//   return Icon ? <Icon width={"20px"} height={"20px"} /> : null;
// };

// const SettingList = ({ settingParams }: SettingListPropsType) => {
//   const { activeSetting, setActiveSetting, selectedButton, setSelectedButton } =
//     useSettingsStore();
//   const { isSettingsPage } = useUtilities();
//   const { logout } = useSignInStore();
//   const pathname = usePathname();
//   const { theme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   let currentSetting = "";
//   if (pathname) {
//     const match = pathname.match(/\/settings\/([^/]+)/);
//     if (match && match[1]) {
//       currentSetting = match[1];
//     }
//   }

//   return (
//     <div
//       className={`${
//         theme === "dark"
//           ? "border-l-[#52586699] border-r-[#52586699]"
//           : "border-l-[#CACFD8] border-r-[#CACFD8]"
//       } border-l border-r py-[20px] pl-8 pr-4 w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] flex flex-col gap-2`}
//     >
//       {isSettingsPage && (
//         <h1 className="flex lg:hidden text-2xl font-bold text-primary-light dark:text-primary-dark">
//           Settings
//         </h1>
//       )}

//       {settingsData.map((item, i) => {
//         const settingSlug = item.text.toLowerCase().replace(/\s+/g, "-");
//         const isActive =
//           (currentSetting && currentSetting === settingSlug) ||
//           activeSetting === item.text;
//         const isSelected = selectedButton === item.text;
//         const isLastItem = i === settingsData.length - 1;
//         const isLogout = item.text === "Logout";

//         return (
//           <Link
//             href={isLogout ? "#" : `/settings/${settingSlug}`}
//             key={item.text}
//             // onClick={() => {
//             //   setActiveSetting(item.text);
//             //   setSelectedButton(item.text);
//             // }}

//             onClick={() => {
//               if (isLogout) {
//                 // e.preventDefault();
//                 logout();
//               } else {
//                 setActiveSetting(item.text);
//                 setSelectedButton(item.text);
//               }
//             }}
//             className={`w-full flex items-center justify-between px-2 rounded-md transition-colors ${
//               isActive
//                 ? theme === "dark"
//                   ? "bg-[#2B303BB3]"
//                   : "bg-[#F3F5F8]"
//                 : isSelected
//                 ? "ring-2 ring-blue-400" 
//                 : ""
//             }`}
//           >
//             <div
//               className={`w-full flex items-center gap-2 text-sm text-primary-light dark:text-primary-dark font-medium border-t ${
//                 isLastItem
//                   ? theme === "dark"
//                     ? "border-t-[#52586699]"
//                     : "border-t-[#E0E4EA]"
//                   : "border-none"
//               } ${
//                 isLastItem ? "pt-[17.5px] pb-[9.5px]" : "pt-[9.5px] pb-[9.5px]"
//               }`}
//             >
//               <Icon name={item.logoName} />
//               <p
//                 className={`${
//                   theme === "dark" ? "#fff" : "#0E121B"
//                 } text-sm font-normal`}
//               >
//                 {item.text}
//               </p>
//             </div>
//             {isActive && <ArrowRight isActive={isActive} />}
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default SettingList;









"use client";
import { settingsData } from "@/app/data/data";
import { ArrowRight } from "../../__atoms";
import * as Icons from "../../__atoms";
import { useSettingsStore } from "@/app/store/settings.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSignInStore } from "@/app/store/sign-in.store";

export type SettingDataType = {
  text: string;
  logoName: string;
};

export type SettingListPropsType = {
  settingParams?: string | undefined;
};

const Icon = ({ name }: { name: string }) => {
  const Icon = Icons[name as keyof typeof Icons];
  return Icon ? <Icon width={"20px"} height={"20px"} /> : null;
};

const SettingList = ({ settingParams }: SettingListPropsType) => {
  const { activeSetting, setActiveSetting, selectedButton, setSelectedButton } =
    useSettingsStore();
  const { isSettingsPage } = useUtilities();
  const { logout } = useSignInStore();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let currentSetting = "";
  if (pathname) {
    const match = pathname.match(/\/settings\/([^/]+)/);
    if (match && match[1]) {
      currentSetting = match[1];
    }
  }

  return (
    <div
      className={`${
        theme === "dark"
          ? "border-l-[#52586699] border-r-[#52586699]"
          : "border-l-[#CACFD8] border-r-[#CACFD8]"
      } border-l border-r py-[20px] pl-8 pr-4 w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] flex flex-col gap-2`}
    >
      {isSettingsPage && (
        <h1 className="flex lg:hidden text-2xl font-bold text-primary-light dark:text-primary-dark">
          Settings
        </h1>
      )}

      {settingsData.map((item, i) => {
        const settingSlug = item.text.toLowerCase().replace(/\s+/g, "-");
        const isActive =
          (currentSetting && currentSetting === settingSlug) ||
          activeSetting === item.text;
        const isSelected = selectedButton === item.text;
        const isLastItem = i === settingsData.length - 1;
        const isLogout = item.text === "Logout";

        return (
          <Link
            href={isLogout ? "#" : `/settings/${settingSlug}`}
            key={item.text}
            // onClick={() => {
            //   setActiveSetting(item.text);
            //   setSelectedButton(item.text);
            // }}

            onClick={() => {
              if (isLogout) {
                // e.preventDefault();
                logout();
              } else {
                setActiveSetting(item.text);
                setSelectedButton(item.text);
              }
            }}
            className={`w-full flex items-center justify-between px-2 rounded-md transition-colors ${
              isActive
                ? theme === "dark"
                  ? "bg-[#2B303BB3]"
                  : "bg-[#F3F5F8]"
                : isSelected
                ? "ring-2 ring-blue-400" 
                : ""
            }`}
          >
            <div
              className={`w-full flex items-center gap-2 text-sm text-primary-light dark:text-primary-dark font-medium border-t ${
                isLastItem
                  ? theme === "dark"
                    ? "border-t-[#52586699]"
                    : "border-t-[#E0E4EA]"
                  : "border-none"
              } ${
                isLastItem ? "pt-[17.5px] pb-[9.5px]" : "pt-[9.5px] pb-[9.5px]"
              }`}
            >
              <Icon name={item.logoName} />
              <p
                className={`${
                  theme === "dark" ? "#fff" : "#0E121B"
                } text-sm font-normal`}
              >
                {item.text}
              </p>
            </div>
            {isActive && <ArrowRight isActive={isActive} />}
          </Link>
        );
      })}
    </div>
  );
};

export default SettingList;
