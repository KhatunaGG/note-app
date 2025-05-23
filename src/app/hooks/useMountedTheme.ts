import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function useMountedTheme() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  return { mounted, theme: resolvedTheme };
}
