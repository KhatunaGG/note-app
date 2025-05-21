// "use client"
// import { ThemeProvider } from "next-themes"
// export function Providers({children}: {children: React.ReactNode}) {
//     return <ThemeProvider attribute="class" defaultTheme="System" enableSystem>{children} </ThemeProvider>
// }



// "use client";
// import { ThemeProvider } from "next-themes";

// export function Providers({ children }: { children: React.ReactNode } ) {
//   return (
//     <ThemeProvider 
//       attribute="class" 
//       defaultTheme="system" 
//       enableSystem 
//       disableTransitionOnChange={false}
//     >
//       {children}
//     </ThemeProvider>
//   );
// }




// app/theme/Providers.tsx
"use client";

import { ThemeProvider } from "next-themes";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"         // Applies theme class (e.g., "dark") to the <body> or <html>
      defaultTheme="system"     // Use system theme by default
      enableSystem={true}       // Enable system preference detection
      disableTransitionOnChange={true} // Prevents layout shift on theme change
    >
      {children}
    </ThemeProvider>
  );
}
