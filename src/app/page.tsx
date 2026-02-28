import Link from "next/link";
import { Phone, PawPrint, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DogCard from "@/components/DogCard";
import { getAllDogs } from "@/lib/dogs";

function getAvailableDogs() {
  return getAllDogs()
    .filter((d) => d.status === "AVAILABLE")
    .slice(0, 6)
    .map((d) => ({
      id: d.slug,
      name: d.name,
      breed: d.breed,
      age: d.age,
      gender: d.gender,
      size: d.size,
      area: d.area,
      city: d.city,
      images: d.images,
      vaccinated: d.vaccinated,
      status: d.status,
    }));
}

function getSuccessStories() {
  return getAllDogs()
    .filter((d) => d.status === "ADOPTED")
    .slice(0, 3)
    .map((d) => ({
      id: d.slug,
      name: d.name,
      breed: d.breed,
      age: d.age,
      gender: d.gender,
      size: d.size,
      area: d.area,
      city: d.city,
      images: d.images,
      vaccinated: d.vaccinated,
      status: d.status,
    }));
}

export default async function HomePage() {
  const availableDogs = await getAvailableDogs();
  const successStories = await getSuccessStories();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#f9fafb] px-4 py-1.5 text-sm font-bold text-[#025f4c] mb-6">
          <PawPrint className="h-4 w-4" aria-hidden="true" />
          Adopt, don&apos;t shop
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-[#222] leading-tight mb-6 font-[family-name:var(--font-display)]">
          Bring home a bundle of love.
        </h1>

        <p className="text-lg text-[#666] leading-relaxed max-w-xl mx-auto">
          We connect Bangalore&apos;s shelters, vet clinics, and rescue groups with people
          ready to give a rescued dog their forever home.
        </p>
      </section>

      {/* Available dogs */}
      {availableDogs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl text-[#222] font-[family-name:var(--font-display)]">
                Looking for a home
              </h2>
              <p className="text-[#636363] mt-1">
                Recently posted — be the first to reach out
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dogs" className="hidden sm:flex items-center gap-1">
                See all dogs <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-4">
            {availableDogs.map((dog) => (
              <DogCard key={dog.id} {...dog} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/dogs">See all dogs</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Success stories */}
      {successStories.length > 0 && (
        <section
          id="success-stories"
          className="bg-[#f9fafb]"
        >
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
                <DogCard key={dog.id} {...dog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Shelter CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-[#025f4c] px-8 py-12 text-center text-white relative overflow-hidden">
          <div className="relative">
            <PawPrint className="h-8 w-8 mx-auto mb-4 opacity-80" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl mb-3 font-[family-name:var(--font-display)]">
              Are you a shelter or vet clinic?
            </h2>
            <p className="text-white/90 mb-6 max-w-md mx-auto text-sm leading-relaxed">
              If you rescue dogs or work with strays in Bangalore, we&apos;d love to partner with you.
              Get your dogs in front of thousands of potential adopters.
            </p>
            <a
              href="mailto:hello@wwwoof.in"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#025f4c] font-bold px-7 py-3 text-sm hover:bg-[#f9fafb] transition-colors shadow-lg"
            >
              <Phone className="h-4 w-4" />
              Get in touch — hello@wwwoof.in
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
