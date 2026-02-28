import Link from "next/link";
import Image from "next/image";
import { Search, Heart, Phone, PawPrint, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DogCard from "@/components/DogCard";
import { getAllDogs } from "@/lib/dogs";

function getFeaturedDogs() {
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

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: "Browse & Filter",
    desc: "Search dogs by size, area, gender, and more. Find a dog that fits your lifestyle.",
  },
  {
    icon: Heart,
    title: "Meet Your Match",
    desc: "Found one you love? Contact the shelter or clinic directly from the dog's profile.",
  },
  {
    icon: PawPrint,
    title: "Give Them a Home",
    desc: "Visit, get to know each other, and welcome a new family member home.",
  },
];

export default async function HomePage() {
  const featuredDogs = await getFeaturedDogs();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-[#fdfaf5] to-amber-50/30">
        {/* Decorative paw prints */}
        <div className="absolute top-8 right-12 opacity-10 text-amber-400 text-7xl select-none pointer-events-none">
          🐾
        </div>
        <div className="absolute bottom-12 left-8 opacity-10 text-amber-400 text-5xl select-none pointer-events-none rotate-12">
          🐾
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold text-amber-700">
                <PawPrint className="h-4 w-4" />
                Bangalore&apos;s dog adoption platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brown-900 leading-tight">
                Find your{" "}
                <span className="text-amber-500 relative">
                  forever
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6 C50 2, 150 2, 198 6"
                      stroke="#F59E0B"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </span>{" "}
                dog in Bangalore
              </h1>

              <p className="text-lg text-brown-800/70 leading-relaxed max-w-lg">
                Every dog here has been rescued or found by a shelter, vet clinic, or rescue group
                in Bangalore. Browse, find your match, and give them the home they deserve.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/dogs">
                    Browse Dogs
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/#how-it-works">How it works</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-brown-800/50 font-medium pt-2">
                <span>🐕 {featuredDogs.length}+ dogs waiting</span>
                <span>📍 Bangalore</span>
                <span>💛 Free to browse</span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative hidden lg:block">
              <div className="relative h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-amber-200/60">
                <Image
                  src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                  alt="Happy dog looking for adoption"
                  fill
                  priority
                  sizes="50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/30 to-transparent" />
                {/* Floating tag */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-2xl bg-white/95 backdrop-blur-sm px-4 py-2.5 shadow-lg">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                    🐶
                  </span>
                  <div>
                    <p className="text-xs text-stone-500 font-medium">Rescued in</p>
                    <p className="text-sm font-extrabold text-brown-900">Koramangala, BLR</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg shadow-amber-300/50">
                <div className="text-center">
                  <p className="text-xs font-bold leading-none">Free</p>
                  <p className="text-xs font-bold leading-none">to adopt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured dogs */}
      {featuredDogs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brown-900">
                Dogs looking for homes
              </h2>
              <p className="text-brown-800/60 mt-1">
                Recently posted — be the first to reach out
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dogs" className="hidden sm:flex items-center gap-1">
                See all dogs <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDogs.map((dog) => (
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

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-gradient-to-b from-amber-50/50 to-transparent"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brown-900 mb-2">
              How it works
            </h2>
            <p className="text-brown-800/60 max-w-md mx-auto">
              Adopting a dog should be simple. Here&apos;s all it takes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-amber-100 shadow-md shadow-amber-100/40"
              >
                <div className="mb-1 text-sm font-extrabold text-amber-300 text-5xl leading-none">
                  {i + 1}
                </div>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
                  <Icon className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-lg font-extrabold text-brown-900 mb-2">{title}</h3>
                <p className="text-sm text-brown-800/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shelter CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-3xl bg-amber-500 px-8 py-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-4 right-8 text-white/10 text-8xl select-none pointer-events-none">🐾</div>
          <div className="absolute bottom-4 left-8 text-white/10 text-6xl select-none pointer-events-none">🐾</div>
          <div className="relative">
            <PawPrint className="h-8 w-8 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Are you a shelter or vet clinic?
            </h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto text-sm leading-relaxed">
              If you rescue dogs or work with strays in Bangalore, we&apos;d love to partner with you.
              Get your dogs in front of thousands of potential adopters.
            </p>
            <a
              href="mailto:hello@wwwoof.in"
              className="inline-flex items-center gap-2 rounded-full bg-white text-amber-700 font-bold px-7 py-3 text-sm hover:bg-amber-50 transition-colors shadow-lg"
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
