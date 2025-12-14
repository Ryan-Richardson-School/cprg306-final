"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function Results() {
  const searchParams = useSearchParams();
  const movie = searchParams.get("movie");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movie) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
            movie
          )}&include_adult=false`
        );

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          setError("No results found.");
          setResults([]);
        } else {
          setResults(data.results);
        }
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movie]);

  return (
    <main className="p-10">

      {/* Back to Search */}
      <div className="fixed top-4 right-4">
        <Link
          href="/Search"
          className="border-2 rounded-md px-6 py-3 rainbow-text"
        >
          Go To Search
        </Link>
      </div>

      {/* Title */}
      <h1 className="rainbow-text text-[60px] underline decoration-white mb-6">
        Results for: {movie}
      </h1>

      {/* States */}
      {loading && <p className="rainbow-text text-[30px]">Loading...</p>}
      {error && <p className="text-red-400 text-[30px]">{error}</p>}

      {/* Results */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {results.map((film) => (
          <div
            key={film.id}
            className="border-2 p-4 rounded-md text-center"
          >
            {film.poster_path ? (
              <img
                src={`${IMAGE_BASE}${film.poster_path}`}
                alt={film.title}
                className="w-full h-[350px] object-cover mb-4"
              />
            ) : (
              <div className="h-[350px] flex items-center justify-center border">
                No Image
              </div>
            )}

            <h2 className="rainbow-text text-[20px]">
              {film.title}
            </h2>

            <p className="text-gray-400">
              {film.release_date?.split("-")[0]}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
