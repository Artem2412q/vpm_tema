"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CountryKey, COUNTRIES, RUSSIA_POINT } from "@/lib/countries";
import { easeOutCubic, latLonToVec3 } from "@/lib/math";

type Phase = "locked" | "cracking" | "shattering";

export default function VpnEffects({ isOn, country }: { isOn: boolean; country: CountryKey }) {
  const start = useMemo(() => latLonToVec3(RUSSIA_POINT.lat, RUSSIA_POINT.lon, 1.02), []);
  const target = useMemo(() => {
    const c = COUNTRIES[country];
    return latLonToVec3(c.lat, c.lon, 1.02);
  }, [country]);

  // плавный морф точки назначения (переключение реальности)
  const currentTarget = useRef(target.clone());
  useFrame((_, delta) => {
    currentTarget.current.lerp(target, 1 - Math.pow(0.001, delta)); // экспон. сглаживание
  });

  return (
    <group>
      <RussiaGlow position={start} />
      <LockOverRussia isOn={isOn} position={start.clone().multiplyScalar(1.05)} />

      <Tunnel
        isOn={isOn}
        start={start}
        endRef={currentTarget}
        label={COUNTRIES[country].label}
      />
      <ScanningRing isOn={isOn} />
    </group>
  );
}

function RussiaGlow({ position }: { position: THREE.Vector3 }) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={"#7ae6ff"} transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight distance={1.2} intensity={1.2} color={"#7ae6ff"} />
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={"#7ae6ff"} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function LockOverRussia({ isOn, position }: { isOn: boolean; position: THREE.Vector3 }) {
  const group = useRef<THREE.Group>(null!);
  const shards = useRef<THREE.InstancedMesh>(null!);
  const [phase, setPhase] = useState<Phase>("locked");
  const tRef = useRef(0);

  const dirs = useMemo(() => {
    const out: THREE.Vector3[] = [];
    for (let i = 0; i < 14; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.1) * 1.2,
        (Math.random() - 0.5) * 1.2
      ).normalize();
      out.push(v);
    }
    return out;
  }, []);

  useEffect(() => {
    if (isOn) {
      setPhase("cracking");
      tRef.current = 0;
    } else {
      setPhase("locked");
      tRef.current = 0;
      // сброс матриц осколков
      const dummy = new THREE.Object3D();
      for (let i = 0; i < dirs.length; i++) {
        dummy.position.set(0, 0, 0);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.setScalar(0.001);
        dummy.updateMatrix();
        shards.current?.setMatrixAt(i, dummy.matrix);
      }
      shards.current && (shards.current.instanceMatrix.needsUpdate = true);
    }
  }, [isOn, dirs.length]);

  useFrame((_, delta) => {
    if (!group.current) return;

    // ориентация замка “наружу” от поверхности
    group.current.lookAt(0, 0, 0);

    if (phase === "locked") {
      group.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.12);
      group.current.traverse((o) => {
        if ((o as any).material?.emissive) {
          (o as any).material.emissiveIntensity = 0.0;
          (o as any).material.opacity = 1.0;
          (o as any).material.transparent = true;
        }
      });
      return;
    }

    tRef.current += delta;
    if (phase === "cracking") {
      const t = Math.min(1, tRef.current / 0.45);
      const e = easeOutCubic(t);

      group.current.scale.setScalar(1 + e * 0.04);

      // “трещины” — просто всплеск эмиссии (процедурно, без текстур)
      group.current.traverse((o) => {
        const m = (o as any).material as THREE.MeshStandardMaterial | undefined;
        if (m?.emissive) {
          m.emissive.set("#78b4ff");
          m.emissiveIntensity = 0.8 * e;
        }
      });

      if (t >= 1) {
        setPhase("shattering");
        tRef.current = 0;
      }
    }

    if (phase === "shattering") {
      const t = Math.min(1, tRef.current / 0.75);
      const e = easeOutCubic(t);

      // основной замок исчезает
      group.current.traverse((o) => {
        const m = (o as any).material as THREE.MeshStandardMaterial | undefined;
        if (m) {
          m.transparent = true;
          m.opacity = 1 - e;
          if (m.emissive) m.emissiveIntensity = 0.6 * (1 - e);
        }
      });

      // осколки
      const dummy = new THREE.Object3D();
      for (let i = 0; i < dirs.length; i++) {
        const d = dirs[i];
        dummy.position.set(d.x * 0.18 * e, d.y * 0.18 * e, d.z * 0.18 * e);
        dummy.rotation.set(e * (1.2 + i * 0.08), e * (0.8 + i * 0.06), e * (0.5 + i * 0.05));
        const s = (1 - e) * 0.7 + 0.1;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        shards.current.setMatrixAt(i, dummy.matrix);
      }
      shards.current.instanceMatrix.needsUpdate = true;

      if (t >= 1) {
        // полностью исчезло; оставляем так
      }
    }
  });

  return (
    <group ref={group} position={position}>
      {/* шекель */}
      <mesh position={[0, 0.055, 0]}>
        <torusGeometry args={[0.055, 0.015, 14, 22, Math.PI]} />
        <meshStandardMaterial
          color={"#cfdcff"}
          roughness={0.35}
          metalness={0.7}
          emissive={"#78b4ff"}
          emissiveIntensity={0}
          transparent
        />
      </mesh>
      {/* тело */}
      <mesh position={[0, 0.0, 0]}>
        <boxGeometry args={[0.12, 0.11, 0.07]} />
        <meshStandardMaterial
          color={"#b8c7ff"}
          roughness={0.45}
          metalness={0.65}
          emissive={"#78b4ff"}
          emissiveIntensity={0}
          transparent
        />
      </mesh>

      {/* осколки (instanced) */}
      <instancedMesh ref={shards} args={[undefined as any, undefined as any, 14]} position={[0, 0.01, 0]}>
        <boxGeometry args={[0.03, 0.02, 0.02]} />
        <meshStandardMaterial
          color={"#c6d3ff"}
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.85}
        />
      </instancedMesh>

      <Html center distanceFactor={10} position={[0.0, 0.13, 0]}>
        <div
          style={{
            fontSize: 12,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(140,160,210,0.22)",
            background: "rgba(18,22,32,0.65)",
            color: "rgba(240,245,255,0.92)",
            backdropFilter: "blur(10px)"
          }}
        >
          lock
        </div>
      </Html>
    </group>
  );
}

