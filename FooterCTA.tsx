"use client";

import { cn } from "@/lib/cn";

export default function FooterCTA() {
  return (
    <section id="cta" className="scroll-mt-24">
      <div className="glass rounded-xl2 border border-border/60 p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Готовы подключить «Тёму»?
            </h2>
            <p className="mt-3 text-base text-muted/90 leading-relaxed max-w-2xl">
              Без громких обещаний — только аккуратная защита соединения, понятные принципы и no‑logs как основа.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className={cn(
                "inline-flex items-center justify-center rounded-xl2 px-6 py-3 text-base font-semibold",
                "bg-white text-black hover:bg-white/90 shadow-soft"
              )}
              aria-label="Подключить Тёму"
            >
              Подключить Тёму
            </a>
            <a
              href="#support"
              className={cn(
                "inline-flex items-center justify-center rounded-xl2 px-6 py-3 text-base font-semibold",
                "border border-border/80 bg-white/5 hover:bg-white/10"
              )}
            >
              Поддержка
            </a>
          </div>
        </div>

        <div className="mt-8 hr-soft" aria-hidden="true" />

        <footer className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-muted/70">
            © {new Date().getFullYear()} VPN «Тёма». Все формулировки — про безопасность и приватность, без призывов к незаконным действиям.
          </p>

          <div id="support" className="flex flex-wrap gap-3 text-xs text-muted/80">
            <a className="hover:text-fg" href="#">Политика</a>
            <a className="hover:text-fg" href="#">Поддержка</a>
            <a className="hover:text-fg" href="#">Контакты</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
