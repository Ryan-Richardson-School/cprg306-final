"use client"

import { auth, githubProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

export default function Home() {

  const loginWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      alert("Logged in with GitHub!");
    } catch (error) {
      console.log(error);
      alert("Login failed — check console.");
    }
  }

  return (
    <main style={{ display:"flex", flexDirection:"column", alignItems:"center", marginTop:"50px" }}>
      <h1>Welcome — Sign in Below</h1>
      <button onClick={loginWithGithub} 
        style={{
          padding:"12px 24px",
          marginTop:"20px",
          cursor:"pointer",
          background:"#333",
          color:"#fff",
          borderRadius:"6px"
        }}>
        Login with GitHub
      </button>
    </main>
  );
}