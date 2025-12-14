"use client";

import { useState } from "react";

export default function TmdbTest() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const testFetch = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=sharknado`
      );

      const data = await res.json();

      if (!data.results) {
        setError("No results returned");
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      setError("Fetch failed");
    }
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>TMDB API Test</h1>

      <button
        onClick={testFetch}
        style={{ border: "1px solid white", padding: 10 }}
      >
        Test TMDB Fetch
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {movies.map((m) => (
          <li key={m.id}>
            {m.title} ({m.release_date?.split("-")[0]})
          </li>
        ))}
      </ul>
    </main>
  );
}