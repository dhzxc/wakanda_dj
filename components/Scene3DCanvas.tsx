"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type SceneProps = { mobile?: boolean };

function Roof({ position, scale = 1, mobile = false }: { position: [number, number, number]; scale?: number; mobile?: boolean }) {
  return <group position={position} scale={scale}>
    <mesh rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[.68, 2.15, mobile ? 4 : 6]} /><meshStandardMaterial color="#171214" metalness={.5} roughness={.46} /></mesh>
    <mesh position={[0, -.1, 0]}><boxGeometry args={[1.75, .08, .5]} /><meshStandardMaterial color="#b62d1e" emissive="#3a0905" emissiveIntensity={.7} /></mesh>
    <mesh position={[-.94, -.04, 0]} rotation={[0, 0, -.12]}><boxGeometry args={[.28, .08, .34]} /><meshStandardMaterial color="#d6a84f" emissive="#6b3006" emissiveIntensity={1} /></mesh>
    <mesh position={[.94, -.04, 0]} rotation={[0, 0, .12]}><boxGeometry args={[.28, .08, .34]} /><meshStandardMaterial color="#d6a84f" emissive="#6b3006" emissiveIntensity={1} /></mesh>
  </group>;
}

function Lantern({ position, mobile = false }: { position: [number, number, number]; mobile?: boolean }) {
  return <group position={position}>
    <mesh position={[0, .38, 0]}><cylinderGeometry args={[.035, .05, .75, mobile ? 5 : 8]} /><meshStandardMaterial color="#6b4a33" /></mesh>
    <mesh position={[0, .82, 0]}><octahedronGeometry args={[.18, 0]} /><meshStandardMaterial color="#d6a84f" emissive="#e07b20" emissiveIntensity={2} /></mesh>
    <pointLight position={[0, .8, 0]} color="#ff542f" intensity={mobile ? .35 : .7} distance={1.8} />
  </group>;
}

function ToriiShrine({ mobile = false, audioLevel = 0 }: SceneProps & { audioLevel?: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (mobile ? .02 : .045);
    group.current.position.y = Math.sin(state.clock.elapsedTime * .65) * .04;
    group.current.scale.setScalar(1 + audioLevel * .045);
  });
  const gates = mobile ? 3 : 5;
  return <group ref={group}>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.82, 0]}><circleGeometry args={[2.65, mobile ? 20 : 48]} /><meshStandardMaterial color="#090707" metalness={.45} roughness={.72} /></mesh>
    {Array.from({ length: gates }, (_, i) => {
      const z = 1.35 - i * .62;
      const scale = 1 - i * .08;
      return <group key={i} position={[0, -.15 + i * .03, z]} scale={scale}>
        <mesh position={[-.72, .25, 0]} rotation={[0, 0, -.06]}><cylinderGeometry args={[.12, .16, 1.7, mobile ? 6 : 10]} /><meshStandardMaterial color="#b62d1e" emissive="#3a0905" emissiveIntensity={1.1} /></mesh>
        <mesh position={[.72, .25, 0]} rotation={[0, 0, .06]}><cylinderGeometry args={[.12, .16, 1.7, mobile ? 6 : 10]} /><meshStandardMaterial color="#b62d1e" emissive="#3a0905" emissiveIntensity={1.1} /></mesh>
        <mesh position={[0, 1.1, 0]}><boxGeometry args={[1.8, .16, .24]} /><meshStandardMaterial color="#d64024" emissive="#501006" emissiveIntensity={1.2} /></mesh>
        <mesh position={[0, .72, 0]}><boxGeometry args={[1.45, .12, .2]} /><meshStandardMaterial color="#8f2119" roughness={.6} /></mesh>
      </group>;
    })}
    <Roof position={[0, 1.42, -.22]} scale={1.2} mobile={mobile} />
    <Roof position={[0, .67, -.28]} scale={.82} mobile={mobile} />
    <mesh position={[0, .05, -.15]}><boxGeometry args={[.12, 1.55, .12]} /><meshStandardMaterial color="#d6a84f" emissive="#7d3c0c" emissiveIntensity={1.5} /></mesh>
    <mesh position={[0, .88, -.15]}><octahedronGeometry args={[.18, 0]} /><meshStandardMaterial color="#ff542f" emissive="#ff542f" emissiveIntensity={2 + audioLevel * 3} /></mesh>
    {!mobile && <group>{[-1.8, 1.8].map((x) => <Lantern key={x} position={[x, -.05, .35]} />)}</group>}
    <group position={[0, -.58, -.35]}>
      {Array.from({ length: mobile ? 2 : 4 }, (_, i) => <mesh key={i} position={[0, i * .11, -.12 - i * .18]}><boxGeometry args={[2.2 - i * .25, .07, .42]} /><meshStandardMaterial color={i % 2 ? "#6b4a33" : "#b62d1e"} /></mesh>)}
    </group>
    {!mobile && <group position={[0, -.68, 1.45]}><mesh rotation={[0, 0, 0]}><boxGeometry args={[2.8, .08, .35]} /><meshStandardMaterial color="#6b4a33" /></mesh><mesh position={[-1.25, .18, 0]}><cylinderGeometry args={[.05, .08, .42, 6]} /><meshStandardMaterial color="#d6a84f" /></mesh><mesh position={[1.25, .18, 0]}><cylinderGeometry args={[.05, .08, .42, 6]} /><meshStandardMaterial color="#d6a84f" /></mesh></group>}
  </group>;
}

