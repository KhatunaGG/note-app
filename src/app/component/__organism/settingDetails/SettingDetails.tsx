"use client";
import { useSettingsStore } from "@/app/store/settings.store";
import {
  Radio,
  Sun,
  Moon,
  System,
  Inter,
  GeistMono,
  Lora,
} from "../../__atoms";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useUtilities } from "@/app/store/utilities.store";
import useManageNotes from "@/app/store/notes.store";
import { settingsData } from "@/app/data/data";
import GoBack from "../goBack/GoBack";
import ChangePassword from "../changePassword/ChangePassword";
import { useTheme } from "next-themes";
import { SettingDetailsPropsType } from "@/app/interface";

const Icons: Record<string, React.ReactNode> = {
  Sun: <Sun />,
  Moon: <Moon />,
  System: <System />,
  Inter: <Inter />,
  GeistMono: <GeistMono />,
  Lora: <Lora />,
};

const SettingDetails = ({ settingsParam }: SettingDetailsPropsType) => {
  const path = usePathname();
  const { accessToken } = useSignInStore();
  const {
    setSelectedTheme,
    selectedTheme,
    currentTheme,
    applySelectedTheme,
    setFilteredData,
    filteredData,
    applySelectedFont,
    setSelectedFont,
    selectedFont,
  } = useSettingsStore();
  const { setCurrentPath, setIsSettingsDetailsPage, isSettingsPage } =
    useUtilities();
  const { getAllNotes } = useManageNotes();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mapThemeValue = (themeValue: string): string => {
    const value = themeValue.toLowerCase();
    if (value === "dark mode" || value === "dark") {
      return "dark";
    } else if (value === "light mode" || value === "light") {
      return "light";
    } else {
      return "system";
    }
  };

  useEffect(() => {
    if (!selectedTheme && currentTheme) {
      setSelectedTheme(currentTheme);
    }

    if (currentTheme) {
      setTheme(mapThemeValue(currentTheme));
    }
  }, [currentTheme, selectedTheme, setSelectedTheme, setTheme]);

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
  }, [
    path,
    accessToken,
    settingsParam,
    setCurrentPath,
    setIsSettingsDetailsPage,
    getAllNotes,
    setFilteredData,
  ]);

  if (settingsParam === "change-password") {
    return <ChangePassword settingsParam={settingsParam} />;
  }

  const applyTheme = () => {
    const mappedTheme = mapThemeValue(selectedTheme);
    setTheme(mappedTheme);
    applySelectedTheme();
    applySelectedFont();
  };

  if (!accessToken) return null;

  return (
    <section className="w-full  md:pt-0 bg-light dark:bg-dark text-primary-light dark:text-primary-dark transition-colors duration-300">
      {isSettingsPage && settingsParam && (
        <GoBack settingsParam={settingsParam} />
      )}
      <div className="w-full flex flex-col gap-6 mt-2 lg:mt-0">
        <div className="flex flex-col w-full">
          <h2 className="text-primary-light dark:text-primary-dark text-2xl font-bold lg:font-medium lg:text-base">
            {filteredData?.text}
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark font-medium text-xs">
            {filteredData?.pText}
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          {filteredData?.settingTheme &&
            filteredData?.settingTheme?.length > 0 &&
            filteredData.settingTheme.map((item, i) => {
              const isSelected =
                filteredData?.text === "Color Theme"
                  ? selectedTheme.toLowerCase() === item.mode.toLowerCase()
                  : selectedFont.toLowerCase() === item.mode.toLowerCase();
              return (
                <button
                  onClick={() =>
                    filteredData?.text === "Color Theme"
                      ? setSelectedTheme(item.mode)
                      : setSelectedFont(item.mode)
                  }
                  key={i}
                  className={`
                    ${
                      isSelected
                        ? theme === "dark"
                          ? "bg-[#2B303BB3]"
                          : "bg-[#E0E4EA] "
                        : ""
                    } ${
                    theme === "dark" ? "border-[#52586699]" : "border-[#E0E4EA]"
                  }
                    w-full p-4 rounded-xl flex flex-row justify-between items-center
                    border transition-colors duration-300 ease-in-out
                  `}
                >
                  <div className="flex flex-row gap-4">
                    <div
                      className={`${
                        isSelected
                          ? theme === "dark"
                            ? "bg-[#0E121B]"
                            : "bg-white"
                          : ""
                      } w-10 h-10 rounded-xl border  transition-colors duration-300 ease-in-out  ${
                        theme === "dark"
                          ? "border-[#52586699]"
                          : "border-[#E0E4EA]"
                      } flex items-center justify-center border`}
                    >
                      {Icons[item.icon] ?? <Sun />}
                    </div>
                    <div className="flex flex-col items-start">
                      <h2 className="text-primary-light dark:text-primary-dark font-medium text-sm">
                        {item.mode}
                      </h2>
                      <p className="text-secondary-light dark:text-secondary-dark font-medium text-xs">
                        {item.pText}
                      </p>
                    </div>
                  </div>
                  <Radio isSelected={isSelected} />
                </button>
              );
            })}
        </div>
        <div className="w-full flex justify-end">
          <button
            onClick={applyTheme}
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
