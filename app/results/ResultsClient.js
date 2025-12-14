"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResultsClient() {
  const searchParams = useSearchParams();
  const movie = searchParams.get("movie");

  return (
    <main className="p-10">
      <div className="flex mt-4 text-[50px]">
        <Link
          href="/Search"
          className="flex border-2 rounded-md w-50 h-15 m-auto items-center justify-center rainbow-text fixed top-4 right-4"
        >
          Go To Search
        </Link>
      </div>

      <div className="text-center items-center justify-center rainbow-text text-[50px]">
        <h1 className="rainbow-text text-[70px] underline decoration-white">
          NCR Movie Watchlist
        </h1>
      </div>

      <div>
        <h1 className="rainbow-text text-[50px]">
          Results for: {movie}
        </h1>
        <p className="flex border-2 w-410 h-150"></p>
      </div>
    </main>
  );
}
