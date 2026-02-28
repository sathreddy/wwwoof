import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatSize, formatGender } from "@/lib/utils";

interface DogCardProps {
  id: string;
  name: string;
  breed: string | null;
  age: string;
  gender: string;
  size: string;
  area: string | null;
  city: string;
  images: string[];
  vaccinated: boolean;
  status: string;
}

export default function DogCard({
  id,
  name,
  breed,
  age,
  gender,
  size,
  area,
  city,
  images,
  vaccinated,
  status,
}: DogCardProps) {
  const imgSrc = images[0] ?? "/placeholder-dog.jpg";
  const isAdopted = status === "ADOPTED";

  return (
    <Link href={`/dogs/${id}`} className="group block focus:outline-none">
      <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-200/50 focus-within:ring-2 focus-within:ring-amber-400">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden bg-amber-50">
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${isAdopted ? "grayscale" : ""}`}
          />
          {isAdopted && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40">
              <Badge variant="adopted" className="text-sm px-3 py-1 font-bold">
                Adopted
              </Badge>
            </div>
          )}
          {vaccinated && !isAdopted && (
            <div className="absolute top-2 right-2">
              <Badge variant="green" className="text-xs">
                ✓ Vaccinated
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="pt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-extrabold text-brown-900 leading-tight group-hover:text-amber-700 transition-colors">
              {name}
            </h3>
            <Badge variant="default" className="shrink-0 text-xs">
              {formatSize(size)}
            </Badge>
          </div>

          {breed && (
            <p className="text-sm text-brown-800/70 font-medium">{breed}</p>
          )}

          <div className="flex flex-wrap gap-2 text-xs text-stone-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {age}
            </span>
            <span>·</span>
            <span>{formatGender(gender)}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-500">
            <MapPin className="h-3 w-3 text-amber-500 shrink-0" />
            <span>{area ? `${area}, ${city}` : city}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function DogCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-card)] overflow-hidden bg-white border border-amber-100 shadow-md shadow-amber-100/60">
      <div className="h-52 w-full bg-amber-100 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-5 w-28 bg-amber-100 animate-pulse rounded" />
          <div className="h-5 w-14 bg-amber-100 animate-pulse rounded-full" />
        </div>
        <div className="h-4 w-20 bg-amber-100 animate-pulse rounded" />
        <div className="h-3 w-32 bg-amber-100 animate-pulse rounded" />
        <div className="h-3 w-24 bg-amber-100 animate-pulse rounded" />
      </div>
    </div>
  );
}
