"use client";

import { motion, useReducedMotion } from "framer-motion";
import { COUNTRIES, CountryKey, CountryMeta } from "@/lib/countries";
import ConnectionGraph from "@/components/ui/ConnectionGraph";
import { cn } from "@/lib/cn";

export default function VpnPanel({
  isOn,
  onToggle,
  country,
  onCountryChange,
  countryMeta
}: {
  isOn: boolean;
  onToggle: () => void;
  country: CountryKey;
  onCountryChange: (c: CountryKey) => void;
  countryMeta: CountryMeta;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="glass rounded-xl2 border border-border/60 p-4 sm:p-5 shadow-soft">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted/80">Панель</p>
            <p className="text-base font-semibold leading-tight">Состояние и страна</p>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "relative inline-flex h-10 w-[92px] items-center rounded-full border",
              "focus-visible:outline-none",
              isOn ? "border-white/20 bg-white/10" : "border-border/70 bg-white/5"
            )}
            aria-label={isOn ? "Выключить VPN" : "Включить VPN"}
            aria-pressed={isOn}
          >
            <motion.span
              layout={!reduce}
              transition={{ type: "spring", stiffness: 500, damping: 32 }}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-full",
                "bg-white text-black shadow-soft",
                "ml-1"
              )}
              style={{ x: isOn ? 48 : 0 }}
            >
              {isOn ? "ON" : "OFF"}
            </motion.span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-3">
          <div className="rounded-xl2 border border-border/60 bg-white/5 p-3">
            <label className="block text-xs text-muted/80" htmlFor="country">
              Страна выхода (3–5 вариантов)
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => onCountryChange(e.target.value as CountryKey)}
              className="mt-2 w-full rounded-xl2 border border-border/70 bg-bg/30 px-3 py-2 text-sm text-fg focus-visible:outline-none"
              aria-label="Выберите страну выхода"
            >
              {Object.entries(COUNTRIES).map(([key, c]) => (
                <option value={key} key={key}>
                  {c.label}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted/70">
              Таймзона: <span className="text-muted/90">{countryMeta.timeZone}</span>
            </p>
          </div>

          <div className="rounded-xl2 border border-border/60 bg-white/5 p-3">
            <p className="text-xs text-muted/80">Состояние соединения</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">
                  {isOn ? "Защищённый туннель" : "Обычное соединение"}
                </p>
                <p className="text-xs text-muted/70">
                  {isOn
                    ? "Канал шифруется; сайты видят страну выхода."
                    : "Трафик идёт напрямую; данных для наблюдения больше."}
                </p>
              </div>
              <div className={cn("h-8 w-8 rounded-full border", isOn ? "border-white/20 bg-white/10 shadow-glow" : "border-border/60 bg-white/5")} aria-hidden="true" />
            </div>

            <div className="mt-3">
              <ConnectionGraph isOn={isOn} />
              <p className="mt-2 text-[11px] text-muted/60">
                Индикатор — художественный. Он не показывает реальную скорость.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
