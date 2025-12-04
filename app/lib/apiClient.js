export async function searchMovies(query) {
  if (!query) return { results: [] }
  const res = await fetch(`/api/proxy?q=${encodeURIComponent(query)}`)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API error: ${res.status} ${text}`)
  }
  return res.json()
}

// Add more wrappers here (movie details, discover, etc.) that call server routes.
