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
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import useManageNotes from "@/app/store/notes.store";
import { settingsData } from "@/app/data/data";
import GoBack from "../goBack/GoBack";

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
  const { setSelectedTheme, selectedTheme, setFilteredData, filteredData } =
    useSettingsStore();
  const { setCurrentPath, setIsSettingsDetailsPage, isSettingsPage } =
    useUtilities();
  const { getAllNotes } = useManageNotes();

  useEffect(() => {
    setCurrentPath(path);
    setIsSettingsDetailsPage(path.includes("/settingDetails"));

    if (accessToken) {
      getAllNotes();
    }

    if (settingsParam) {
      const normalizedParam = settingsParam.replace(/-/g, " ").toLowerCase();
      const filtered =
        settingsData.find(
          (item) => item.text.toLowerCase() === normalizedParam
        ) ?? null;
      setFilteredData(filtered);
    }
  }, [path, accessToken, settingsParam]);

  return (
    <section className="w-full pt-[54px] md:pt-0">
      {isSettingsPage && settingsParam && (
        <GoBack settingsParam={settingsParam} />
      )}
      <div className="w-full flex flex-col gap-6 mt-2 lg:mt-0">
        <div className="flex flex-col w-full">
          <h2 className="text-[#0E121B] text-2xl font-bold lg:font-medium lg:text-base">
            {filteredData?.text}
          </h2>
          <p className="text-[#2B303B] font-medium text-xs">
            {filteredData?.pText}
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          {filteredData?.settingTheme &&
            filteredData?.settingTheme?.length > 0 &&
            filteredData.settingTheme.map((item, i) => {
              console.log(item, "item from map");
              return (
                <button
                  onClick={() => setSelectedTheme(item.mode)}
                  key={i}
                  className={`${
                    selectedTheme === item.mode && "bg-[#F3F5F8]"
                  } w-full p-4 rounded-xl flex flex-row justify-between items-center border border-[#E0E4EA]`}
                >
                  <div className="flex flex-row gap-4">
                    <div
                      className={`${
                        selectedTheme === item.mode && "bg-white"
                      } w-10 h-10 rounded-xl border border-[#E0E4EA] flex items-center justify-center`}
                    >
                      {Icons[item.icon] ?? <Sun />}
                    </div>

                    <div className="flex flex-col items-start">
                      <h2 className="text-[#0E121B] font-medium text-sm">
                        {item.mode}
                      </h2>
                      <p className="text-[#2B303B] font-medium text-xs">
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
          <button className="text-white rounded-lg bg-[#335CFF] px-4 py-3 font-medium text-sm">
            Apply Changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default SettingDetails;
