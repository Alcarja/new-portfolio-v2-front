"use client";

import { createContext, useContext, useState } from "react";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

type Mode = "carousel" | "regular";

const ModeContext = createContext<{
  mode: Mode;
  toggle: () => void;
}>({
  mode: "carousel",
  toggle: () => {},
});

export function useMode() {
  return useContext(ModeContext);
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<Mode>("carousel");

  const toggle = () =>
    setMode((prev) => (prev === "carousel" ? "regular" : "carousel"));

  return (
    <ModeContext.Provider value={{ mode, toggle }}>
      <Navbar mode={mode} onToggle={toggle} />
      <main>{children}</main>
      <Footer />
    </ModeContext.Provider>
  );
}
