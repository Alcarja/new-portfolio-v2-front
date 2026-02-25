export default function Footer() {
  return (
    <footer
      className="transition-all duration-400"
      style={{
        backgroundColor: "var(--theme-bg-footer)",
        borderTop: `var(--theme-border-width) var(--theme-border-style) var(--theme-border-color)`,
        fontFamily: "var(--theme-font-family)",
      }}
    >
      <div className="max-w-400 mx-auto px-6 py-6 flex justify-between items-center">
        <span
          className="text-[10px] font-bold uppercase tracking-widest opacity-70"
          style={{ color: "var(--theme-text-on-accent)" }}
        >
          Jaime Alcaraz &copy; 2026
        </span>
        <span
          className="text-[10px] font-bold uppercase tracking-widest opacity-70"
          style={{ color: "var(--theme-text-on-accent)" }}
        >
          Built with Next.js + Three.js
        </span>
      </div>
    </footer>
  );
}
