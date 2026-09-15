"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "./ThemeProvider";

type Side = "left" | "right";
type ArrowDirection = "up" | "down";

const notes = ["♪", "♫", "♬", "♩", "♪", "♫", "♬"];
const arrowPaths = [
  "M60 10 L98 72 L78 72 L78 168 L42 168 L42 72 L22 72 Z M48 168 L60 192 L72 168 Z",
  "M60 18 L86 58 L72 58 L72 128 L48 128 L48 58 L34 58 Z M47 128 L60 148 L73 128 Z",
  "M60 24 L80 54 L70 54 L70 112 L50 112 L50 54 L40 54 Z M49 112 L60 128 L71 112 Z",
];
const gradients = [
  ["#ff4500", "#b026ff", "#4a7cff"],
  ["#ff006e", "#ff5fd7", "#4a7cff"],
  ["#7b2fff", "#ff4500", "#ffd4c8"],
];

function Arrow({ side, index, direction }: { side: Side; index: number; direction: ArrowDirection }) {
  const uid = useId().replace(/:/g, "");
  const [first, second, third] = gradients[index % gradients.length];
  const path = arrowPaths[index % arrowPaths.length];
  const rotate = direction === "up" ? 180 : 0;

  return (
    <svg
      className={`side-rail-arrow side-rail-arrow-${side} side-rail-arrow-${index}`}
      viewBox="0 0 120 200"
      aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <defs>
        <linearGradient id={`${uid}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={first} />
          <stop offset="50%" stopColor={second} />
          <stop offset="100%" stopColor={third} />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={path} fill={`url(#${uid}-gradient)`} stroke="#050505" strokeWidth="8" strokeLinejoin="round" paintOrder="stroke fill" filter={`url(#${uid}-glow)`} />
    </svg>
  );
}

function Rail({ side }: { side: Side }) {
  const { theme } = useTheme();
  const direction: ArrowDirection = side === "left" ? "down" : "up";
  return (
    <div className={`side-rail side-rail-${side}`}>
      <button className="side-rail-label" type="button" onClick={() => window.scrollBy({ top: direction === "down" ? window.innerHeight * 0.82 : -window.innerHeight * 0.82, behavior: "smooth" })}>
        <strong>SCROLL</strong>
        <strong>{direction === "down" ? "DOWN" : "UP"}</strong>
      </button>
      <div className={`side-rail-arrows side-rail-arrows-${theme}`}>
        {arrowPaths.map((_, index) => <Arrow key={index} side={side} index={index} direction={direction} />)}
      </div>
      {theme === "light" && <div className="side-rail-sketches" aria-hidden="true">{[0, 1, 2, 3, 4].map((index) => <i key={index} />)}</div>}
      <div className="side-rail-notes" aria-hidden="true">
        {notes.map((note, index) => <span key={`${note}-${index}`} className={`side-rail-note side-rail-note-${index}`}>{note}</span>)}
      </div>
    </div>
  );
}

export default function SideScrollControls() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => {
      setActive(window.scrollY > 48);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => { window.removeEventListener("scroll", sync); window.removeEventListener("resize", sync); };
  }, []);

  return <aside className={`side-rail-controls${active ? " side-rail-controls-active" : ""}`} aria-label="Page scroll controls"><Rail side="left" /><Rail side="right" /></aside>;
}
