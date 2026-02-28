import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#eee] bg-white mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#636363]">
        <p>© 2025 wwwoof. Made with <Heart className="inline h-3 w-3 text-[#C2634E]" aria-hidden="true" /> in Bangalore.</p>
        <p>Starting in Bangalore, growing across India.</p>
      </div>
    </footer>
  );
}
