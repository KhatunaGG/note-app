"use client";
import { settingsData } from "@/app/data/data";
import { ArrowRight } from "../../__atoms";
import * as Icons from "../../__atoms";
import { useSettingsStore } from "@/app/store/settings.store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import { useEffect } from "react";

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
  const { activeSetting, setActiveSetting } = useSettingsStore();
  const { isSettingsPage } = useUtilities();
  const pathname = usePathname();

  let currentSetting = "";
  if (pathname) {
    const match = pathname.match(/\/settings\/([^/]+)/);
    if (match && match[1]) {
      currentSetting = match[1];
    }
  }

//bg-white dark:bg-['#232530'] transition-colors duration-700 ease-in-out     

  return (
    <div className="   py-[20px] pl-8 pr-4 w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] flex flex-col gap-2 border-l border-l-[#CACFD8]">
      {isSettingsPage && (
        <h1 className="flex lg:hidden text-2xl font-bold text-[#0E121B]   ">
          Settings
        </h1>
      )}

      {settingsData.map((item, i) => {
        const settingSlug = item.text.toLowerCase().replace(/\s+/g, "-");
        const isActive =
          (currentSetting && currentSetting === settingSlug) ||
          activeSetting === item.text;
        const isLastItem = i === settingsData.length - 1;
        return (
          <Link
            href={`/settings/${settingSlug}`}
            key={item.text}
            onClick={() => setActiveSetting(item.text)}
            className={`w-full flex items-center justify-between  px-2 rounded-md transition-colors ${
              isActive ? "bg-[#F3F5F8]" : "hover:bg-[#F3F5F8]"
            }`}
          >
            <div
              className={`${isLastItem && " border-t border-t-[#e8eaec]"} ${
                isLastItem ? "pt-[17.5px] pb-[9.5px]" : "pt-[9.5px] pb-[9.5px]"
              }  w-full flex items-center gap-2 text-sm text-[#0E121B] font-medium`}
            >
              <Icon name={item.logoName} />
              <p>{item.text}</p>
            </div>
            {isActive && <ArrowRight />}
          </Link>
        );
      })}
    </div>
  );
};

export default SettingList;

// "use client";
// import { settingsData } from "@/app/data/data";
// import { ArrowRight } from "../../__atoms";
// import * as Icons from "../../__atoms";
// import { useSettingsStore } from "@/app/store/settings.store";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useUtilities } from "@/app/store/utilities.store";
// import { useEffect } from "react";

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
//   const { activeSetting, setActiveSetting, applyTheme } = useSettingsStore();
//   const { isSettingsPage } = useUtilities();
//   const pathname = usePathname();

//   // More robust URL pattern matching
//   let currentSetting = "";
//   if (pathname) {
//     const match = pathname.match(/\/settings\/([^/]+)/);
//     if (match && match[1]) {
//       currentSetting = match[1];
//     }
//   }

//   // console.log(activeSetting, "activeSetting from settings")

//   useEffect(() => {
//     const saved = localStorage.getItem("theme") || "system";
//     applyTheme(saved);
//   }, []);

//   //dark:bg-darkBg
//   //dark:bg-[#232530]
//   // bg-white dark:bg-[#232530]

//   return (
//     <div className="bg-white dark:bg-dark text-black dark:text-white         py-[20px] pl-8 pr-4 w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] flex flex-col gap-2 border-l border-l-[#CACFD8]">
//       {isSettingsPage && (
//         <h1 className="flex lg:hidden text-2xl font-bold           text-[#0E121B] dark:text-white   ">
//           Settings
//         </h1>
//       )}

//       {settingsData.map((item, i) => {
//         const settingSlug = item.text.toLowerCase().replace(/\s+/g, "-");
//         const isActive =
//           (currentSetting && currentSetting === settingSlug) ||
//           activeSetting === item.text;
//         const isLastItem = i === settingsData.length - 1;
//         return (
//           <Link
//             // href={`/settings/${settingSlug}`}
//             href={`/settings/${settingSlug}`}
//             key={item.text}
//             onClick={() => setActiveSetting(item.text)}
//             // className={`w-full flex items-center justify-between  px-2 rounded-md transition-colors ${
//             //   isActive ? "bg-[#F3F5F8]" : "hover:bg-[#F3F5F8]"
//             // }`}

//              className={`w-full flex items-center justify-between px-2 rounded-md transition-colors 
//     ${isActive ? "bg-[#F3F5F8] dark:bg-gray-700" : "hover:bg-[#F3F5F8] dark:hover:bg-gray-700"}`}
//           >
//             <div
//               className={`${isLastItem && " border-t border-t-[#e8eaec]"} ${
//                 isLastItem ? "pt-[17.5px] pb-[9.5px]" : "pt-[9.5px] pb-[9.5px]"
//               }  w-full flex items-center gap-2 text-sm text-[#0E121B] dark:text-white font-medium`}

              
//             >
//               <Icon name={item.logoName} />
//               <p>{item.text}</p>
//             </div>
//             {isActive && <ArrowRight />}
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default SettingList;
