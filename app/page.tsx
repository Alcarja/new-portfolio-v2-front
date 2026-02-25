"use client";

import { AnimatePresence, motion } from "framer-motion";
import HelixRibbon from "./components/helixRibbon";
import RegularPortfolio from "./components/RegularPortfolio";
import { useMode } from "./components/ClientLayout";
import { useTheme } from "./theme/ThemeContext";

export default function Home() {
  const { mode } = useMode();
  const { themeName } = useTheme();

  return (
    <AnimatePresence mode="wait">
      {mode === "carousel" ? (
        <motion.div
          key="carousel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <HelixRibbon />
        </motion.div>
      ) : (
        <motion.div
          key="regular"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <RegularPortfolio activeTheme={themeName} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
