"use client";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("./Scene3DCanvas"), { ssr: false, loading: () => <div className="scene-fallback" /> });
export default function Scene3D() { return <Scene />; }
