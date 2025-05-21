import { Header, Nav, Notes } from "@/app/component/__organism";
import ThemeSwitch from "@/app/component/__organism/themeSwitch/ThemeSwitch";
import React from "react";

export default function NotePage() {
  return (
    <div className="w-full flex flex-col items-start relative">

      <div className="h-[54px] md:h-[74px] lg:h-[81px] w-full absolute inset-0 z-10">
        <Header />
      </div>

      <div className="w-full t-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex">
        <div className="w-full lg:w-[24.82%]  md:pt-0   ">
          <Notes />
        </div>
        <div className="w-full lg:w-[50.34%] lg:flex hidden">
          {/* <NoteDetails /> */}
        </div>
      </div>
      <Nav />
    </div>
  );
}
