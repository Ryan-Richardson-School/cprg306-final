"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Search() {
     const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!query.trim()) return;

    router.push(`/results?movie=${encodeURIComponent(query)}`);
  };

    return (    
        <main>
            <div className="flex mt-4 text-[50px]">
                <Link href="/dashboard" className="flex border-2 rounded-md w-50 h-15 m-auto items-center justify-center rainbow-text fixed top-4 right-4">Go To Dashboard</Link>
            </div>
            <div className="flex-col flex h-screen justify-center items-center">
                <div className="flex fixed top-7 text-white w-70 text-2xl justify-center items-center mb-15">
                    <div>
                    <h1 className="rainbow-text text-[70px] underline decoration-white">NCR Movie Watchlist</h1> 
                    </div>
                </div>
                
                <div className="text-[75px] content-center justify-center flex flex-col items-center">
                    <p className="rainbow-text">THIS IS THE SICK ASS SEARCH BAR (Sharknado Only.)</p>
                    <div className="mt-5 text-center flex gap-3">
                        <input type="text" placeholder="Enter Movie Title..." value={query} onChange={(e) => setQuery(e.target.value)} className="border-2 rounded-md pl-2 w-150 rainbow-text"></input>
                        <button onClick={handleSearch} className="border-2 rounded-md pl-2 pr-2 text-center w-75 rainbow-text cursor-pointer">Search</button>
                    </div>
                </div>
            </div>
        </main>
    );
}