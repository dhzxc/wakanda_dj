"use client";

import { CSSProperties, ElementType, ReactNode, useEffect, useRef } from "react";

type GlitchTextProps = {
  children: ReactNode;
  text: string;
  as?: ElementType;
  className?: string;
};

export default function GlitchText({ children, text, as: Tag = "span", className = "" }: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const onLevel = (event: Event) => {
      const level = Number((event as CustomEvent<number>).detail);
      if (!Number.isFinite(level)) return;
      element.style.setProperty("--glitch-level", String(Math.min(1, Math.max(0, level))));
    };
    window.addEventListener("wakanda-audio-level", onLevel);
    return () => window.removeEventListener("wakanda-audio-level", onLevel);
  }, []);

  const style = { "--glitch-level": "0.08" } as CSSProperties;
  return <Tag ref={ref} className={`glitch-text ${className}`} data-text={text} style={style}>{children}</Tag>;
}
