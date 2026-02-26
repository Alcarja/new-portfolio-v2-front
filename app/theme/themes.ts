export type ThemeName = "regular" | "brutalist" | "pop-art" | "code";

export interface ThemeCss {
  // Colors
  bgPrimary: string;
  bgSecondary: string;
  bgFooter: string;
  bgNavbar: string;
  textPrimary: string;
  textSecondary: string;
  textOnAccent: string;
  borderColor: string;
  accent: string;
  selectionBg: string;
  selectionText: string;

  // Typography
  fontFamily: string;
  headingFontFamily: string;
  headingTransform: string;
  headingWeight: string;
  headingStyle: string;
  letterSpacing: string;

  // Borders
  borderWidth: string;
  borderStyle: string;
  borderRadius: string;

  // Shadows
  shadowPrimary: string;
  shadowAccent: string;

  // Background pattern
  bgPattern: string;
  bgPatternSize: string;

  // Noise overlay
  noiseOpacity: string;

  // Hover behavior
  hoverTransform: string;
  hoverShadow: string;

  // Card treatment
  cardRotation: string;
  cardHoverRotation: string;

  // Navbar
  navbarBlur: string;
}

export interface ThemeThree {
  fogColor: string;
  meshStrokeColor: string;
  ambientIntensity: number;
  fogNear: number;
  fogFar: number;
  strokeScale: number;
  strokeOffset: number;
  pointLightColor: string;
  pointLightIntensity: number;
}

export interface ThemeDefinition {
  name: ThemeName;
  label: string;
  css: ThemeCss;
  three: ThemeThree;
}

