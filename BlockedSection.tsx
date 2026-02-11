"use client";

import Section from "@/components/Section";
import PaperPlanes from "@/components/ui/PaperPlanes";
import { motion, useReducedMotion } from "framer-motion";

const ITEMS = [
  { title: "Мессенджеры", desc: "В разные годы доступ мог работать нестабильно или ограничиваться.", icon: IconChat },
  { title: "Новости", desc: "Некоторые сайты недоступны или открываются с перебоями.", icon: IconNews },
  { title: "Соцсети", desc: "Часть платформ ограничивается по регионам или периодам.", icon: IconSocial },
  { title: "Сервисы", desc: "Отдельные продукты могут блокироваться из‑за решений провайдеров и регуляторов.", icon: IconTools }
];

export default function BlockedSection() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="blocked"
      eyebrow="Что ограничивается"
      title="Доступ в РФ может быть нестабильным — и это реальность"
      subtitle="Формулируем спокойно: в разные годы и в разных регионах ограничивался доступ к отдельным сервисам. «Тёма» помогает защитить канал и выбрать страну выхода — без агрессии и лозунгов."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-xl2 border border-border/60 p-5 sm:p-6 shadow-soft">
          <h3 className="text-xl font-semibold">Примеры категорий</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {ITEMS.map((it) => (
              <div
                key={it.title}
                className="rounded-xl2 border border-border/60 bg-white/5 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl2 border border-border/60 bg-bg/30 flex items-center justify-center">
                    <it.icon />
                  </div>
                  <p className="font-semibold">{it.title}</p>
                </div>
                <p className="mt-2 text-sm text-muted/90 leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl2 border border-border/60 p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted/80">Культурная память</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-semibold">
                Telegram и 2018 год
              </h3>
            </div>
            <div className="rounded-xl2 border border-border/60 bg-white/5 px-3 py-2 text-xs text-muted/80">
              без токсичности
            </div>
          </div>

          <p className="mt-3 text-sm text-muted/90 leading-relaxed">
            Мы помним 2018 год: блокировки, сбои, и как люди запускали бумажные самолётики
            в знак протеста. Это не лозунг — скорее символ того, как общество реагировало на ограничения.
          </p>

          <div className="mt-4 rounded-xl2 border border-border/60 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl2 border border-border/60 bg-bg/30 flex items-center justify-center">
                <IconTelegram />
              </div>
              <div>
                <p className="font-semibold">Telegram</p>
                <p className="text-xs text-muted/70">
                  Иногда важнее не “обойти”, а защитить канал и приватность.
                </p>
              </div>
            </div>
          </div>

          {!reduce ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <PaperPlanes />
            </motion.div>
          ) : null}

          <p className="mt-4 text-xs text-muted/70 leading-relaxed">
            Формулировка: «в РФ ограничивается доступ к…» — без обвинений и без призывов к незаконным действиям.
          </p>
        </div>
      </div>
    </Section>
  );
}

function IconTelegram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M21.7 4.3c.3-.9-.6-1.8-1.5-1.5L2.8 9.8c-1 .4-1 1.8.1 2.1l4.7 1.5 1.8 5.4c.3.9 1.5 1 2 .2l2.7-4.1 4.8 3.5c.8.6 2 .1 2.2-.9L21.7 4.3Z"
        fill="rgba(255,255,255,0.9)"
        opacity="0.85"
      />
      <path
        d="M8.1 13.2 18.7 6.6c.2-.1.4.2.2.4l-8.2 7.6-.3 3.1c0 .3-.4.3-.5 0l-1.5-4.6c-.1-.3 0-.6.2-.9Z"
        fill="rgba(0,0,0,0.25)"
      />
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6.5c0-1 1-2 2.2-2h9.6C18 4.5 19 5.5 19 6.5v6c0 1-1 2-2.2 2H10l-3.5 3v-3H7.2C6 14.5 5 13.5 5 12.5v-6Z" fill="rgba(255,255,255,0.85)"/>
    </svg>
  );
}
function IconNews() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="rgba(255,255,255,0.85)"/>
      <path d="M8 9h8M8 12h8M8 15h5" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconSocial() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm8 4a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" fill="rgba(255,255,255,0.85)"/>
      <path d="M3.8 19.2c.6-2.9 3-5 6.2-5s5.6 2.1 6.2 5" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconTools() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 3.8a6.5 6.5 0 0 0-6.4 8l-4 4a2 2 0 0 0 0 2.8l1.3 1.3a2 2 0 0 0 2.8 0l4-4a6.5 6.5 0 1 0 2.3-12.1Z" fill="rgba(255,255,255,0.85)"/>
      <circle cx="16.5" cy="7.5" r="1.3" fill="rgba(0,0,0,0.25)"/>
    </svg>
  );
}
