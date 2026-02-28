import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { getAllDogs, getDogBySlug } from "@/lib/dogs";
import { formatGender, formatSize } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ContactCard from "@/components/ContactCard";

export async function generateStaticParams() {
  return getAllDogs().map((dog) => ({ id: dog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dog = getDogBySlug(id);
  if (!dog) return { title: "Dog not found — wwwoof" };
  return {
    title: `${dog.name} — ${dog.status === "AVAILABLE" ? "Available for adoption" : "Adopted"} | wwwoof`,
    description: dog.description.slice(0, 160),
  };
}

function TraitBadge({ label, value }: { label: string; value: boolean | null }) {
  if (value === null) return null;
  return (
    <div
      className={`flex items-center gap-1.5 text-sm rounded-lg px-3 py-1.5 font-medium ${
        value
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-stone-50 text-stone-500 border border-stone-200"
      }`}
    >
      {value ? (
        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <XCircle className="h-3.5 w-3.5 text-stone-400" />
      )}
      {label}
    </div>
  );
}

export default async function DogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const dog = getDogBySlug(id);

  if (!dog) notFound();

  const images = dog.images.length > 0 ? dog.images : ["/placeholder-dog.jpg"];
  const isAdopted = dog.status === "ADOPTED";

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/dogs"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-800/60 hover:text-amber-600 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all dogs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-5">
          {/* Main image */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-amber-50 shadow-lg shadow-amber-100/60">
            <Image
              src={images[0]}
              alt={dog.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover ${isAdopted ? "grayscale" : ""}`}
            />
            {isAdopted && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40">
                <Badge variant="adopted" className="text-base px-4 py-1.5 font-bold">
                  Already Adopted
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.slice(1).map((src, i) => (
                <div
                  key={i}
                  className="relative h-20 w-24 shrink-0 rounded-xl overflow-hidden bg-amber-50"
                >
                  <Image
                    src={src}
                    alt={`${dog.name} photo ${i + 2}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div>
            <h2 className="text-lg font-extrabold text-brown-900 mb-2">
              About {dog.name}
            </h2>
            <div className="text-brown-800/80 leading-relaxed space-y-3">
              {dog.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div>
            <h2 className="text-lg font-extrabold text-brown-900 mb-3">
              Compatibility
            </h2>
            <div className="flex flex-wrap gap-2">
              <TraitBadge label="Good with kids" value={dog.goodWithKids} />
              <TraitBadge label="Good with dogs" value={dog.goodWithDogs} />
              <TraitBadge label="Good with cats" value={dog.goodWithCats} />
              <TraitBadge label="House trained" value={dog.houseTrained} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Name & location */}
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h1 className="text-3xl font-extrabold text-brown-900">
                {dog.name}
              </h1>
              {dog.vaccinated && (
                <Badge variant="green" className="mt-1 shrink-0">
                  ✓ Vaccinated
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-brown-800/60">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              {dog.area ? `${dog.area}, ${dog.city}` : dog.city}
            </div>
          </div>

          {/* Quick facts grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Breed", value: dog.breed ?? "Mixed / Unknown" },
              { label: "Age", value: dog.age },
              { label: "Gender", value: formatGender(dog.gender) },
              { label: "Size", value: formatSize(dog.size) },
              { label: "Colour", value: dog.color ?? "—" },
              { label: "Neutered", value: dog.neutered ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-amber-50/70 p-3">
                <p className="text-xs text-stone-500 font-semibold uppercase tracking-wide mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-bold text-brown-900">{value}</p>
              </div>
            ))}
          </div>

          {/* Contact / adopted */}
          {!isAdopted ? (
            <ContactCard
              contactName={dog.contactName}
              contactOrg={dog.contactOrg}
              contactPhone={dog.contactPhone}
              contactEmail={dog.contactEmail}
            />
          ) : (
            <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 p-6 text-center space-y-2">
              <p className="text-2xl">🎉</p>
              <p className="font-bold text-brown-900">This dog has found a home!</p>
              <p className="text-sm text-stone-500">
                Check out other dogs still waiting.
              </p>
              <Button asChild variant="outline" className="mt-2">
                <Link href="/dogs">Browse other dogs</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
