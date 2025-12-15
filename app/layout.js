"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import BackgroundAudio from "./components/backgroundAudio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [playMusic, setPlayMusic] = useState(false);

  useEffect(() => {
    // Only allow music if user has logged in (set during login click)
    const shouldPlay = localStorage.getItem("playBackgroundMusic") === "true";
    if (shouldPlay) {
      setPlayMusic(true);
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🎵 Background Music */}
        <BackgroundAudio play={playMusic} />

        {children}
      </body>
    </html>
  );
}