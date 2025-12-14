"use client";

import Link from "next/link";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    }
  }, [router]);

  return (
    <main style={{ padding: "40px" }}>
      <div className="flex mt-4 text-[50px]">
          <Link href="/search" className="flex border-2 rounded-md w-50 h-15 m-auto items-center justify-center rainbow-text fixed top-4 right-4">Go To Search</Link>
        </div>
      <div className="text-center items-center justify-center rainbow-text text-[50px]">
        <h1 className="rainbow-text text-[70px] underline decoration-white">NCR Movie Watchlist</h1> 
      </div>
      <div className="flex flex-col items-center justify-center mt-10 gap-5">
        <p className="rainbow-text text-[50px]">Current Watchlist</p>
        <p className="flex border-2 w-350 h-50"></p>
        
        <p className="rainbow-text text-[50px]">Movies you've watched</p>
        <p className="flex border-2 w-350 h-50"></p>
      </div>
    </main>
  );
}