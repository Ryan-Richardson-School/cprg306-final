import { NextResponse } from 'next/server'

const TMDB_BASE = 'https://api.themoviedb.org/3'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const q = searchParams.get('q') || ''

    if (!q) {
      return NextResponse.json({ error: 'Missing `q` query parameter' }, { status: 400 })
    }

    const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'TMDb API key not configured on the server' }, { status: 500 })
    }

    const url = `${TMDB_BASE}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      q
    )}&include_adult=false`

    const upstream = await fetch(url)
    const data = await upstream.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Server error', details: String(err) }, { status: 502 })
  }
}
