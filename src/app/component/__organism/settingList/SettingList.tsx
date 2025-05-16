"use client";
import { settingsData } from "@/app/data/data";
import { ArrowRight } from "../../__atoms";
import * as Icons from "../../__atoms";
import { useSettingsStore } from "@/app/store/settings.store";

export type SettingDataType = {
  text: string;
  logoName: string;
};

const Icon = ({ name }: { name: string }) => {
  const Icon = Icons[name as keyof typeof Icons];
  return Icon ? <Icon width={"20px"} height={"20px"} /> : null;
};

const SettingList = () => {
  const { activeSetting, setActiveSetting } = useSettingsStore();
  return (
    <div className="py-[20px] pl-8 pr-4 w-full min-h-[calc(100vh-54px)] md:min-h-[calc(100vh-74px)] lg:min-h-[calc(100vh-81px)] flex flex-col gap-2">
      {settingsData.map((item, i) => {
        const isActive = activeSetting === item.text;
        return (
          <button
            onClick={() => setActiveSetting(item.text)}
            key={item.text}
            className={`w-full flex items-center justify-between py-[9.5px] px-2 rounded-md transition-colors ${
              isActive ? "bg-[#F3F5F8]" : "hover:bg-[#F3F5F8]"
            }`}
          >
            <div className="flex items-center gap-2 text-sm text-[#0E121B] font-medium">
              <Icon name={item.logoName} />
              <p>{item.text}</p>
            </div>
            {isActive && <ArrowRight />}
          </button>
        );
      })}
    </div>
  );
};

export default SettingList;
