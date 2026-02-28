import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Dog {
  slug: string;
  id: string; // alias for slug — used by components as the URL key
  name: string;
  breed: string | null;
  age: string;
  gender: "MALE" | "FEMALE" | "UNKNOWN";
  size: "SMALL" | "MEDIUM" | "LARGE" | "EXTRA_LARGE";
  color: string | null;
  description: string;
  status: "AVAILABLE" | "ADOPTED";
  city: string;
  area: string | null;
  images: string[];
  vaccinated: boolean;
  neutered: boolean;
  goodWithKids: boolean | null;
  goodWithDogs: boolean | null;
  goodWithCats: boolean | null;
  houseTrained: boolean | null;
  contactName: string;
  contactOrg: string;
  contactPhone: string;
  contactEmail: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "dogs");

function parseBool(val: unknown): boolean | null {
  if (val === true || val === "true") return true;
  if (val === false || val === "false") return false;
  return null;
}

export function getAllDogs(): Dog[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
      const { data, content } = matter(raw);

      return {
        slug,
        id: slug,
        name: data.name ?? slug,
        breed: data.breed ?? null,
        age: data.age ?? "",
        gender: data.gender ?? "UNKNOWN",
        size: data.size ?? "MEDIUM",
        color: data.color ?? null,
        description: content.trim(),
        status: data.status ?? "AVAILABLE",
        city: data.city ?? "Bangalore",
        area: data.area ?? null,
        images: Array.isArray(data.images) ? data.images : [],
        vaccinated: data.vaccinated === true,
        neutered: data.neutered === true,
        goodWithKids: parseBool(data.goodWithKids),
        goodWithDogs: parseBool(data.goodWithDogs),
        goodWithCats: parseBool(data.goodWithCats),
        houseTrained: parseBool(data.houseTrained),
        contactName: data.contactName ?? "",
        contactOrg: data.contactOrg ?? "",
        contactPhone: data.contactPhone ?? "",
        contactEmail: data.contactEmail ?? "",
      } satisfies Dog;
    })
    .sort((a, b) => {
      // Available first, then adopted; within each group, alphabetical by name
      if (a.status === b.status) return a.name.localeCompare(b.name);
      return a.status === "AVAILABLE" ? -1 : 1;
    });
}

export function getDogBySlug(slug: string): Dog | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    id: slug,
    name: data.name ?? slug,
    breed: data.breed ?? null,
    age: data.age ?? "",
    gender: data.gender ?? "UNKNOWN",
    size: data.size ?? "MEDIUM",
    color: data.color ?? null,
    description: content.trim(),
    status: data.status ?? "AVAILABLE",
    city: data.city ?? "Bangalore",
    area: data.area ?? null,
    images: Array.isArray(data.images) ? data.images : [],
    vaccinated: data.vaccinated === true,
    neutered: data.neutered === true,
    goodWithKids: parseBool(data.goodWithKids),
    goodWithDogs: parseBool(data.goodWithDogs),
    goodWithCats: parseBool(data.goodWithCats),
    houseTrained: parseBool(data.houseTrained),
    contactName: data.contactName ?? "",
    contactOrg: data.contactOrg ?? "",
    contactPhone: data.contactPhone ?? "",
    contactEmail: data.contactEmail ?? "",
  };
}

function parseAgeToMonths(age: string): number {
  const match = age.match(/([\d.]+)\s*(year|month|week)/i);
  if (!match) return 0;
  const val = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  if (unit.startsWith("year")) return val * 12;
  if (unit.startsWith("month")) return val;
  if (unit.startsWith("week")) return val / 4;
  return 0;
}

export function getAgeCategory(age: string): string {
  const months = parseAgeToMonths(age);
  if (months < 12) return "PUPPY";
  if (months <= 36) return "YOUNG";
  if (months <= 84) return "ADULT";
  return "SENIOR";
}

export interface FilterOptions {
  size?: string;
  gender?: string;
  age?: string;
  area?: string;
  vaccinated?: string;
  status?: string;
}

export function filterDogs(dogs: Dog[], filters: FilterOptions): Dog[] {
  return dogs.filter((dog) => {
    if (filters.status && dog.status !== filters.status) return false;
    if (filters.size && dog.size !== filters.size) return false;
    if (filters.gender && dog.gender !== filters.gender) return false;
    if (filters.age && getAgeCategory(dog.age) !== filters.age) return false;
    if (filters.area && dog.area !== filters.area) return false;
    if (filters.vaccinated === "true" && !dog.vaccinated) return false;
    if (filters.vaccinated === "false" && dog.vaccinated) return false;
    return true;
  });
}
