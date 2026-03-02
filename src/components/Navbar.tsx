import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b-[3px] border-[#5281a2]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-[family-name:var(--font-display)] text-[#33495f] hover:text-[#5281a2] transition-colors"
        >
          wwwooofff
        </Link>
      </div>
    </header>
  );
}
