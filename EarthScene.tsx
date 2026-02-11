"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Html, useDetectGPU } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
import EarthCore from "@/components/earth/EarthCore";
import VpnEffects from "@/components/earth/VpnEffects";
import { CountryKey } from "@/lib/countries";

export default function EarthScene({
  isOn,
  country
}: {
  isOn: boolean;
  country: CountryKey;
}) {
  const gpu = useDetectGPU();

  const quality = useMemo(() => {
    // tier: 0 (очень слабое) ... 3 (сильное)
    // Если tier неизвестен — считаем средним.
    const tier = gpu?.tier ?? 2;
    return {
      tier,
      dpr: tier <= 1 ? 1 : 1.5,
      segments: tier <= 1 ? 40 : 64,
      stars: tier <= 1 ? 1200 : 2500
    };
  }, [gpu]);

  return (
    <div className="relative h-[420px] sm:h-[520px] w-full rounded-xl2 glass overflow-hidden shadow-soft">
      <Canvas
        dpr={quality.dpr}
        camera={{ position: [0, 0, 3.2], fov: 42, near: 0.1, far: 100 }}
        gl={{
          antialias: quality.tier >= 2,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 2, 2]} intensity={1.2} color={"#bcd2ff"} />
        <directionalLight position={[-3, -2, -1]} intensity={0.35} color={"#a88cff"} />

        <Stars radius={18} depth={30} count={quality.stars} factor={2} saturation={0} fade speed={0.35} />

        <Suspense fallback={null}>
          <EarthCore segments={quality.segments} />
          <VpnEffects isOn={isOn} country={country} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-border/60 bg-white/5 px-3 py-1 text-xs text-muted/80">
        3D • оптимизировано • tier {quality.tier}
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 right-4">
        <div className="glass rounded-xl2 border border-border/60 p-3">
          <p className="text-sm text-muted/90">
            Теперь вы как будто в другой стране: трафик идёт через защищённый туннель.
          </p>
        </div>
      </div>
    </div>
  );
}
