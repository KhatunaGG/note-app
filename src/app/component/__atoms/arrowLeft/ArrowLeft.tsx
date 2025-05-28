"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";

export type ArrowLeftPropsType = {
  selectedButton?: string | null;
  isFontThemePage?: boolean;
};

const ArrowLeft = ({ selectedButton, isFontThemePage }: ArrowLeftPropsType) => {
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";
  const fill =
    selectedButton || isFontThemePage ? (isDark ? "#fff" : "#525866") : "";

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.8124 15.3106L5.50195 9.00007L11.8124 2.68958L12.8729 3.75008L7.62292 9.00007L12.8729 14.2501L11.8124 15.3106Z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowLeft;
