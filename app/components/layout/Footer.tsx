export default function Footer() {
  return (
    <footer className="border-t-[3px] border-black bg-black text-white">
      <div className="max-w-[1600px] mx-auto px-6 py-6 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
          Jaime Alcaraz &copy; 2026
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
          Built with Next.js + Three.js
        </span>
      </div>
    </footer>
  );
}
