"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import VpnPanel from "@/components/ui/VpnPanel";
import { COUNTRIES, CountryKey } from "@/lib/countries";
import { cn } from "@/lib/cn";
import { StaticGlobe } from "@/components/ui/StaticGlobe";

const EarthScene = dynamic(() => import("@/components/earth/EarthScene"), {
  ssr: false,
  loading: () => <ScenePlaceholder />
});

function ScenePlaceholder() {
  return (
    <div className="relative h-[420px] sm:h-[520px] w-full rounded-xl2 glass overflow-hidden shadow-soft">
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-white/5 blur-2xl" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-sm text-muted/80">Загружаем 3D-сцену…</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const [isOn, setIsOn] = useState(false);
  const [country, setCountry] = useState<CountryKey>("NL");

  const countryMeta = useMemo(() => COUNTRIES[country], [country]);

  return (
    <header className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:pt-16 pb-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/5 px-3 py-1 text-sm text-muted/90">
              <span className="h-2 w-2 rounded-full bg-accent shadow-glow" aria-hidden="true" />
              <span>VPN “Тёма”</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]">
              Свобода в сети <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent2))]">без границ</span>
            </h1>

            <p className="mt-4 max-w-xl text-base sm:text-lg text-muted/90 leading-relaxed">
              «Тёма» помогает безопасно выходить в интернет из любой точки мира —
              без слежки и лишних данных. Мы строим защищённый канал, а историю действий не сохраняем.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#cta"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl2 px-5 py-3 text-base font-semibold",
                  "bg-white text-black hover:bg-white/90 focus-visible:outline-none",
                  "shadow-soft"
                )}
              >
                Подключить Тёму
              </a>
              <a
                href="#how"
                className={cn(
                  "inline-flex items-center justify-center rounded-xl2 px-5 py-3 text-base font-semibold",
                  "border border-border/80 bg-white/5 hover:bg-white/10"
                )}
              >
                Как это работает
              </a>
            </div>

            <div id="how" className="mt-8 glass rounded-xl2 p-4 sm:p-5 border border-border/60">
              <p className="text-sm text-muted/90 leading-relaxed">
                Принцип простой: когда VPN включён, ваш трафик идёт через зашифрованный туннель к выбранной стране выхода.
                Сайты видят подключение из этой страны. Внутри канала — шифрование, снаружи — меньше данных для наблюдения.
              </p>
              <p className="mt-2 text-xs text-muted/70">
                Важно: VPN не делает вас невидимыми для всего на свете — но защищает канал и снижает риски.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted/80">Визуализация</p>
                <p className="text-base font-semibold">Земля • туннель • маска подсети</p>
              </div>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={isOn ? "on" : "off"}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className={cn(
                    "text-xs rounded-full px-3 py-1 border",
                    isOn
                      ? "border-white/20 bg-white/10 text-fg"
                      : "border-border/60 bg-white/5 text-muted/80"
                  )}
                >
                  {isOn ? "VPN: ON" : "VPN: OFF"}
                </motion.div>
              </AnimatePresence>
            </div>

            {reduce ? (
              <div className="relative h-[420px] sm:h-[520px] w-full rounded-xl2 glass overflow-hidden shadow-soft">
                <div className="absolute inset-0 opacity-90">
                  <StaticGlobe />
                </div>
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl2 p-4">
                  <p className="text-sm text-muted/90">
                    Анимации отключены (настройка “уменьшить движение”). Это нормально — сайт остаётся полностью рабочим.
                  </p>
                </div>
              </div>
            ) : (
              <EarthScene isOn={isOn} country={country} />
            )}

            <div className="mt-4">
              <VpnPanel
                isOn={isOn}
                onToggle={() => setIsOn((v) => !v)}
                country={country}
                onCountryChange={setCountry}
                countryMeta={countryMeta}
              />
            </div>

            <p className="mt-3 text-xs text-muted/70 leading-relaxed">
              Подсветка “Россия” в 3D — это визуальная метафора. Мы не обещаем невозможного: VPN не отменяет законы физики и интернета,
              но помогает защищать соединение и приватность.
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 bg-gradient-to-b from-transparent to-[hsl(var(--bg))]" />
    </header>
  );
}
