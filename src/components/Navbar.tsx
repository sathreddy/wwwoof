import Link from "next/link";
import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-white shadow-sm transition-transform group-hover:scale-105">
            <PawPrint className="h-5 w-5" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-brown-900">
            ww<span className="text-amber-500">woof</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-semibold text-brown-800">
          <Link
            href="/dogs"
            className="hover:text-amber-600 transition-colors"
          >
            Browse Dogs
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-amber-600 transition-colors"
          >
            How it works
          </Link>
        </nav>

        {/* CTA */}
        <Button asChild size="sm">
          <Link href="/dogs">Find a Dog</Link>
        </Button>
      </div>
    </header>
  );
}
