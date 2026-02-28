import Link from "next/link";
import { PawPrint, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-amber-50/50 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
                <PawPrint className="h-4 w-4" />
              </span>
              <span className="text-xl font-extrabold text-brown-900">
                ww<span className="text-amber-500">woof</span>
              </span>
            </Link>
            <p className="text-sm text-brown-800/70 leading-relaxed">
              Connecting Bangalore&apos;s stray and rescued dogs with loving forever homes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-brown-900 mb-3 text-sm uppercase tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-brown-800/80">
              <li>
                <Link href="/dogs" className="hover:text-amber-600 transition-colors">
                  Browse Dogs
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-amber-600 transition-colors">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          {/* For shelters */}
          <div>
            <h3 className="font-bold text-brown-900 mb-3 text-sm uppercase tracking-wide">
              For Shelters & Clinics
            </h3>
            <p className="text-sm text-brown-800/70 leading-relaxed mb-2">
              Are you a rescue group, shelter, or vet clinic with dogs to rehome?
            </p>
            <a
              href="mailto:hello@wwwoof.in"
              className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              hello@wwwoof.in →
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-amber-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-brown-800/50">
          <p>© 2025 wwwoof. Made with <Heart className="inline h-3 w-3 text-amber-500" /> in Bangalore.</p>
          <p>Starting in Bangalore, growing across India.</p>
        </div>
      </div>
    </footer>
  );
}
