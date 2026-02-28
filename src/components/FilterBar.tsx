"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

const FILTERS = {
  size: {
    label: "Size",
    options: [
      { value: "SMALL", label: "Small" },
      { value: "MEDIUM", label: "Medium" },
      { value: "LARGE", label: "Large" },
      { value: "EXTRA_LARGE", label: "XL" },
    ],
  },
  gender: {
    label: "Gender",
    options: [
      { value: "MALE", label: "Male" },
      { value: "FEMALE", label: "Female" },
    ],
  },
  age: {
    label: "Age",
    options: [
      { value: "PUPPY", label: "Puppy" },
      { value: "YOUNG", label: "Young" },
      { value: "ADULT", label: "Adult" },
      { value: "SENIOR", label: "Senior" },
    ],
  },
} as const;

type FilterKey = keyof typeof FILTERS;

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current: Record<FilterKey, string> = {
    size: searchParams.get("size") ?? "",
    gender: searchParams.get("gender") ?? "",
    age: searchParams.get("age") ?? "",
  };

  const hasFilters = Object.values(current).some(Boolean);

  const toggleFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearFilters = () => router.push(pathname);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {(Object.entries(FILTERS) as [FilterKey, (typeof FILTERS)[FilterKey]][]).map(
        ([key, filter]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#999] uppercase tracking-wide shrink-0">
              {filter.label}
            </span>
            <div className="flex gap-1.5">
              {filter.options.map((option) => {
                const isActive = current[key] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter(key, option.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#C2634E] text-white shadow-sm"
                        : "bg-[#f5f3f0] text-[#666] hover:bg-[#ebe8e4] hover:text-[#444]"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        )
      )}

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 text-xs text-[#636363] hover:text-[#C2634E] transition-colors cursor-pointer"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  );
}
