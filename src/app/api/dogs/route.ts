import { NextRequest, NextResponse } from "next/server";
import { getAllDogs, filterDogs } from "@/lib/dogs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const filters = {
    size: searchParams.get("size") ?? undefined,
    gender: searchParams.get("gender") ?? undefined,
    area: searchParams.get("area") ?? undefined,
    vaccinated: searchParams.get("vaccinated") ?? undefined,
    status: searchParams.get("status") ?? "AVAILABLE",
  };

  const dogs = filterDogs(getAllDogs(), filters);
  return NextResponse.json(dogs);
}
