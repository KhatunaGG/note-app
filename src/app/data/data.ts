import { NavItemType } from "../interface";

export const settingsData = [
  {
    text: "Color Theme",
    logoName: "Sun",
    pText: "Choose your color theme:",
    settingTheme: [
      {
        icon: "Sun",
        mode: "Light Mode",
        pText: "Pick a clean and classic light theme",
      },
      {
        icon: "Moon",
        mode: "Dark Mode",
        pText: "Select a sleek and modern dark theme",
      },
      {
        icon: "System",
        mode: "System",
        pText: "Adapts to your device’s theme",
      },
    ],
  },
  {
    text: "Font Theme",
    logoName: "Type",
    pText: "Choose your font theme:",
    settingTheme: [
      {
        icon: "Inter",
        mode: "Inter",
        pText: "Clean and modern, easy to read.",
      },
      {
        icon: "GeistMono",
        mode: "GeistMono",
        pText: "Classic and elegant for a timeless feel.",
      },
      {
        icon: "Lora",
        mode: "Lora",
        pText: "Code-like, great for a technical vibe.",
      },
    ],
  },
  {
    text: "Change Password",
    logoName: "Pass",
  },
  {
    text: "Logout",
    logoName: "Logout",
  },
];

export const navItems: NavItemType[] = [
  { href: "/note", iconName: "Home", label: "Home" },
  { href: "/search", iconName: "Search", label: "Search" },
  { href: "/archive", iconName: "Archives", label: "Archives" },
  { href: "/tags", iconName: "Tag", label: "Tag" },
  { href: "/settings", iconName: "Setting", label: "Settings" },
];
