"use client";

import { useSettingsStore } from "@/app/store/settings.store";
import { Radio, Sun } from "../../__atoms";

const SettingDetails = () => {
  const { activeSetting, setActiveSetting } = useSettingsStore();
  console.log(activeSetting, "activeSetting");
  return (
    <section className=" w-full ">
      <div className=" w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] pl-8 py-8 flex flex-col gap-6">
        <div className="flex flex-col w-full ">
          <h2 className="text-[#0E121B] font-medium text-sm">
            {activeSetting}
          </h2>
          <p className="text-[#2B303B] font-medium text-xs">
            Pick a clean and classic light theme
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <button className="w-full p-4 rounded-xl flex flex-row justify-between items-center border border-[#E0E4EA]">
            <div className="flex flex-row gap-4">
              <div className="w-10 h-10 rounded-xl border border-[#E0E4EA] flex items-center  justify-center ">
                <Sun />
              </div>

              <div className="flex flex-col  items-start">
                <h2 className="text-[#0E121B] font-medium text-sm">
                  Light Mode
                </h2>
                <p className="text-[#2B303B] font-medium text-xs">
                  Pick a clean and classic light theme
                </p>
              </div>
            </div>

            <Radio />
          </button>


                   <button className="w-full p-4 rounded-xl flex flex-row justify-between items-center border border-[#E0E4EA]">
            <div className="flex flex-row gap-4">
              <div className="w-10 h-10 rounded-xl border border-[#E0E4EA] flex items-center  justify-center ">
                <Sun />
              </div>

              <div className="flex flex-col  items-start">
                <h2 className="text-[#0E121B] font-medium text-sm">
                  Light Mode
                </h2>
                <p className="text-[#2B303B] font-medium text-xs">
                  Pick a clean and classic light theme
                </p>
              </div>
            </div>

            <Radio />
          </button>




                   <button className="w-full p-4 rounded-xl flex flex-row justify-between items-center border border-[#E0E4EA]">
            <div className="flex flex-row gap-4">
              <div className="w-10 h-10 rounded-xl border border-[#E0E4EA] flex items-center  justify-center ">
                <Sun />
              </div>

              <div className="flex flex-col  items-start">
                <h2 className="text-[#0E121B] font-medium text-sm">
                  Light Mode
                </h2>
                <p className="text-[#2B303B] font-medium text-xs">
                  Pick a clean and classic light theme
                </p>
              </div>
            </div>

            <Radio />
          </button>
        </div>

        <div className="w-full flex justify-end">

        <button className="text-white rounded-lg bg-[#335CFF] px-4 py-3 font-medium text-sm  ">Apply Changes</button>
        </div>

      </div>
    </section>
  );
};

export default SettingDetails;
