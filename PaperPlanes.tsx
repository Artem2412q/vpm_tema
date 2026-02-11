"use client";

import { motion } from "framer-motion";

function Plane({ delay = 0, scale = 1, opacity = 0.35 }: { delay?: number; scale?: number; opacity?: number }) {
  return (
    <motion.div
      className="absolute left-0 top-0"
      initial={{ opacity: 0, x: -40, y: 280, rotate: -12, scale }}
      animate={{
        opacity: [0, opacity, 0],
        x: [ -40, 520, 740 ],
        y: [ 280, 140, 80 ],
        rotate: [-12, -6, -2]
      }}
      transition={{
        duration: 3.8,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.8
      }}
    >
      <svg width="52" height="52" viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M6 30 58 6 40 58 28 36 6 30Z"
          fill="rgba(255,255,255,0.75)"
        />
        <path
          d="M28 36 58 6 34 34"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export default function PaperPlanes() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Plane delay={0.2} scale={0.95} opacity={0.35} />
      <Plane delay={1.1} scale={0.75} opacity={0.25} />
      <Plane delay={2.0} scale={0.62} opacity={0.18} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[hsl(var(--bg))] via-transparent to-transparent" />
    </div>
  );
}
