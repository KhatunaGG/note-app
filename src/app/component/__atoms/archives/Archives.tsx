// "use client";

// import { useTheme } from "next-themes";
// import { useEffect, useState } from "react";

// export type ArchivesPropsType = {
//   width: string;
//   height: string;
//   isActive?: boolean;
// };

// const Archives = ({ width, height, isActive = false }: ArchivesPropsType) => {
//   const { theme, systemTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const fill = isActive ? "#335CFF" : "#717784";

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M17.5 6.48513V13.5141C17.5 15.9708 15.7657 17.5 13.3113 17.5H6.68865C4.23432 17.5 2.5 15.9708 2.5 13.5133V6.48513C2.5 4.02837 4.23432 2.5 6.68865 2.5H13.3113C15.7657 2.5 17.5 4.03567 17.5 6.48513Z"
//         stroke="#717784"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M12.5 11.6667L9.9985 14.1667L7.5 11.6667"
//         stroke="#717784"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M9.99835 14.1666V8.33331"
//         stroke="#717784"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M17.4447 5.83331H2.54883"
//         stroke="#717784"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// export default Archives;

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type ArchivesPropsType = {
  width: string;
  height: string;
  isActive?: boolean;
};

const Archives = ({ width, height, isActive = false }: ArchivesPropsType) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const fill = isActive ? "#335CFF" : "#717784";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 6.48513V13.5141C17.5 15.9708 15.7657 17.5 13.3113 17.5H6.68865C4.23432 17.5 2.5 15.9708 2.5 13.5133V6.48513C2.5 4.02837 4.23432 2.5 6.68865 2.5H13.3113C15.7657 2.5 17.5 4.03567 17.5 6.48513Z"
        // stroke="#717784"
        //  fill={fill}
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11.6667L9.9985 14.1667L7.5 11.6667"
        // stroke="#717784"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99835 14.1666V8.33331"
        // stroke="#717784"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.4447 5.83331H2.54883"
        // stroke="#717784"
        stroke={fill}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Archives;
