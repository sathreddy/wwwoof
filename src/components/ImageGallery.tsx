"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ImageGalleryProps {
  images: string[];
  name: string;
  isAdopted: boolean;
}

export default function ImageGallery({ images, name, isAdopted }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#f9fafb] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
        <Image
          key={images[activeIndex]}
          src={images[activeIndex]}
          alt={name}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
        {isAdopted && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="success" className="text-sm px-3 py-1.5 font-bold">
              Found a home
            </Badge>
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto p-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-24 shrink-0 rounded-xl overflow-hidden bg-[#f9fafb] cursor-pointer transition-opacity ${
                i === activeIndex ? "ring-2 ring-[#C2634E] opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`${name} photo ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
