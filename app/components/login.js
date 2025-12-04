"use client";

import { auth, githubProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {

  const loginWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      console.log("Logged in!");
    } catch (error) {
      console.error(error);
      alert("Login failed — check console");
    }
  };

  return (
    <button 
      onClick={loginWithGithub}
      style={{
        padding: "12px 24px",
        background: "#000",
        color: "#fff",
        borderRadius: "6px",
        cursor: "pointer"
      }}>
      Login with GitHub
    </button>
  );
}