export const themes: Record<ThemeName, ThemeDefinition> = {
  regular: {
    name: "regular",
    label: "Minimal",
    css: {
      // Colors — White canvas, deep navy, cool grays
      bgPrimary: "#FFFFFF",
      bgSecondary: "#F7F8FA",
      bgFooter: "#0A1628",
      bgNavbar: "rgba(255, 255, 255, 0.9)",
      textPrimary: "#0A1628",
      textSecondary: "#7A8599",
      textOnAccent: "#FFFFFF",
      borderColor: "#E2E6ED",
      accent: "#1B3A6B",
      selectionBg: "#1B3A6B",
      selectionText: "#FFFFFF",

      // Typography — Soft sans, relaxed, sentence-case
      fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
      headingFontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
      headingTransform: "none",
      headingWeight: "500",
      headingStyle: "normal",
      letterSpacing: "-0.02em",

      // Borders — Soft, rounded
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "16px",

      // Shadows — None
      shadowPrimary: "none",
      shadowAccent: "none",

      // Background — Clean white
      bgPattern: "none",
      bgPatternSize: "0px 0px",

      // Noise — Off
      noiseOpacity: "0",

      // Hover — None
      hoverTransform: "none",
      hoverShadow: "none",

      // Cards — Stable
      cardRotation: "rotate(0deg)",
      cardHoverRotation: "rotate(0deg)",

      // Navbar
      navbarBlur: "blur(12px)",
    },
    three: {
      fogColor: "#FFFFFF",
      meshStrokeColor: "#E2E6ED",
      ambientIntensity: 1.0,
      fogNear: 30,
      fogFar: 70,
      strokeScale: 1.001,
      strokeOffset: 0,
      pointLightColor: "#1B3A6B",
      pointLightIntensity: 0.4,
    },
  },
  brutalist: {
    name: "brutalist",
    label: "Brutalist",
    css: {
      // Colors
      bgPrimary: "#f3f3f3",
      bgSecondary: "#ffffff",
      bgFooter: "#000000",
      bgNavbar: "#f3f3f3",
      textPrimary: "#000000",
      textSecondary: "rgba(0,0,0,0.5)",
      textOnAccent: "#ffffff",
      borderColor: "#000000",
      accent: "#FF3E00",
      selectionBg: "rgba(0,0,0,0.1)",
      selectionText: "#000000",

      // Typography — bold sans, uppercase, tight
      fontFamily: "var(--font-geist-sans), sans-serif",
      headingFontFamily: "var(--font-geist-sans), sans-serif",
      headingTransform: "uppercase",
      headingWeight: "900",
      headingStyle: "normal",
      letterSpacing: "-0.05em",

      // Borders — thick, solid, square
      borderWidth: "3px",
      borderStyle: "solid",
      borderRadius: "0px",

      // Shadows — hard offset, no blur
      shadowPrimary: "6px 6px 0px 0px rgba(0,0,0,1)",
      shadowAccent: "6px 6px 0px 0px #FF3E00",

      // Background — dot grid
      bgPattern:
        "radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)",
      bgPatternSize: "24px 24px",

      // Noise
      noiseOpacity: "0.025",

      // Hover — translate + drop shadow
      hoverTransform: "translate(6px, 6px)",
      hoverShadow: "none",

      // Cards — no rotation
      cardRotation: "rotate(0deg)",
      cardHoverRotation: "rotate(0deg)",

      // Navbar
      navbarBlur: "blur(8px)",
    },
    three: {
      fogColor: "#f3f3f3",
      meshStrokeColor: "#000000",
      ambientIntensity: 1.5,
      fogNear: 25,
      fogFar: 60,
      strokeScale: 1.015,
      strokeOffset: -0.02,
      pointLightColor: "#ffffff",
      pointLightIntensity: 0,
    },
  },

  "pop-art": {
    name: "pop-art",
    label: "Pop Art",
    css: {
      // Colors — loud, saturated, clashing
      bgPrimary: "#FFE600",
      bgSecondary: "#ffffff",
      bgFooter: "#1E00FF",
      bgNavbar: "#FF69B4",
      textPrimary: "#1E00FF",
      textSecondary: "rgba(30,0,255,0.6)",
      textOnAccent: "#ffffff",
      borderColor: "#1E00FF",
      accent: "#FF0050",
      selectionBg: "#FF0050",
      selectionText: "#FFE600",

      // Typography — bold, impact feel
      fontFamily: "var(--font-geist-sans), Impact, sans-serif",
      headingFontFamily: "var(--font-geist-sans), Impact, sans-serif",
      headingTransform: "uppercase",
      headingWeight: "900",
      headingStyle: "normal",
      letterSpacing: "-0.02em",

      // Borders — extra thick, solid, square
      borderWidth: "4px",
      borderStyle: "solid",
      borderRadius: "0px",

      // Shadows — hard offset, colorful
      shadowPrimary: "8px 8px 0px 0px #FF0050",
      shadowAccent: "8px 8px 0px 0px #1E00FF",

      // Background — halftone (bigger dots)
      bgPattern:
        "radial-gradient(circle, rgba(30,0,255,0.12) 3px, transparent 3px)",
      bgPatternSize: "20px 20px",

      // Noise — none, keep it clean and graphic
      noiseOpacity: "0",

      // Hover — translate + drop shadow
      hoverTransform: "translate(8px, 8px)",
      hoverShadow: "none",

      // Cards — slightly tilted, straighten on hover
      cardRotation: "rotate(-1.5deg)",
      cardHoverRotation: "rotate(0deg)",

      // Navbar
      navbarBlur: "blur(4px)",
    },
    three: {
      fogColor: "#FFE600",
      meshStrokeColor: "#1E00FF",
      ambientIntensity: 2.0,
      fogNear: 25,
      fogFar: 60,
      strokeScale: 1.025,
      strokeOffset: -0.03,
      pointLightColor: "#FF0050",
      pointLightIntensity: 0.5,
    },
  },

  code: {
    // Key kept for your types, label updated
    name: "code",
    label: "Terminal",
    css: {
      // Colors — Phosphor Green & Amber on Deep Black
      bgPrimary: "#0D0D0D",
      bgSecondary: "#141414",
      bgFooter: "#050505",
      bgNavbar: "rgba(13, 13, 13, 0.95)",
      textPrimary: "#00FF41", // Matrix Green
      textSecondary: "rgba(0, 255, 65, 0.5)",
      textOnAccent: "#000000",
      borderColor: "#00FF41",
      accent: "#FFB000", // Amber highlight for "Warnings/Alerts"
      selectionBg: "rgba(0, 255, 65, 0.2)",
      selectionText: "#00FF41",

      // Typography — Strictly Monospace
      fontFamily: "'Fira Code', 'Roboto Mono', monospace",
      headingFontFamily: "'Fira Code', 'Roboto Mono', monospace",
      headingTransform: "none", // Code isn't always uppercase
      headingWeight: "600",
      headingStyle: "normal",
      letterSpacing: "-0.01em",

      // Borders — Thin, sharp, and technical
      borderWidth: "1px",
      borderStyle: "solid",
      borderRadius: "2px",

      // Shadows — Subtle glow (Phosphor bleed)
      shadowPrimary: "0 0 8px rgba(0, 255, 65, 0.4)",
      shadowAccent: "0 0 12px rgba(255, 176, 0, 0.3)",

      // Background — Large technical grid
      bgPattern: `linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), 
                  linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)`,
      bgPatternSize: "40px 40px",

      // Noise — Digital grain
      noiseOpacity: "0.1",

      // Hover — "Active Line" effect
      hoverTransform: "translateX(8px)", // Mimics a cursor indent
      hoverShadow: "none",

      // Cards — No rotation, keep it structured
      cardRotation: "rotate(0deg)",
      cardHoverRotation: "rotate(0deg)",

      // Navbar
      navbarBlur: "blur(4px)",
    },
    three: {
      fogColor: "#0D0D0D",
      meshStrokeColor: "#00FF41",
      ambientIntensity: 0.6,
      fogNear: 20,
      fogFar: 50,
      strokeScale: 1.01,
      strokeOffset: -0.01,
      pointLightColor: "#FFB000",
      pointLightIntensity: 0.8,
    },
  },
};
