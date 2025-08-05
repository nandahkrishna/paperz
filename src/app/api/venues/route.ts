import { NextResponse } from "next/server";
import { getVenues } from "@/lib/actions/venues";

export async function GET() {
  try {
    const venues = await getVenues();
    return NextResponse.json({
      success: true,
      count: venues.length,
      venues,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Error fetching venues:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch venues",
      },
      { status: 500 },
    );
  }
}
