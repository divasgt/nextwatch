import { NextResponse } from 'next/server';
import { fetchFromTmdb } from '@/lib/tmdb';

export async function GET(
  request: Request,
  context: any
) {
  const params = await context.params
  // params.media is an array of the path segments
  const endpoint = "/" + params.media.join("/")
  const url = new URL(request.url)
  const { searchParams } = url
  // searchParams.entries gives list of key value pairs like [['page', '2'], ['sort', 'popularity']]
  const queryObj = Object.fromEntries(searchParams.entries())

  // (Optional) Security Allowlist - Prevent users from accessing endpoints you don't want exposed (like account info)
  const allowedSegments = ["movie", "tv", "search", "person", "genre", "trending"];
  if (!allowedSegments.includes(params.media[0])) {
    return NextResponse.json({ error: "Invalid endpoint" }, { status: 403 });
  }

  try {
    const data = await fetchFromTmdb(endpoint, queryObj)
    return NextResponse.json(data)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return NextResponse.json(
      { error: `Failed to fetch data for endpoint: ${endpoint}, ${errorMessage}` },
      { status: 500 }
    )
  }
}
