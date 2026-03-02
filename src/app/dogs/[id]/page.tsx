import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { getAllDogs, getDogBySlug } from "@/lib/dogs";
import { formatGender, formatSize } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ContactCard from "@/components/ContactCard";
import ImageGallery from "@/components/ImageGallery";

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
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#55677a] hover:text-[#5281a2] transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all dogs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left column */}
        <div className="lg:col-span-3 space-y-5">
          <ImageGallery images={images} name={dog.name} isAdopted={isAdopted} />

          <div>
            <h2 className="text-lg text-[#33495f] mb-2 font-[family-name:var(--font-display)]">
              About {dog.name}
            </h2>
            <div className="text-[#55677a] leading-relaxed space-y-3">
              {dog.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg text-[#33495f] mb-3 font-[family-name:var(--font-display)]">
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
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h1 className="text-3xl text-[#33495f] font-[family-name:var(--font-display)]">
                {dog.name}
              </h1>
              {dog.vaccinated && (
                <Badge variant="green" className="mt-1 shrink-0">
                  ✓ Vaccinated
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#55677a]">
              <MapPin className="h-3.5 w-3.5 text-[#5281a2]" />
              {dog.area ? `${dog.area}, ${dog.city}` : dog.city}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Breed", value: dog.breed ?? "Mixed / Unknown" },
              { label: "Age", value: dog.age },
              { label: "Gender", value: formatGender(dog.gender) },
              { label: "Size", value: formatSize(dog.size) },
              { label: "Colour", value: dog.color ?? "—" },
              { label: "Neutered", value: dog.neutered ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-[#f7f1de] p-3">
                <p className="text-xs text-[#55677a] font-semibold uppercase tracking-wide mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-bold text-[#33495f]">{value}</p>
              </div>
            ))}
          </div>

          {!isAdopted ? (
            <ContactCard
              contactName={dog.contactName}
              contactOrg={dog.contactOrg}
              contactPhone={dog.contactPhone}
              contactEmail={dog.contactEmail}
            />
          ) : (
            <div className="rounded-2xl border-2 border-[#5281a2] bg-[#f7f1de] p-6 text-center space-y-2">
              <p className="text-2xl">🎉</p>
              <p className="font-bold text-[#33495f]">This dog has found a home!</p>
              <p className="text-sm text-[#55677a]">
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
