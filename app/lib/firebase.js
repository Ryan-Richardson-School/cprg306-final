"use client";

import dynamic from "next/dynamic";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider } from "./lib/firebase";

export default function HomePage() {

  const loginWithGithub = async () => {
    await signInWithPopup(auth, githubProvider)
      .then(() => console.log("Logged in"))
      .catch((e) => console.error(e));
  };

  return (
    <main>
      <h1>Login</h1>
      <button onClick={loginWithGithub}>Sign in with GitHub</button>
    </main>
  );
}