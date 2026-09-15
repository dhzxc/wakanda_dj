"use client";

import { useEffect } from "react";

export default function MotionEnhancements() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    document.documentElement.dataset.reducedMotion = String(reduceMotion.matches);
    let scrollFrame = 0;
    const updateScrollProgress = () => {
      scrollFrame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / maxScroll)));
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollProgress);
    };
    updateScrollProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onMotionChange = () => {
      document.documentElement.dataset.reducedMotion = String(reduceMotion.matches);
    };
    reduceMotion.addEventListener?.("change", onMotionChange);

    // Native reveal observer keeps the interaction layer dependency-free and avoids hydration layout shifts.
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll<HTMLElement>(".reveal, .stagger-group").forEach((element) => revealObserver.observe(element));

    const finePointer = window.matchMedia("(pointer: fine)");
    const cursor = document.querySelector<HTMLElement>(".cursor");
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    // Custom cursor and magnetic behavior are opt-in for fine pointers, never blocking touch or keyboard input.
    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("a, button, [data-magnetic]");
      target?.classList.add("cursor-hover");
    };
    const onPointerOut = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("a, button, [data-magnetic]");
      target?.classList.remove("cursor-hover");
    };
    const magnetic = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magneticMove = (event: PointerEvent) => {
      const element = event.currentTarget as HTMLElement;
      if (reduceMotion.matches) return;
      const rect = element.getBoundingClientRect();
      element.style.transform = `translate3d(${(event.clientX - rect.left - rect.width / 2) * 0.12}px, ${(event.clientY - rect.top - rect.height / 2) * 0.12}px, 0)`;
    };
    const magneticLeave = (event: PointerEvent) => ((event.currentTarget as HTMLElement).style.transform = "");
    if (finePointer.matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerover", onPointerOver);
      document.addEventListener("pointerout", onPointerOut);
      magnetic.forEach((element) => {
        element.addEventListener("pointermove", magneticMove);
        element.addEventListener("pointerleave", magneticLeave);
      });
    }
    return () => {
      revealObserver.disconnect();
      reduceMotion.removeEventListener?.("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      magnetic.forEach((element) => {
        element.removeEventListener("pointermove", magneticMove);
        element.removeEventListener("pointerleave", magneticLeave);
      });
    };
  }, []);

  return <div className="cursor" aria-hidden="true" />;
}
