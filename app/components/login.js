"use client";

import { auth, githubProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const loginWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Login failed — check console.");
    }
  };

  return (
    <button
      onClick={loginWithGithub}
      style={{
        padding: "12px 24px",
        marginTop: "20px",
        cursor: "pointer",
        background: "#333",
        color: "#fff",
        borderRadius: "6px",
      }}
    >
      Login with GitHub
    </button>
  );
}