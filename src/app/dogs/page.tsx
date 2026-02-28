import { Suspense } from "react";
import { getAllDogs, filterDogs } from "@/lib/dogs";
import DogGrid, { DogGridSkeleton } from "@/components/DogGrid";
import FilterBar from "@/components/FilterBar";

interface SearchParams {
  size?: string;
  gender?: string;
  age?: string;
}

function DogsResults({ searchParams }: { searchParams: SearchParams }) {
  const dogs = filterDogs(getAllDogs(), {
    ...searchParams,
    status: "AVAILABLE",
  });

  return (
    <>
      <p className="text-sm text-[#636363] mb-6 font-medium">
        {dogs.length} {dogs.length === 1 ? "dog" : "dogs"} found
      </p>
      <DogGrid dogs={dogs} />
    </>
  );
}

export default async function DogsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl text-[#222] mb-1 font-[family-name:var(--font-display)]">
          Dogs looking for homes
        </h1>
        <p className="text-[#636363]">
          Every one of these dogs deserves a loving family. Could yours be next?
        </p>
      </div>

      <div className="mb-8">
        <Suspense>
          <FilterBar />
        </Suspense>
      </div>

      <Suspense fallback={<DogGridSkeleton count={6} />}>
        <DogsResults searchParams={params} />
      </Suspense>
    </div>
  );
}
