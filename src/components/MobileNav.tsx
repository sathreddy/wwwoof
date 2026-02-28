"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex items-center justify-center h-10 w-10 rounded-lg text-[#444] hover:bg-[#f5f3f0] transition-colors cursor-pointer"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-black/[0.04] shadow-sm">
          <nav className="flex flex-col px-4 py-3 gap-1">
            <Link
              href="/#success-stories"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#444] hover:bg-[#f5f3f0] transition-colors"
            >
              Success Stories
            </Link>
            <Link
              href="/dogs"
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-lg text-sm font-semibold text-[#444] hover:bg-[#f5f3f0] transition-colors"
            >
              Browse Dogs
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
