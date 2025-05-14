"use client";

import React, { ReactNode, createContext, useContext, useState, useEffect } from "react";
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Theme,
  SSRProvider,
} from "@fluentui/react-components";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: "light",
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

export const FluentThemeProvider = ({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultTheme);
  
  useEffect(() => {
    // Check for saved preference
    const savedTheme = localStorage.getItem("themeMode") as ThemeMode;
    if (savedTheme) {
      setThemeMode(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        setThemeMode("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === "light" ? "dark" : "light";
    setThemeMode(newTheme);
    localStorage.setItem("themeMode", newTheme);
  };

  const theme = themeMode === "light" ? webLightTheme : webDarkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, setThemeMode }}>
      <SSRProvider>
        <FluentProvider 
          theme={theme} 
          style={{ 
            minHeight: '100vh',
            backgroundColor: themeMode === 'dark' ? theme.colorNeutralBackground1 : theme.colorNeutralBackground1,
            color: themeMode === 'dark' ? theme.colorNeutralForeground1 : theme.colorNeutralForeground1
          }}
        >
          {children}
        </FluentProvider>
      </SSRProvider>
    </ThemeContext.Provider>
  );
};

export default FluentThemeProvider;
