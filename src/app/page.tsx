import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import DogCard from "@/components/DogCard";
import { DogGridSkeleton } from "@/components/DogGrid";
import RotatingWord from "@/components/RotatingWord";
import AsciiBackground from "@/components/AsciiBackground";
import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { getAllDogs, filterDogs } from "@/lib/dogs";

const PER_PAGE = 6;

interface SearchParams {
  size?: string;
  gender?: string;
  age?: string;
  page?: string;
}

function FoundStrayCard() {
  return (
    <a
      href="mailto:hello@wwwoof.in?subject=I%20found%20a%20dog"
      className="group block focus:outline-none"
    >
      <div
        className="polaroid-frame relative bg-[#faf8f4] p-3.5 pt-3.5 pb-0 shadow-[2px_4px_14px_rgba(0,0,0,0.08)] motion-safe:group-hover:shadow-[3px_8px_24px_rgba(0,0,0,0.14)] motion-safe:group-hover:-translate-y-1"
        style={{ "--r": "1.8deg" } as React.CSSProperties}
      >
        <div
          className="polaroid-tape absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-20 h-6"
          style={{ rotate: "-2.5deg" }}
        />

        <div className="relative aspect-square overflow-hidden bg-[#C2634E] flex flex-col items-center justify-center px-6 text-center">
          <MessageCircle className="h-10 w-10 text-white/80 mb-4" />
          <p className="text-xl text-white font-[family-name:var(--font-display)] leading-snug mb-2">
            Found a stray that needs a home?
          </p>
          <p className="text-sm text-white/75 leading-relaxed">
            Tell us about them and we&apos;ll help find them a family.
          </p>
        </div>

        <div className="h-16 flex items-center justify-center px-3">
          <span className="text-2xl text-[#333] font-[family-name:var(--font-handwriting)] font-medium leading-tight text-center">
            Tell us!
          </span>
        </div>
      </div>
    </a>
  );
}

function DogsSection({ searchParams }: { searchParams: SearchParams }) {
  const allAvailable = filterDogs(getAllDogs(), {
    ...searchParams,
    status: "AVAILABLE",
  });

  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allAvailable.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = allAvailable.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const successStories = getAllDogs()
    .filter((d) => d.status === "ADOPTED")
    .slice(0, 3);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl text-[#222] font-[family-name:var(--font-display)]">
            Dogs looking for homes
          </h2>
          <p className="text-[#636363] mt-1">
            Every one of these dogs deserves a loving family. Could yours be next?
          </p>
        </div>

        <div className="mb-8">
          <FilterBar />
        </div>

        <p className="text-sm text-[#636363] mb-6 font-medium">
          {allAvailable.length} {allAvailable.length === 1 ? "dog" : "dogs"} found
        </p>

        {paged.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-4">
              {paged.map((dog) => (
                <DogCard
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  breed={dog.breed}
                  age={dog.age}
                  gender={dog.gender}
                  size={dog.size}
                  area={dog.area}
                  city={dog.city}
                  images={dog.images}
                  vaccinated={dog.vaccinated}
                  status={dog.status}
                />
              ))}
              <FoundStrayCard />
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-6xl mb-4">🐾</span>
            <h3 className="text-xl font-bold text-[#222] mb-2">No dogs found</h3>
            <p className="text-[#636363] text-sm max-w-xs">
              Try adjusting your filters — there are plenty of good dogs waiting!
            </p>
          </div>
        )}
      </section>

      {successStories.length > 0 && (
        <section id="success-stories" className="bg-[#f9fafb]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl text-[#222] font-[family-name:var(--font-display)]">
                Found a home
              </h2>
              <p className="text-[#636363] mt-1">
                These dogs found their forever families through wwwoof
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-4">
              {successStories.map((dog) => (
                <DogCard
                  key={dog.id}
                  id={dog.id}
                  name={dog.name}
                  breed={dog.breed}
                  age={dog.age}
                  gender={dog.gender}
                  size={dog.size}
                  area={dog.area}
                  city={dog.city}
                  images={dog.images}
                  vaccinated={dog.vaccinated}
                  status={dog.status}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <AsciiBackground />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#222] leading-tight mb-4 font-[family-name:var(--font-display)]">
            Bring home a bundle of <RotatingWord />.
          </h1>

          <p className="text-lg text-[#444] font-medium leading-relaxed max-w-xl mx-auto">
            Somewhere in Bangalore, there&apos;s a dog that already loves you.
            You just haven&apos;t met yet.
          </p>
        </div>
      </section>

      {/* Dogs listing */}
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-16"><DogGridSkeleton count={6} /></div>}>
        <DogsSection searchParams={params} />
      </Suspense>
    </>
  );
}
