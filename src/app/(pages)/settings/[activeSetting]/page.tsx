// import { SettingDetails, SettingList } from "@/app/component/__organism";
// import { settingsData } from "@/app/data/data";
// import React from "react";

// function getSettingBySlug(slug: string | null | undefined) {
//   if (typeof slug !== "string") {
//     return null;
//   }
//   try {
//     const normalizedSlug = slug.toLowerCase();
//     return settingsData.find(
//       (setting) =>
//         setting.text.toLowerCase().replace(/\s+/g, "-") === normalizedSlug
//     );
//   } catch (error) {
//     console.error("Error processing setting slug:", error);
//     return null;
//   }
// }

// export default function SettingPage({
//   params,
// }: {
//   params?: { activeSetting?: string };
// }) {
//   if (!params) {
//     return (
//       <>
//         <div className={` w-full lg:w-[24.82%] border-r border-r-[#CACFD8] `}>
//           <SettingList />
//         </div>
//         <div className="w-full lg:w-[50.34%] lg:flex hidden border-r border-r-[#CACFD8]">
//           <div className="p-8">
//             <h2 className="text-xl font-semibold text-gray-700">
//               Invalid settings page
//             </h2>
//             <p className="text-gray-500 mt-2">No parameters provided.</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   // Safely get the setting slug
//   const settingSlug = params.activeSetting || "";
//   const settingParams = getSettingBySlug(settingSlug);

//   return (
//     <>
//       <div
//         // className={`  w-full lg:w-[24.82%] border-r border-r-[#CACFD8]  bg-violet-200 `}
//         className={`w-full lg:w-[24.82%] border-r border-r-[#CACFD8] ${
//           settingParams?.text ? "hidden md:hidden lg:block" : ""
//         }`}
//       >
//         <SettingList settingParams={settingParams?.text} />
//       </div>

//       {/* <div className="w-full lg:w-[50.34%] lg:flex hidden border-r border-r-[#CACFD8]  bg-green-200"> */}
//       <div className="w-full lg:w-[50.34%]  min-h-[calc(100vh-108px)] md:min-h-[calc(100vh-119px)] lg:min-h-[calc(100vh-81px)]  ">
//         <div className="p-8 w-full ">
//           {settingParams ? (
//             <SettingDetails title={settingParams.text} />
//           ) : (
//             <div className="text-center p-8">
//               <h2 className="text-xl font-semibold text-gray-700">
//                 Setting not found
//               </h2>
//               <p className="text-gray-500 mt-2">
//                 The requested setting does not exist.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


// "use client";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { useUtilities } from "@/app/store/utilities.store";
// import { useSettingsStore } from "@/app/store/settings.store";
// import { SettingDetails } from "@/app/component/__organism";

// export default function ActiveSettingPage({
//   params,
// }: {
//   params: { activeSetting: string };
// }) {
//   const { activeSetting } = params;
//   const path = usePathname();
//   const { setCurrentPath } = useUtilities();
//   const { setFilteredSettings } = useSettingsStore();

//   useEffect(() => {
//     setCurrentPath(path);
    
//     if (activeSetting) {
//       // Decode the URL parameter since it might contain special characters
//       const decodedSetting = decodeURIComponent(activeSetting);
//       setFilteredSettings(decodedSetting);
//     }
//   }, [activeSetting, path, setCurrentPath, setFilteredSettings]);

//   return <SettingDetails title={decodeURIComponent(activeSetting)} />;
// }




import {
  Aside,
  Header,
  Nav,
  Notes,
  SettingDetails,
} from "@/app/component/__organism";
import React from "react";

export default async function ParamPage({
  params,
}: {
  params: Promise<{ activeSetting: string }>;
}) {
  const { activeSetting } = await params;

  return (
    <div className="w-full flex flex-col items-start relative">
      <div className="h-[54px] md:h-[74px] lg:h-[81px] w-full absolute inset-0 z-10">
        <Header />
      </div>

      <div className="w-full t-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex">
        <div className="w-full lg:w-[24.82%] hidden lg:block border-r border-r-[#CACFD8] ">
          <Notes />
        </div>
        <div className="w-full lg:w-[50.34%]  lg:flex py-8 px-8">
          {activeSetting && <SettingDetails settingsParam={activeSetting} />}
        </div>

        {/* <div className="w-full lg:w-[22.07%] hidden lg:flex">
          <Aside />
        </div> */}
      </div>
      <Nav />
    </div>
  );
}