function DissolveField({ mobile = false, audioLevel = 0 }: SceneProps & { audioLevel?: number }) {
  const points = useMemo(() => {
    const count = mobile ? 180 : 900;
    const data = new Float32Array(count * 3);
    let seed = 17;
    const random = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 0; i < count; i += 1) {
      const side = i % 3 === 0 ? -1 : 1;
      data[i * 3] = side * (1.2 + random() * 2.9);
      data[i * 3 + 1] = -.45 + random() * 1.8;
      data[i * 3 + 2] = -1.1 + random() * 2.2;
    }
    return data;
  }, [mobile]);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const phase = i * .017;
      positions[i] += Math.sin(state.clock.elapsedTime * (.45 + audioLevel) + phase) * (.0007 + audioLevel * .002);
      positions[i + 1] += Math.cos(state.clock.elapsedTime * .6 + phase) * .00045;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .18) * .08;
  });
  return <points ref={ref} frustumCulled={false}><bufferGeometry><bufferAttribute attach="attributes-position" args={[points, 3]} count={points.length / 3} itemSize={3} /></bufferGeometry><pointsMaterial color="#d6a84f" size={mobile ? .016 : .024} transparent opacity={.65 + audioLevel * .3} depthWrite={false} sizeAttenuation /></points>;
}

function FluidLines({ mobile = false, audioLevel = 0 }: SceneProps & { audioLevel?: number }) {
  const lines = mobile ? 2 : 4;
  return <group rotation={[.25, 0, -.18]} scale={1 + audioLevel * .04}>{Array.from({ length: lines }, (_, i) => {
    const points = Array.from({ length: mobile ? 18 : 32 }, (_, p) => { const t = p / (mobile ? 17 : 31) * Math.PI * 2; const radius = 2.05 + i * .16 + Math.sin(t * 3 + i) * .12; return [Math.cos(t) * radius, Math.sin(t * 2 + i) * .22, Math.sin(t) * radius] as [number, number, number]; });
    return <Line key={i} points={points} color={i % 2 ? "#d6a84f" : "#ff542f"} transparent opacity={.4 + audioLevel * .2} lineWidth={mobile ? .6 : 1.1} />;
  })}</group>;
}

function ParticleArchitecture({ mobile = false, audioLevel = 0 }: SceneProps & { audioLevel?: number }) {
  const points = useMemo(() => {
    const columns = mobile ? 9 : 17;
    const rows = mobile ? 8 : 14;
    const data: number[] = [];
    for (let column = 0; column < columns; column += 1) {
      const x = (column / (columns - 1) - .5) * 3.8;
      const height = .75 + Math.sin(column * .9) * .3 + (column === Math.floor(columns / 2) ? .75 : 0);
      for (let row = 0; row < rows; row += 1) {
        const y = -.7 + (row / (rows - 1)) * height;
        const depth = (column % 3 - 1) * .08;
        data.push(x, y, depth);
        if (row === rows - 1 && column > 0 && column < columns - 1) {
          data.push(x, y + .12, depth, x + .08, y + .18, depth, x - .08, y + .18, depth);
        }
      }
    }
    const archPoints = mobile ? 16 : 30;
    for (let i = 0; i < archPoints; i += 1) {
      const t = i / (archPoints - 1) * Math.PI;
      data.push(Math.cos(t) * 1.45, -.05 + Math.sin(t) * .82, -.18);
    }
    return new Float32Array(data);
  }, [mobile]);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .22) * .12;
    ref.current.scale.setScalar(1 + audioLevel * .08);
    const material = ref.current.material as THREE.PointsMaterial;
    material.opacity = .52 + audioLevel * .38;
    material.size = (mobile ? .028 : .036) + audioLevel * .018;
  });
  return <points ref={ref} frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[points, 3]} count={points.length / 3} itemSize={3} />
    </bufferGeometry>
    <pointsMaterial color="#ffb347" size={mobile ? .028 : .036} transparent opacity={.6} depthWrite={false} sizeAttenuation />
  </points>;
}

