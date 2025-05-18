// "use client";
// import { useSettingsStore } from "@/app/store/settings.store";
// import {
//   Radio,
//   Sun,
//   Moon,
//   System,
//   SansSerif,
//   Serif,
//   Mono,
// } from "../../__atoms";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { useEffect, useState } from "react";
// import { usePathname } from "next/navigation";
// import { useUtilities } from "@/app/store/utilities.store";
// import useManageNotes from "@/app/store/notes.store";
// import { settingsData } from "@/app/data/data";
// import GoBack from "../goBack/GoBack";
// import ChangePassword from "../changePassword/ChangePassword";

// export type SettingDetailsPropsType = {
//   settingsParam?: string;
// };

// const Icons: Record<string, React.ReactNode> = {
//   Sun: <Sun />,
//   Moon: <Moon />,
//   System: <System />,
//   SansSerif: <SansSerif />,
//   Serif: <Serif />,
//   Mono: <Mono />,
// };

// const SettingDetails = ({ settingsParam }: SettingDetailsPropsType) => {
//   const path = usePathname();
//   const { accessToken } = useSignInStore();
//   const {
//     setSelectedTheme,
//     selectedTheme,
//     setFilteredData,
//     filteredData,
//     // applyTheme,
//   } = useSettingsStore();
//   const { setCurrentPath, setIsSettingsDetailsPage, isSettingsPage } =
//     useUtilities();
//   const { getAllNotes } = useManageNotes();

//   useEffect(() => {
//     setCurrentPath(path);
//     setIsSettingsDetailsPage(path.includes("/settingDetails"));
//     if (accessToken) {
//       getAllNotes();
//     }
//     console.log(selectedTheme, "selectedTheme");
//     if (settingsParam) {
//       const normalizedParam = settingsParam.replace(/-/g, " ").toLowerCase();
//       const filtered =
//         settingsData.find(
//           (item) => item.text.toLowerCase() === normalizedParam
//         ) ?? null;
//       setFilteredData(filtered);
//       // setSelectedTheme("");
//     }
//   }, [path, accessToken, settingsParam]);

//   // useEffect(() => {
//   //   const saved = localStorage.getItem("theme") || "system";
//   //   // applyTheme(saved);
//   //   // setSelectedTheme(saved)
//   // }, []);

//   // console.log(selectedTheme, "selectedTheme");






//   // const applyTheme = (theme: string) => {
//   //   console.log(theme, "theme");
//   //   localStorage.setItem("selectedTheme", theme);
//   //   if (theme === "Dark Mode") {
//   //     document.documentElement.classList.add("dark");
//   //     localStorage.setItem("theme", "dark");
//   //   } else if (theme === "Light Mode") {
//   //     document.documentElement.classList.remove("dark");
//   //     localStorage.setItem("theme", "light");
//   //   }
//   // };

// console.log(selectedTheme, "selectedTheme")


//   const applyTheme = (theme: string) => {
//     console.log(theme, "theme");
//     localStorage.setItem("selectedTheme", theme);
//     if (theme === "Dark Mode" || theme === "dark") {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else if (theme === "Light Mode" || theme === "light") {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     } else if (theme === "System" || theme === "system") {
//       const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//       if (isSystemDark) {
//         document.documentElement.classList.add("dark");
//         localStorage.setItem("theme", "dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//         localStorage.setItem("theme", "light");
//       }
//     }
//   };






//   if (settingsParam === "change-password") {
//     return <ChangePassword settingsParam={settingsParam} />;
//   }

//   if (!accessToken) return null;

//   return (
//     <section className="w-full pt-[54px] md:pt-0">
//       {isSettingsPage && settingsParam && (
//         <GoBack settingsParam={settingsParam} />
//       )}
//       <div className="w-full flex flex-col gap-6 mt-2 lg:mt-0">
//         <div className="flex flex-col w-full">
//           <h2 className="text-[#0E121B] text-2xl font-bold lg:font-medium lg:text-base">
//             {filteredData?.text}
//           </h2>
//           <p className="text-[#2B303B] font-medium text-xs">
//             {filteredData?.pText}
//           </p>
//         </div>

//         <div className="w-full flex flex-col gap-4">
//           {filteredData?.settingTheme &&
//             filteredData?.settingTheme?.length > 0 &&
//             filteredData.settingTheme.map((item, i) => {
//               return (
//                 <button
//                   onClick={() => setSelectedTheme(item.mode)}
//                   key={i}
//                   className={`${
//                     selectedTheme === item.mode && "bg-[#F3F5F8]"
//                   } w-full p-4 rounded-xl flex flex-row justify-between items-center border border-[#E0E4EA] `}
//                 >
//                   <div className="flex flex-row gap-4">
//                     <div
//                       className={`${
//                         selectedTheme === item.mode && "bg-white"
//                       } w-10 h-10 rounded-xl border border-[#E0E4EA] flex items-center justify-center`}
//                     >
//                       {Icons[item.icon] ?? <Sun />}
//                     </div>

