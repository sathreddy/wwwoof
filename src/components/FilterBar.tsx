"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AREAS = [
  "Koramangala",
  "Indiranagar",
  "HSR Layout",
  "Whitefield",
  "Jayanagar",
  "Marathahalli",
  "Bannerghatta",
  "Yelahanka",
  "Electronic City",
  "Banashankari",
];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = {
    size: searchParams.get("size") ?? "",
    gender: searchParams.get("gender") ?? "",
    area: searchParams.get("area") ?? "",
    vaccinated: searchParams.get("vaccinated") ?? "",
  };

  const hasFilters = Object.values(current).some(Boolean);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-brown-900">
          <SlidersHorizontal className="h-4 w-4 text-amber-500" />
          Filter dogs
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-stone-500 h-7 px-2 hover:text-amber-700"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Size */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500 uppercase tracking-wide">
            Size
          </label>
          <Select
            value={current.size || "all"}
            onValueChange={(v) => updateFilter("size", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any size</SelectItem>
              <SelectItem value="SMALL">Small</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="LARGE">Large</SelectItem>
              <SelectItem value="EXTRA_LARGE">Extra Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500 uppercase tracking-wide">
            Gender
          </label>
          <Select
            value={current.gender || "all"}
            onValueChange={(v) => updateFilter("gender", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any gender</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="UNKNOWN">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Area */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500 uppercase tracking-wide">
            Area
          </label>
          <Select
            value={current.area || "all"}
            onValueChange={(v) => updateFilter("area", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any area</SelectItem>
              {AREAS.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vaccinated */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-stone-500 uppercase tracking-wide">
            Vaccination
          </label>
          <Select
            value={current.vaccinated || "all"}
            onValueChange={(v) => updateFilter("vaccinated", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="true">Vaccinated ✓</SelectItem>
              <SelectItem value="false">Not yet vaccinated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {hasFilters && (
        <div className="pt-1 border-t border-amber-100">
          <p className="text-xs text-amber-700 font-semibold">
            Filters active — showing matching dogs
          </p>
        </div>
      )}
    </div>
  );
}