function WordmarkParticles({ mobile = false, audioLevel = 0 }: SceneProps & { audioLevel?: number }) {
  const letters: Record<string, string[]> = {
    W: ["10001", "10001", "10101", "10101", "01010"],
    A: ["01110", "10001", "11111", "10001", "10001"],
    K: ["10001", "10010", "11100", "10010", "10001"],
    N: ["10001", "11001", "10101", "10011", "10001"],
    D: ["11110", "10001", "10001", "10001", "11110"],
  };
  const points = useMemo(() => {
    const data: number[] = [];
    const step = mobile ? .12 : .095;
    let offset = -1.82;
    "WAKANDA".split("").forEach((letter) => {
      letters[letter].forEach((row, y) => row.split("").forEach((value, x) => {
        if (value === "1") data.push(offset + x * step, (.34 - y * step), .9);
      }));
      offset += 5.35 * step;
    });
    return new Float32Array(data);
  }, [mobile]);
  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * .3) * .08;
    ref.current.position.y = .2 + Math.sin(state.clock.elapsedTime * .7) * .025;
    ref.current.scale.setScalar(1 + audioLevel * .12);
    (ref.current.material as THREE.PointsMaterial).opacity = .35 + audioLevel * .5;
  });
  return <points ref={ref} frustumCulled={false}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[points, 3]} count={points.length / 3} itemSize={3} />
    </bufferGeometry>
    <pointsMaterial color="#ff8a38" size={mobile ? .085 : .105} transparent opacity={.86} depthTest={false} depthWrite={false} sizeAttenuation />
  </points>;
}

function SceneDynamics({ mobile, audioLevel, scrollProgress }: { mobile: boolean; audioLevel: number; scrollProgress: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const pulse = audioLevel || (mobile ? .04 : .08) + Math.sin(state.clock.elapsedTime * 1.4) * .025;
    group.current.scale.setScalar(1 + pulse * .025);
    state.camera.position.z += (5.2 - scrollProgress * .65 - state.camera.position.z) * .04;
  });
  const pulse = audioLevel;
  return <group ref={group}>
    <pointLight position={[3, 2, 4]} color="#ff4d2e" intensity={(mobile ? 10 : 18) * (1 + pulse)} />
    <pointLight position={[-3, -2, 2]} color="#b7ff3c" intensity={mobile ? 4 : 8} />
    <Float speed={mobile ? .6 : 1} floatIntensity={mobile ? .1 : .2}>
      <ParticleArchitecture mobile={mobile} audioLevel={pulse} />
      <WordmarkParticles mobile={mobile} audioLevel={pulse} />
      <DissolveField mobile={mobile} audioLevel={pulse} />
      <FluidLines mobile={mobile} audioLevel={pulse} />
    </Float>
  </group>;
}

export default function Scene3DCanvas() {
  const [mobile, setMobile] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [fallbackPulse, setFallbackPulse] = useState(0.08);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 700px), (prefers-reduced-motion: reduce)");
    const update = () => setMobile(query.matches);
    update(); query.addEventListener?.("change", update);
    const onAudio = (event: Event) => setAudioLevel(Math.min(1, Math.max(0, Number((event as CustomEvent<number>).detail) || 0)));
    const onScroll = () => setScrollProgress(Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)));
    window.addEventListener("wakanda-audio-level", onAudio);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    const pulseTimer = window.setInterval(() => setFallbackPulse(.08 + Math.sin(Date.now() / 700) * .025), 120);
    return () => { query.removeEventListener?.("change", update); window.removeEventListener("wakanda-audio-level", onAudio); window.removeEventListener("scroll", onScroll); window.clearInterval(pulseTimer); };
  }, []);
  const pulse = audioLevel || (mobile ? fallbackPulse * .6 : fallbackPulse);
  return <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={mobile ? [1, 1] : [1, 1.5]} gl={{ antialias: !mobile, alpha: true }} onCreated={({ camera }) => { camera.position.z = 5.2 - scrollProgress * .65; }}>
    <ambientLight intensity={.35} />
    <Stars radius={8} depth={4} count={mobile ? 70 : 420} factor={mobile ? .8 : 1.2} fade />
    <SceneDynamics mobile={mobile} audioLevel={pulse} scrollProgress={scrollProgress} />
  </Canvas>;
}
