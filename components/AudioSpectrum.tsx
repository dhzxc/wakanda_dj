"use client";

import { useEffect, useState } from "react";

const BAR_COUNT = 36;

export default function AudioSpectrum({ compact = false }: { compact?: boolean }) {
  const [level, setLevel] = useState(0.08);

  useEffect(() => {
    const onLevel = (event: Event) => {
      const value = Number((event as CustomEvent<number>).detail);
      setLevel(Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0.08);
    };
    window.addEventListener("wakanda-audio-level", onLevel);
    return () => window.removeEventListener("wakanda-audio-level", onLevel);
  }, []);

  return (
    <div className={`audio-spectrum${compact ? " audio-spectrum-compact" : ""}`} aria-hidden="true">
      {Array.from({ length: BAR_COUNT }, (_, index) => {
        const wave = (Math.sin(index * 0.72 + level * 11) + 1) / 2;
        const response = compact ? level * 34 + wave * level * 24 : level * 25 + wave * level * 16;
        const height = 3 + response;
        return <i key={index} style={{ height: `${height}px`, opacity: 0.4 + level * 0.6 }} />;
      })}
    </div>
  );
}
