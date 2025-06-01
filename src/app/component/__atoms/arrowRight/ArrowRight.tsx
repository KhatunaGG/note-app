"use client";
import { useMountedTheme } from "@/app/hooks/useMountedTheme";
import { ArrowRightPropsType } from "@/app/interface";

const ArrowRight = ({ isActive }: ArrowRightPropsType) => {
  const { mounted, theme } = useMountedTheme();
  const isDark = mounted && theme === "dark";
  const fill = isActive ? (isDark ? "#fff" : "#525866") : "";

  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2749_9322)">
        <path
          d="M1 1L5 5L1 9"
          stroke={fill}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2749_9322">
          <rect width="6" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRight;
