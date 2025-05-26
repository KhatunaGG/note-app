"use client";
import { useEffect } from "react";
import { useSettingsStore } from "@/app/store/settings.store";

const FontSwitch = () => {
  const { currentFont } = useSettingsStore();

  useEffect(() => {
    const fontClass =
      {
        Inter: "font-inter",
        Lora: "font-lora",
        GeistMono: "font-geist-mono",
      }[currentFont] || "font-inter";

    const body = document.body;
    body.classList.remove("font-inter", "font-lora", "font-geist-mono");
    body.classList.add(fontClass);
  }, [currentFont]);

  return null;
};

export default FontSwitch;
