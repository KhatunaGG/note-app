import React from "react";
import Notes from "../notes/Notes";
import SettingDetails from "../settingDetails/SettingDetails";

const Settings = () => {
  return (
    <div className="w-full t-[54px] md:pt-[74px] lg:pt-[81px] min-h-screen flex ">
      <div className="w-full lg:w-[24.82%]   border border-[#E0E4EA]">
        <Notes />
      </div>
      <div className="w-full lg:w-[50.34%] lg:flex hidden ">
        <SettingDetails />
        {/* <div className="w-full lg:w-[22.07%] hidden lg:flex border-l border-l-[#CACFD8]">
             <Aside />
           </div> */}
      </div>
    </div>
  );
};

export default Settings;
