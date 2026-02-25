"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  themes,
  type ThemeName,
  type ThemeDefinition,
  type ThemeCss,
} from "./themes";

interface ThemeContextValue {
  themeName: ThemeName;
  theme: ThemeDefinition;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeName: "brutalist",
  theme: themes.brutalist,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

const CSS_VAR_MAP: Record<keyof ThemeCss, string> = {
  bgPrimary: "--theme-bg-primary",
  bgSecondary: "--theme-bg-secondary",
  bgFooter: "--theme-bg-footer",
  bgNavbar: "--theme-bg-navbar",
  textPrimary: "--theme-text-primary",
  textSecondary: "--theme-text-secondary",
  textOnAccent: "--theme-text-on-accent",
  borderColor: "--theme-border-color",
  accent: "--theme-accent",
  selectionBg: "--theme-selection-bg",
  selectionText: "--theme-selection-text",
  fontFamily: "--theme-font-family",
  headingFontFamily: "--theme-heading-font-family",
  headingTransform: "--theme-heading-transform",
  headingWeight: "--theme-heading-weight",
  headingStyle: "--theme-heading-style",
  letterSpacing: "--theme-letter-spacing",
  borderWidth: "--theme-border-width",
  borderStyle: "--theme-border-style",
  borderRadius: "--theme-border-radius",
  shadowPrimary: "--theme-shadow-primary",
  shadowAccent: "--theme-shadow-accent",
  bgPattern: "--theme-bg-pattern",
  bgPatternSize: "--theme-bg-pattern-size",
  noiseOpacity: "--theme-noise-opacity",
  hoverTransform: "--theme-hover-transform",
  hoverShadow: "--theme-hover-shadow",
  cardRotation: "--theme-card-rotation",
  cardHoverRotation: "--theme-card-hover-rotation",
  navbarBlur: "--theme-navbar-blur",
};

function getStoredTheme(): ThemeName {
  if (typeof window === "undefined") return "brutalist";
  const stored = localStorage.getItem("portfolio-theme") as ThemeName | null;
  return stored && themes[stored] ? stored : "brutalist";
}

/** Apply CSS variables synchronously (called during init and on change) */
function applyCssVars(name: ThemeName) {
  const root = document.documentElement;
  const css = themes[name].css;
  Object.entries(CSS_VAR_MAP).forEach(([key, varName]) => {
    root.style.setProperty(varName, css[key as keyof ThemeCss]);
  });
  root.setAttribute("data-theme", name);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>(getStoredTheme);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeName(name);
    localStorage.setItem("portfolio-theme", name);
    applyCssVars(name);
  }, []);

  const theme = themes[themeName];

  // Apply CSS variables on mount and when theme changes externally
  useEffect(() => {
    applyCssVars(themeName);
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
