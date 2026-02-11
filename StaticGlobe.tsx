"use client";

export function StaticGlobe() {
  // Простая статичная «сцена» на случай prefers-reduced-motion или очень слабых устройств.
  return (
    <svg
      viewBox="0 0 800 600"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="g1" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(170,200,255,0.35)" />
          <stop offset="55%" stopColor="rgba(40,80,140,0.20)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="earth" cx="30%" cy="28%" r="75%">
          <stop offset="0%" stopColor="rgba(80,140,255,0.85)" />
          <stop offset="55%" stopColor="rgba(20,40,70,0.85)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.95)" />
        </radialGradient>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <rect width="800" height="600" fill="rgba(0,0,0,0)" />
      <circle cx="210" cy="150" r="140" fill="url(#g1)" filter="url(#blur)" opacity="0.9" />
      <circle cx="540" cy="360" r="120" fill="url(#g1)" filter="url(#blur)" opacity="0.55" />

      <g transform="translate(400 310)">
        <circle r="190" fill="url(#earth)" />
        <circle r="194" fill="none" stroke="rgba(120,170,255,0.25)" strokeWidth="2" />
        <circle r="210" fill="none" stroke="rgba(190,110,255,0.14)" strokeWidth="10" opacity="0.7" />
        {/* «подсветка» РФ */}
        <circle cx="60" cy="-35" r="26" fill="rgba(120,200,255,0.25)" />
        <circle cx="60" cy="-35" r="40" fill="rgba(120,200,255,0.10)" />
        {/* маршрут */}
        <path
          d="M 60 -35 C 130 -130 230 -70 250 -10"
          fill="none"
          stroke="rgba(120,170,255,0.65)"
          strokeWidth="3"
        />
      </g>

      {/* лёгкие звёзды */}
      {Array.from({ length: 50 }).map((_, i) => {
        const x = (i * 97) % 800;
        const y = (i * 53) % 600;
        const r = (i % 3) + 1;
        const o = (i % 7) / 10 + 0.2;
        return <circle key={i} cx={x} cy={y} r={r * 0.6} fill={`rgba(255,255,255,${o})`} />;
      })}
    </svg>
  );
}
