"use client";
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useSettingsStore } from '@/app/store/settings.store';

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const { selectedTheme } = useSettingsStore();
  
  
  useEffect(() => {
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

    setTheme(mapThemeValue(selectedTheme));
  }, [selectedTheme, setTheme]);

  return null;
};

export default ThemeSwitch;