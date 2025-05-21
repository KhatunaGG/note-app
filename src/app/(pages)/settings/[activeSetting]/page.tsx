// import { Header, Nav, Notes, SettingDetails } from "@/app/component/__organism";
// import ThemeSwitch from "@/app/component/__organism/themeSwitch/ThemeSwitch";
// import React from "react";

// export default async function ParamPage({
//   params,
// }: {
//   params: Promise<{ activeSetting: string }>;
// }) {
//   const { activeSetting } = await params;

//   return (
//     <div className="w-full flex flex-col items-start relative">

//       <div className="h-[54px] md:h-[74px] lg:h-[81px] w-full absolute inset-0 z-10">
//         <Header />
//       </div>
//       <div className="w-full pt-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex">
//         <div className="w-full lg:w-[24.82%] hidden lg:block border-r border-r-[#CACFD8] ">
//           <Notes />
//         </div>
//         <div className="w-full lg:w-[50.34%]  lg:flex py-8 px-4 md:px-8">
//           {activeSetting && <SettingDetails settingsParam={activeSetting} />}
//         </div>
//       </div>
//       <Nav />
//     </div>
//   );
// }



import { Header, Nav, Notes, SettingDetails } from "@/app/component/__organism";
import ThemeSwitch from "@/app/component/__organism/themeSwitch/ThemeSwitch";
import { Providers } from "@/app/theme/ThemeProvider ";
import React from "react";

export default async function ParamPage({
  params,
}: {
  params: Promise<{ activeSetting: string }>;
}) {
  const { activeSetting } = await params;

  return (
    <Providers>
 <ThemeSwitch/>
    <div className="w-full flex flex-col items-start relative">

      <div className="h-[54px] md:h-[74px] lg:h-[81px] w-full absolute inset-0 z-10">
        <Header />
      </div>
      <div className="w-full pt-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex">
        <div className="w-full lg:w-[24.82%] hidden lg:block">
          <Notes />
        </div>
        <div className="w-full lg:w-[50.34%]  lg:flex py-8 px-4 md:px-8">
          {activeSetting && <SettingDetails settingsParam={activeSetting} />}
        </div>
      </div>
      <Nav />
    </div>
    </Providers>
  );
}
