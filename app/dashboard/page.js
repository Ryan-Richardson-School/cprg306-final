"use client";

import Link from "next/link";
import { auth, db } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function Dashboard() {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const snapshot = await getDocs(
          collection(db, "users", auth.currentUser.uid, "watchlist")
        );

        const movies = snapshot.docs.map(doc => doc.data());
        setWatchlist(movies);
      } catch (error) {
        console.error("Failed to load watchlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [router]);

  return (
    <main style={{ padding: "40px" }}>
        <Image
          src="/Assets/Elmo.jpg"
          alt="Background"
          fill
          priority
          className="object-cover -z-10 opacity-30"
        />

      <div className="fixed top-4 right-4 flex gap-4 text-[40px]">
        <Link
          href="/Search"
          className="flex border-2 rounded-md px-6 py-3 items-center justify-center rainbow-text"
        >
          Go To Search
        </Link>

        <Link
          href="/account"
          className="flex border-2 rounded-md px-6 py-3 items-center justify-center rainbow-text"
        >
          Account
        </Link>
      </div>

      <div className="text-center items-center justify-center rainbow-text text-[50px]">
        <h1 className="rainbow-text text-[70px] underline decoration-white">
          NCR Movie Watchlist
        </h1>
      </div>

      <div className="mt-12">
        <p className="rainbow-text text-[50px] mb-6 text-center">
          Current Watchlist
        </p>

        {loading && (
          <p className="rainbow-text text-center text-[30px]">
            Loading watchlist...
          </p>
        )}

        {!loading && watchlist.length === 0 && (
          <p className="text-gray-400 text-center text-[30px]">
            Your watchlist is empty.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {watchlist.map(movie => (
            <div
              key={movie.id}
              className="border-2 p-4 rounded-md text-center"
            >
              {movie.poster && (
                <img
                  src={`${IMAGE_BASE}${movie.poster}`}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover mb-3"
                />
              )}

              <p className="rainbow-text text-[20px]">
                {movie.title}
              </p>

              <p className="text-gray-400">
                {movie.releaseDate?.split("-")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}