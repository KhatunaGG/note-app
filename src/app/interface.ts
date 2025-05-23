export interface ErrorResponse {
  message: string;
}


export type IconName = "Home" | "Search" | "Archives" | "Tag" | "Setting";

export type NavItemType = {
  href: string;
  // iconName: keyof typeof Icons;
    iconName: IconName;
  label: string;
};