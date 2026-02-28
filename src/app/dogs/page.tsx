import { Suspense } from "react";
import { getAllDogs, filterDogs } from "@/lib/dogs";
import DogGrid, { DogGridSkeleton } from "@/components/DogGrid";
import FilterBar from "@/components/FilterBar";

interface SearchParams {
  size?: string;
  gender?: string;
  area?: string;
  vaccinated?: string;
}

function DogsResults({ searchParams }: { searchParams: SearchParams }) {
  const dogs = filterDogs(getAllDogs(), {
    ...searchParams,
    status: "AVAILABLE",
  });

  return (
    <>
      <p className="text-sm text-brown-800/60 mb-4 font-medium">
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
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-brown-900 mb-1">
          Dogs looking for homes
        </h1>
        <p className="text-brown-800/60">
          Every one of these dogs deserves a loving family. Could yours be next?
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <Suspense>
            <FilterBar />
          </Suspense>
        </aside>

        <div className="flex-1 min-w-0">
          <Suspense fallback={<DogGridSkeleton count={6} />}>
            <DogsResults searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