function Tunnel({
  isOn,
  start,
  endRef,
  label
}: {
  isOn: boolean;
  start: THREE.Vector3;
  endRef: React.MutableRefObject<THREE.Vector3>;
  label: string;
}) {
  const tube = useRef<THREE.Mesh>(null!);
  const tubeMask = useRef<THREE.Mesh>(null!);
  const mapRef = useRef<THREE.Texture | null>(null);
  const inst = useRef<THREE.InstancedMesh>(null!);

  const curveRef = useRef<THREE.QuadraticBezierCurve3>(
    new THREE.QuadraticBezierCurve3(start, start.clone(), endRef.current.clone())
  );

  const mid = useMemo(() => new THREE.Vector3(), []);
  const temp = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    // t0 по кривой для частиц
    return Array.from({ length: 80 }).map(() => Math.random());
  }, []);

  const cipherTexture = useMemo(() => {
    // canvas-текстура “шифр-потока”
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 64;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.font = "16px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    ctx.fillStyle = "rgba(240,250,255,0.9)";

    const chars = "01A9F3KZ7XQ2M8N5R";
    for (let x = 0; x < c.width; x += 12) {
      const ch = chars[(x / 12) % chars.length];
      ctx.fillText(ch, x, 36 + (Math.sin(x * 0.02) * 6));
    }

    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(12, 1);
    tex.anisotropy = 4;
    tex.colorSpace = THREE.SRGBColorSpace;
    mapRef.current = tex;
    return tex;
  }, []);

  useFrame((state, delta) => {
    // обновляем кривую (морф страны)
    const end = endRef.current;
    mid.copy(start).add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.6);
    curveRef.current.v0.copy(start);
    curveRef.current.v1.copy(mid);
    curveRef.current.v2.copy(end);

    // обновляем геометрию трубки не каждый кадр (дорого), а с шагом
    // Но для простоты — обновляем раз в ~6 кадров.
    const frame = Math.floor(state.clock.elapsedTime * 60);
    if (frame % 6 === 0) {
      const points = curveRef.current.getPoints(80);
      const geom = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 180, 0.012, 12, false);
      tube.current.geometry.dispose();
      tube.current.geometry = geom;

      const geomMask = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 180, 0.038, 14, false);
      tubeMask.current.geometry.dispose();
      tubeMask.current.geometry = geomMask;
    }

    if (mapRef.current) {
      mapRef.current.offset.x -= delta * (isOn ? 0.55 : 0.12);
    }

    // крипто-частицы
    const t = state.clock.elapsedTime;
    const speed = isOn ? 0.22 : 0.08;
    const curve = curveRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = (particles[i] + t * speed) % 1;
      const pos = curve.getPointAt(p);
      temp.position.copy(pos);
      temp.scale.setScalar(isOn ? 0.9 : 0.6);
      temp.updateMatrix();
      inst.current.setMatrixAt(i, temp.matrix);
    }
    inst.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh ref={tube} visible={true}>
        <bufferGeometry />
        <meshStandardMaterial
          color={"#8ac2ff"}
          emissive={"#7ab6ff"}
          emissiveIntensity={isOn ? 0.95 : 0.25}
          roughness={0.35}
          metalness={0.05}
          transparent
          opacity={isOn ? 0.85 : 0.35}
          map={cipherTexture}
        />
      </mesh>

      {/* маска подсети */}
      <mesh ref={tubeMask} visible={isOn}>
        <bufferGeometry />
        <meshBasicMaterial
          color={"#b7f0ff"}
          transparent
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* крипто-частицы по туннелю */}
      <instancedMesh ref={inst} args={[undefined as any, undefined as any, particles.length]} visible={isOn}>
        <sphereGeometry args={[0.012, 10, 10]} />
        <meshBasicMaterial color={"#ffffff"} transparent opacity={0.55} />
      </instancedMesh>

      {/* подпись */}
      <Html center distanceFactor={11} position={[0, 0, 0]}>
        <div style={{ position: "absolute", left: 0, top: 0, transform: "translate(-50%, -50%)" }} />
      </Html>

      {isOn ? (
        <Html
          position={curveRef.current.getPointAt(0.55)}
          center
          distanceFactor={10}
        >
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 14,
              border: "1px solid rgba(140,160,210,0.22)",
              background: "rgba(18,22,32,0.65)",
              color: "rgba(240,245,255,0.92)",
              backdropFilter: "blur(12px)",
              maxWidth: 220
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.75 }}>Masked Subnet</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>
              Маршрут → {label}
            </div>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function ScanningRing({ isOn }: { isOn: boolean }) {
  const ring = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ring.current) return;
    const t = state.clock.elapsedTime;
    const y = Math.sin(t * 1.3) * 0.55;
    const baseR = 1.06;
    const r = Math.sqrt(Math.max(0.02, baseR * baseR - y * y));
    ring.current.position.y = y;
    ring.current.scale.set(r, 1, r);
    ring.current.rotation.y = t * 0.55;
  });

  return (
    <mesh ref={ring} visible={isOn}>
      <torusGeometry args={[1, 0.006, 14, 180]} />
      <meshBasicMaterial
        color={"#9fe0ff"}
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
