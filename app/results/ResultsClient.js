"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const movieQuery = searchParams.get("movie");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieQuery) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(
            movieQuery
          )}&include_adult=false`
        );

        const data = await res.json();

        if (!data.results || data.results.length === 0) {
          setError("No results found.");
          setResults([]);
        } else {
          setResults(data.results);
        }
      } catch {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieQuery]);

  const addToWatchlist = async (movie) => {
    if (!auth.currentUser) {
      alert("You must be logged in.");
      return;
    }

    await setDoc(
      doc(db, "users", auth.currentUser.uid, "watchlist", movie.id.toString()),
      {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        releaseDate: movie.release_date,
        addedAt: new Date(),
      }
    );

    alert("Added to watchlist!");
  };

  return (
    <main className="p-10">

      <div className="fixed top-4 right-4">
        <Link href="/Search" className="border-2 rounded-md px-6 py-3 rainbow-text">
          Go To Search
        </Link>
      </div>

      <h1 className="rainbow-text text-[60px] underline decoration-white mb-6">
        Results for: {movieQuery}
      </h1>

      {loading && <p className="rainbow-text text-[30px]">Loading...</p>}
      {error && <p className="text-red-400 text-[30px]">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        {results.map((movie) => (
          <div key={movie.id} className="border-2 p-4 rounded-md text-center">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE}${movie.poster_path}`}
                className="w-full h-[350px] object-cover mb-4"
              />
            ) : (
              <div className="h-[350px] border flex items-center justify-center">
                No Image
              </div>
            )}

            <h2 className="rainbow-text text-[20px]">{movie.title}</h2>
            <p className="text-gray-400 mb-3">
              {movie.release_date?.split("-")[0]}
            </p>

            <button
              onClick={() => addToWatchlist(movie)}
              className="border-2 rounded-md px-4 py-1 rainbow-text"
            >
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
