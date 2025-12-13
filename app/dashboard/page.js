"use client";

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
      <h1>Dashboard</h1>
      <p>You are logged in 🎉</p>
    </main>
  );
}