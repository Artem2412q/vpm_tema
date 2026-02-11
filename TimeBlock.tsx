"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { COUNTRIES, CountryKey } from "@/lib/countries";
import { formatTime, getNow } from "@/lib/time";
import { cn } from "@/lib/cn";

export default function TimeBlock() {
  const reduce = useReducedMotion();
  const [country, setCountry] = useState<CountryKey>("DE");
  const [now, setNow] = useState(() => getNow());

  useEffect(() => {
    const id = window.setInterval(() => setNow(getNow()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const local = useMemo(() => formatTime(now, undefined), [now]);
  const remote = useMemo(
    () => formatTime(now, COUNTRIES[country].timeZone),
    [now, country]
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="glass rounded-xl2 border border-border/60 p-5 sm:p-6 shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted/80">Двойные часы</p>
            <h3 className="mt-1 text-2xl sm:text-3xl font-semibold">Локально и «на выходе»</h3>
          </div>
          <div className="rounded-xl2 border border-border/60 bg-white/5 px-3 py-2">
            <label className="text-xs text-muted/80 block" htmlFor="tz">
              Страна выхода
            </label>
            <select
              id="tz"
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryKey)}
              className="mt-1 w-full bg-transparent text-sm focus-visible:outline-none"
              aria-label="Выберите страну для сравнения времени"
            >
              {Object.entries(COUNTRIES).map(([key, c]) => (
                <option value={key} key={key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ClockCard label="Ваше время" value={local} reduce={reduce} />
          <ClockCard
            label={`Время: ${COUNTRIES[country].label}`}
            value={remote}
            reduce={reduce}
            accent
          />
        </div>

        <div className="mt-6 rounded-xl2 border border-border/60 bg-white/5 p-4">
          <p className="text-sm text-muted/90 leading-relaxed">
            При переключении страны мы «мягко меняем реальность»: цифры и подписи
            плавно перестраиваются — без резких скачков.
          </p>
        </div>
      </div>

      <div className="glass rounded-xl2 border border-border/60 p-5 sm:p-6">
        <h3 className="text-xl font-semibold">Зачем это на лендинге?</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted/90 leading-relaxed">
          <li>• Понятный признак: выбранная страна меняет “точку выхода”.</li>
          <li>• Удобно объяснить принцип без сложных терминов.</li>
          <li>• “Живое” время добавляет ощущение реального сервиса, а не картинки.</li>
        </ul>

        <p className="mt-5 text-xs text-muted/70 leading-relaxed">
          Точное время берём из вашего устройства и стандартного Intl API браузера. Никаких скрытых запросов.
        </p>
      </div>
    </div>
  );
}

function ClockCard({
  label,
  value,
  reduce,
  accent
}: {
  label: string;
  value: string;
  reduce: boolean;
  accent?: boolean;
}) {
  return (
    <div className={cn("rounded-xl2 border border-border/60 bg-white/5 p-4", accent && "shadow-glow")}>
      <p className="text-xs text-muted/80">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={value}
            className={cn("text-3xl sm:text-4xl font-semibold tracking-tight", accent && "text-fg")}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-2 text-[11px] text-muted/70">
        Обновляется каждую секунду
      </p>
    </div>
  );
}
