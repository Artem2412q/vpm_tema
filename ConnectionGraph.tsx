"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function makeSeries(seed: number, len = 24) {
  // Мягкий псевдо-сигнал: чуть «дышит», без резких прыжков.
  const r = (x: number) => {
    const t = Math.sin(x * 999 + seed) * 10000;
    return t - Math.floor(t);
  };
  const out: number[] = [];
  let v = 0.6;
  for (let i = 0; i < len; i++) {
    const n = (r(i) - 0.5) * 0.20;
    v = clamp(v + n, 0.2, 0.95);
    out.push(v);
  }
  return out;
}

function toPath(values: number[], w = 220, h = 44, pad = 6) {
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (1 - v) * (h - pad * 2);
    return [x, y] as const;
  });

  // сглаживание квадратиками
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const cx = x0;
    const cy = y0;
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    d += ` Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  const last = pts[pts.length - 1];
  d += ` T ${last[0].toFixed(2)} ${last[1].toFixed(2)}`;
  return d;
}

export default function ConnectionGraph({ isOn }: { isOn: boolean }) {
  const reduce = useReducedMotion();
  const seedRef = useRef(Math.random() * 10_000);
  const [seed, setSeed] = useState(seedRef.current);

  useEffect(() => {
    if (!isOn || reduce) return;
    const id = window.setInterval(() => {
      setSeed((s) => s + 1.618);
    }, 700);
    return () => window.clearInterval(id);
  }, [isOn, reduce]);

  const values = useMemo(() => {
    const base = makeSeries(seed, 26);
    // OFF — почти ровная линия; ON — живее.
    return isOn ? base : base.map((v) => 0.42 + (v - 0.5) * 0.12);
  }, [seed, isOn]);

  const d = useMemo(() => toPath(values), [values]);

  return (
    <div className="relative overflow-hidden rounded-xl2 border border-border/60 bg-bg/20 p-2">
      <svg viewBox="0 0 220 44" className="h-[44px] w-full" aria-hidden="true">
        <defs>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(120,170,255,0.15)" />
            <stop offset="50%" stopColor="rgba(120,170,255,0.75)" />
            <stop offset="100%" stopColor="rgba(190,110,255,0.55)" />
          </linearGradient>
        </defs>

        <path
          d="M 6 38 H 214"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
        />

        <motion.path
          d={d}
          fill="none"
          stroke="url(#line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: isOn ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        />
      </svg>

      {/* «микро-скан» при ON */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-2 w-20 bg-white/10 blur-xl"
        initial={false}
        animate={
          isOn && !reduce
            ? { x: ["-20%", "120%"], opacity: [0, 0.45, 0] }
            : { x: "0%", opacity: 0 }
        }
        transition={
          isOn && !reduce
            ? { duration: 1.7, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      />
    </div>
  );
}
