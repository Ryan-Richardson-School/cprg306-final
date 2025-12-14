"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Search() {
     const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (!query.trim()) return;

    router.push(`/results?movie=${encodeURIComponent(query)}`);
  };

    return (    
        <main>
            <div className="flex-col flex h-screen justify-center items-center">
                <div className="flex fixed top-7 text-white w-70 text-2xl justify-center items-center mb-15">
                    <div>
                    <h1 className="rainbow-text text-[70px] underline decoration-white">NCR Movie Watchlist</h1> 
                    </div>
                </div>
                
                <div>
                    <p className="rainbow-text text-[40px]">THIS IS THE SICK ASS SEARCH BAR (Sharknado Only.)</p>
                    <div className="mt-5 text-center flex gap-3">
                        <input type="text" placeholder="Enter Movie Title..." value={query} onChange={(e) => setQuery(e.target.value)} className="border-2 rounded-md pl-2 w-64 rainbow-text text-[30px]"></input>
                        <button onClick={handleSearch} className="border-2 rounded-md pl-2 pr-2 text-center w-24 rainbow-text text-[30px] cursor-pointer">Search</button>
                    </div>
                </div>

            <div className="fixed top-4 right-4 w-25 h-25 rounded-full bg-white flex content-center justify-center">
                    <img src="assets/user.png" alt="Profile" className="w-15 h-20 pt-4"></img>
                </div>
            </div>
        </main>
    );
}