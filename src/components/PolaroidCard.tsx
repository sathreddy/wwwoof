import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface PolaroidCardProps {
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

const ROTATIONS = [-2.2, 1.5, -0.8, 2.5, -1.4, 0.6, -1.8, 1.8, -0.4, 2];
const TAPE_ROTATIONS = [3, -2, 1.5, -3.5, 2.5, -1, 4, -2.5, 1, -1.5];

function nameHash(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h) + name.charCodeAt(i);
  }
  return Math.abs(h);
}

export default function PolaroidCard({
  id,
  name,
  images,
  status,
}: PolaroidCardProps) {
  const imgSrc = images[0] ?? "/placeholder-dog.jpg";
  const isAdopted = status === "ADOPTED";
  const hash = nameHash(name);
  const rotation = ROTATIONS[hash % ROTATIONS.length];
  const tapeRotation = TAPE_ROTATIONS[hash % TAPE_ROTATIONS.length];

  return (
    <Link href={`/dogs/${id}`} className="group block focus:outline-none">
      <div
        className="polaroid-frame relative bg-[#faf8f4] p-3.5 pt-3.5 pb-0 shadow-[2px_4px_14px_rgba(0,0,0,0.08)] motion-safe:group-hover:shadow-[3px_8px_24px_rgba(0,0,0,0.14)] motion-safe:group-hover:-translate-y-1"
        style={{ "--r": `${rotation}deg` } as React.CSSProperties}
      >
        {/* Transparent tape */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-20 h-6 rounded-[1px]"
          style={{
            background: "linear-gradient(180deg, rgba(255,254,242,0.65) 0%, rgba(255,252,230,0.45) 100%)",
            boxShadow: "0 0.5px 2px rgba(0,0,0,0.06)",
            rotate: `${tapeRotation}deg`,
          }}
        />

        <div className="relative aspect-square overflow-hidden bg-[#eae7e1]">
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
          />
          {isAdopted && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="success" className="text-xs px-2.5 py-1 font-bold">
                Found a home
              </Badge>
            </div>
          )}
        </div>

        {/* Thick bottom area — classic polaroid */}
        <div className="h-16 flex items-center justify-center px-3">
          <h3 className="text-2xl text-[#333] font-[family-name:var(--font-handwriting)] font-medium leading-tight text-center">
            {name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export function PolaroidCardSkeleton() {
  return (
    <div className="bg-[#faf8f4] p-3 pb-0 shadow-[2px_4px_14px_rgba(0,0,0,0.05)]">
      <div className="aspect-square w-full bg-[#eae7e1] animate-pulse" />
      <div className="h-16 flex items-center justify-center">
        <div className="h-5 w-20 bg-[#eae7e1] animate-pulse rounded" />
      </div>
    </div>
  );
}
