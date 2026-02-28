import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGender(gender: string): string {
  return gender === "MALE" ? "Male" : gender === "FEMALE" ? "Female" : "Unknown";
}

export function formatSize(size: string): string {
  const map: Record<string, string> = {
    SMALL: "Small",
    MEDIUM: "Medium",
    LARGE: "Large",
    EXTRA_LARGE: "Extra Large",
  };
  return map[size] ?? size;
}