//                     <div className="flex flex-col items-start">
//                       <h2 className="text-[#0E121B] font-medium text-sm">
//                         {item.mode}
//                       </h2>
//                       <p className="text-[#2B303B] font-medium text-xs">
//                         {item.pText}
//                       </p>
//                     </div>
//                   </div>
//                   <Radio isSelected={selectedTheme === item.mode} />
//                 </button>
//               );
//             })}
//         </div>
//         <div className="w-full flex justify-end">
//           <button
//             onClick={() => applyTheme(selectedTheme)}
//             className="text-white rounded-lg bg-[#335CFF] px-4 py-3 font-medium text-sm"
//           >
//             Apply Changes
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SettingDetails;



"use client";
import { useSettingsStore } from "@/app/store/settings.store";
import {
  Radio,
  Sun,
  Moon,
  System,
  SansSerif,
  Serif,
  Mono,
} from "../../__atoms";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import useManageNotes from "@/app/store/notes.store";
import { settingsData } from "@/app/data/data";
import GoBack from "../goBack/GoBack";
import ChangePassword from "../changePassword/ChangePassword";

export type SettingDetailsPropsType = {
  settingsParam?: string;
};

const Icons: Record<string, React.ReactNode> = {
  Sun: <Sun />,
  Moon: <Moon />,
  System: <System />,
  SansSerif: <SansSerif />,
  Serif: <Serif />,
  Mono: <Mono />,
};

const SettingDetails = ({ settingsParam }: SettingDetailsPropsType) => {
  const path = usePathname();
  const { accessToken } = useSignInStore();
  const {
    setSelectedTheme,
    selectedTheme,
    setFilteredData,
    filteredData,
  } = useSettingsStore();
  const { setCurrentPath, setIsSettingsDetailsPage, isSettingsPage } =
    useUtilities();
  const { getAllNotes } = useManageNotes();

  useEffect(() => {
    setCurrentPath(path);
    setIsSettingsDetailsPage(path.includes("/settingDetails"));
    if (accessToken) {
      getAllNotes();
    }
    console.log(selectedTheme, "selectedTheme");
    if (settingsParam) {
      const normalizedParam = settingsParam.replace(/-/g, " ").toLowerCase();
      const filtered =
        settingsData.find(
          (item) => item.text.toLowerCase() === normalizedParam
        ) ?? null;
      setFilteredData(filtered);
    }
  }, [path, accessToken, settingsParam]);

  const applyTheme = (theme: string) => {
    console.log(theme, "theme");
    localStorage.setItem("selectedTheme", theme);
    if (theme === "Dark Mode" || theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "Light Mode" || theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else if (theme === "System" || theme === "system") {
      const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isSystemDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  };



  if (settingsParam === "change-password") {
    return <ChangePassword settingsParam={settingsParam} />;
  }

  if (!accessToken) return null;

  return (
    <section className="w-full pt-[54px] md:pt-0                 ">
      {isSettingsPage && settingsParam && (
        <GoBack settingsParam={settingsParam} />
      )}
      <div className="w-full flex flex-col gap-6 mt-2 lg:mt-0">
        <div className="flex flex-col w-full">
          <h2 className="text-[#0E121B] dark:text-white text-2xl font-bold lg:font-medium lg:text-base">
            {filteredData?.text}
          </h2>
          <p className="text-[#2B303B] dark:text-[#e1e1e1] font-medium text-xs">
            {filteredData?.pText}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          {filteredData?.settingTheme &&
            filteredData?.settingTheme?.length > 0 &&
            filteredData.settingTheme.map((item, i) => {
              return (
                <button
                  onClick={() => setSelectedTheme(item.mode)}

                  key={i}
                  className={`${
                    selectedTheme === item.mode ? "bg-[#F3F5F8] dark:bg-[#3a3f47]" : "hover:bg-[#F3F5F8] dark:hover:bg-[#3a3f47]"
                  } w-full p-4 rounded-xl flex flex-row justify-between items-center border border-[#E0E4EA] dark:border-[#4a4a4a] transition-colors`}
                >
                  <div className="flex flex-row gap-4">
                    <div
                      className={`${
                        selectedTheme === item.mode ? "bg-white dark:bg-[#232530]" : "bg-[#F3F5F8] dark:bg-[#3a3f47]"
                      } w-10 h-10 rounded-xl border border-[#E0E4EA] dark:border-[#4a4a4a] flex items-center justify-center`}
                    >
                      {Icons[item.icon] ?? <Sun />}
                    </div>

                    <div className="flex flex-col items-start">
                      <h2 className="text-[#0E121B] dark:text-white font-medium text-sm">
                        {item.mode}
                      </h2>
                      <p className="text-[#2B303B] dark:text-[#e1e1e1] font-medium text-xs">
                        {item.pText}
                      </p>
                    </div>
                  </div>
                  <Radio isSelected={selectedTheme === item.mode} />
                </button>
              );
            })}
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={() => applyTheme(selectedTheme)}
         
            className="text-white rounded-lg bg-[#335CFF] px-4 py-3 font-medium text-sm"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default SettingDetails;
