"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAudio({ play }) {
  const audioRef = useRef(null);

  const startAudio = async () => {
    if (!audioRef.current) return;

    try {
      audioRef.current.volume = 0.15;
      audioRef.current.loop = true;
      audioRef.current.muted = false;
      await audioRef.current.play();
    } catch (e) {
      console.warn("Audio still blocked");
    }
  };

  useEffect(() => {
    if (play) {
      startAudio();
    }
  }, [play]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/old-runescape-soundtrack-sea-shanty2-made-with-Voicemod.mp3"
        preload="auto"
      />

      {play && (
        <button
          onClick={startAudio}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            padding: "10px 16px",
            background: "#222",
            color: "#fff",
            borderRadius: "6px",
            border: "1px solid white",
            cursor: "pointer",
            zIndex: 9999,
          }}
        >
          🔥🔥🔥 Enable Sound 🔥🔥🔥
        </button>
      )}
    </>
  );
}