import DogCard, { DogCardSkeleton } from "@/components/DogCard";

interface Dog {
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

interface DogGridProps {
  dogs: Dog[];
}

export default function DogGrid({ dogs }: DogGridProps) {
  if (dogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-4">🐾</span>
        <h3 className="text-xl font-bold text-[#33495f] mb-2">No dogs found</h3>
        <p className="text-[#55677a] text-sm max-w-xs">
          Try adjusting your filters — there are plenty of good dogs waiting!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-4">
      {dogs.map((dog) => (
        <DogCard key={dog.id} {...dog} />
      ))}
    </div>
  );
}

export function DogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <DogCardSkeleton key={i} />
      ))}
    </div>
  );
}
