"use client";

import Link from "next/link";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="relative min-h-screen" style={{ padding: "40px" }}>
      <Image
        src="/Assets/Elmo.jpg"
        alt="Background"
        fill
        priority
        className="object-cover -z-10 opacity-30"
      />
      <div className="flex gap-4 fixed top-4 right-4">
        <Link
          href="/Search"
          className="flex border-2 rounded-md px-6 py-3 items-center justify-center rainbow-text text-[40px] w-40"
        >
          Search
        </Link>

        <Link
          href="/account"
          className="flex border-2 rounded-md px-6 py-3 items-center justify-center rainbow-text text-[40px] w-40"
        >
          Account
        </Link>
      </div>

      <div className="text-center items-center justify-center rainbow-text text-[50px] mt-20">
        <h1 className="rainbow-text text-[70px] underline decoration-white">
          NCR Movie Watchlist
        </h1> 
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