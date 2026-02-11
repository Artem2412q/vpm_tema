"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function makeEarthTexture() {
  // Процедурная «карта»: океан + шум земли + лёгкий лёд.
  // Здесь можно заменить на другую процедурную генерацию — без внешних ассетов.
  const w = 1024;
  const h = 512;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  // океан
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#061427");
  g.addColorStop(0.5, "#061a31");
  g.addColorStop(1, "#040b14");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  // шум
  const img = ctx.getImageData(0, 0, w, h);
  const data = img.data;

  // простой value-noise (через синусы) — не идеально, но “живой” вид.
  const n = (x: number, y: number) =>
    0.5 +
    0.5 *
      Math.sin(x * 0.018 + Math.sin(y * 0.022) * 2.2) *
      Math.cos(y * 0.016 + Math.sin(x * 0.019) * 1.6);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;

      // “континенты”: порог + широтная маска
      const lat = Math.abs(y / h - 0.5) * 2;
      const noise = n(x, y);
      const landMask = noise > 0.58 ? 1 : 0;

      // цвет суши
      if (landMask) {
        const green = 60 + noise * 80;
        const brown = 30 + noise * 60;
        const light = 10 + noise * 50;

        data[i] = brown + light; // r
        data[i + 1] = green + light; // g
        data[i + 2] = 40 + light; // b
        data[i + 3] = 255;
      } else {
        // океан чуть “дышит”
        const deep = 10 + noise * 20;
        data[i] = 8 + deep;
        data[i + 1] = 18 + deep;
        data[i + 2] = 40 + deep * 2;
        data[i + 3] = 255;
      }

      // лёд на полюсах
      if (lat > 0.82) {
        const ice = (lat - 0.82) / 0.18;
        data[i] = data[i] * (1 - ice) + 210 * ice;
        data[i + 1] = data[i + 1] * (1 - ice) + 225 * ice;
        data[i + 2] = data[i + 2] * (1 - ice) + 255 * ice;
      }
    }
  }

  ctx.putImageData(img, 0, 0);

  // облака (полупрозрачные)
  ctx.globalAlpha = 0.10;
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const r = 8 + Math.random() * 30;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.55 + Math.random() * 0.3), Math.random(), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = 8;
  return tex;
}

export default function EarthCore({ segments }: { segments: number }) {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudRef = useRef<THREE.Mesh>(null!);

  const earthTex = useMemo(() => makeEarthTexture(), []);
  const rough = useMemo(() => {
    const t = earthTex.clone();
    t.needsUpdate = true;
    return t;
  }, [earthTex]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.08;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshStandardMaterial
          map={earthTex}
          roughness={0.9}
          metalness={0.05}
          emissive={"#0a1423"}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* атмосфера */}
      <mesh>
        <sphereGeometry args={[1.035, 48, 48]} />
        <meshBasicMaterial
          color={"#90b7ff"}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* облака */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.02, 48, 48]} />
        <meshStandardMaterial
          map={rough}
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
