"use client";

import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import Image from "next/image";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return <p className="p-10">Loading account...</p>;
  }

  return (
    <main className="p-10 flex flex-col items-center gap-6">
      <div className="fixed top-4 right-4 flex gap-4 text-[40px]">
        <Link
          href="/dashboard"
          className="border px-6 py-3 rounded rainbow-text"
        >
          Dashboard
        </Link>

        <button
          onClick={() => {
            signOut(auth);
            router.push("/");
          }}
          className="border px-6 py-3 rounded rainbow-text"
        >
          Logout
        </button>
      </div>

      <h1 className="rainbow-text text-[60px] underline decoration-white">
        Account
      </h1>

      <img
        src={user.photoURL}
        alt="GitHub Avatar"
        className="w-40 h-40 rounded-full border-4"
      />

      <h2 className="rainbow-text text-[40px]">
        {user.displayName}
      </h2>

      {user.email && (
        <p className="text-gray-400 text-xl">
          {user.email}
        </p>
      )}
    </main>
  );
}