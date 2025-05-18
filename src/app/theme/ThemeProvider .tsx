// "use client";

// import React, { useEffect } from "react";
// import { useSettingsStore } from "@/app/store/settings.store";

// const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const { applyTheme, selectedTheme } = useSettingsStore();

//  useEffect(() => {
//     applyTheme(selectedTheme); 
//   }, [selectedTheme]);

// useEffect(() => {
//   const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//   const handleChange = () => {
//     if (selectedTheme === "System") {
//       applyTheme("System");
//     }
//   };
//   mediaQuery.addEventListener("change", handleChange);
//   return () => mediaQuery.removeEventListener("change", handleChange);
// }, [selectedTheme]);

  

//   return (
//     <section className="w-full min-h-screen bg-white dark:bg-darkBg transition-colors duration-300">
//       {children}
//     </section>
//   );
// };

// export default ThemeProvider;










// "use client";
// import React, { useEffect, useState } from "react";
// import { useSettingsStore } from "@/app/store/settings.store";

// const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
//   const { selectedTheme } = useSettingsStore();
//   // Client-side only code
//   const [mounted, setMounted] = useState(false);

//   // useEffect only runs on the client, so now we can safely show the UI
//   useEffect(() => {
//     setMounted(true);
//     // Initialize theme on mount
//     const savedTheme = localStorage.getItem("theme") || selectedTheme;
//     applyTheme(savedTheme);
//   }, []);

//   useEffect(() => {
//     if (mounted) {
//       applyTheme(selectedTheme);
//     }
//   }, [selectedTheme, mounted]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = () => {
//       if (selectedTheme === "System") {
//         applyTheme("System");
//       }
//     };
//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, [selectedTheme]);

//   // Prevent flash of incorrect theme
//   if (!mounted) {
//     return <>{children}</>;
//   }

//   return (
//     <>{children}</>
//   );
// };

// export default ThemeProvider;