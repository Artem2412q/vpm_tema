"use client";

import Section from "@/components/Section";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export default function WhySection() {
  const reduce = useReducedMotion();

  return (
    <Section
      id="why"
      eyebrow="Почему «Тёма» необычен"
      title="Понятные принципы, усиленная безопасность"
      subtitle="Мы объясняем сложные вещи простыми словами и не даём юридических обещаний — только честно описываем, что делает VPN и чего он не делает."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card
          title="Маска подсети"
          desc="Мы «смешиваем» ваше присутствие, чтобы маршрут было сложнее предсказать. Это не магия: просто меньше прямых следов о том, кто вы и откуда."
          icon={<IconMask />}
          highlight="Masked Subnet"
        />
        <Card
          title="Шифрование нового поколения"
          desc="Ключ → поток шифра: данные превращаются в набор символов, который сложно прочитать без ключа. Даже в публичном Wi‑Fi."
          icon={<IconKey />}
          highlight="Cipher Stream"
        />
        <Card
          title="No‑logs"
          desc="Мы не храним историю действий и не ведём журналы активности. Сервис проектируется так, чтобы не создавать лишних данных о вас."
          icon={<IconNoLogs />}
          highlight="No‑Logs"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass rounded-xl2 border border-border/60 p-5 sm:p-6 shadow-soft">
          <h3 className="text-xl font-semibold">Объединили опыт разных VPN</h3>
          <p className="mt-3 text-sm text-muted/90 leading-relaxed">
            Мы работаем с разными VPN‑провайдерами, а на базе их решений написали новый код —
            исправленный и более безопасный. То есть: взяли лучшее, убрали слабые места, усилили защиту.
          </p>

          <div className="mt-5 rounded-xl2 border border-border/60 bg-white/5 p-4">
            <p className="text-sm font-semibold">Мини‑сценарий</p>
            <p className="mt-2 text-sm text-muted/90 leading-relaxed">
              Вы в кафе. Wi‑Fi видит только зашифрованный поток. Сайты видят подключение из выбранной страны.
              Мы не сохраняем ваши действия.
            </p>
          </div>
        </div>

        <div className="glass rounded-xl2 border border-border/60 p-5 sm:p-6 relative overflow-hidden">
          <h3 className="text-xl font-semibold">Визуальная подсказка</h3>
          <p className="mt-2 text-sm text-muted/90 leading-relaxed">
            Ниже — метафора “ключ → поток шифра”. Она включается мягко, уважая настройку “уменьшить движение”.
          </p>

          <div className="mt-5 rounded-xl2 border border-border/60 bg-bg/20 p-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl2 border border-border/60 bg-white/5 flex items-center justify-center">
                <IconKey />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted/70">Ключ</p>
                <p className="text-sm font-semibold">Сеансовый ключ</p>
              </div>
            </div>

            <div className="mt-4">
              <CipherStrip active={!reduce} />
            </div>
          </div>

          <p className="mt-4 text-xs text-muted/70 leading-relaxed">
            Мы избегаем громких обещаний. Правильнее: “защищаем канал” и “уменьшаем риски”, а не “делаем невидимым”.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Card({
  title,
  desc,
  icon,
  highlight
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  highlight: string;
}) {
  return (
    <div className="glass rounded-xl2 border border-border/60 p-5 sm:p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl2 border border-border/60 bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted/80">{highlight}</p>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted/90 leading-relaxed">{desc}</p>
    </div>
  );
}

function CipherStrip({ active }: { active: boolean }) {
  const reduce = useReducedMotion();

  const chars = "01A9F3KZ7XQ2M8N5R";
  const stream = Array.from({ length: 36 }).map((_, i) => chars[(i * 7) % chars.length]).join("");

  return (
    <div className="relative overflow-hidden rounded-xl2 border border-border/60 bg-white/5 p-3">
      <p className="text-xs text-muted/70">Поток</p>
      <div className="mt-2 h-7 overflow-hidden rounded-lg bg-bg/30 border border-border/60">
        <motion.div
          className={cn("whitespace-nowrap font-mono text-xs tracking-widest px-3 py-1", "text-fg/90")}
          initial={false}
          animate={
            active && !reduce
              ? { x: ["0%", "-40%"] }
              : { x: "0%" }
          }
          transition={
            active && !reduce
              ? { duration: 3.2, ease: "linear", repeat: Infinity }
              : { duration: 0.2 }
          }
        >
          {stream} {stream} {stream}
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-6 left-0 w-20 bg-white/10 blur-xl"
        initial={false}
        animate={
          active && !reduce
            ? { x: ["-30%", "120%"], opacity: [0, 0.45, 0] }
            : { x: "0%", opacity: 0 }
        }
        transition={
          active && !reduce
            ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      />
    </div>
  );
}

function IconMask() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3c4 3 7 3.7 9 4.2v6.2c0 5.2-3.6 8-9 9.4-5.4-1.4-9-4.2-9-9.4V7.2C5 6.7 8 6 12 3Z" fill="rgba(255,255,255,0.85)"/>
      <path d="M8.5 11c2.2 1.3 4.8 1.3 7 0" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
function IconKey() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 3a7 7 0 1 0 6.2 10H23v3h-3v3h-3v-3h-2.1A7 7 0 0 0 14 3Zm0 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" fill="rgba(255,255,255,0.85)"/>
    </svg>
  );
}
function IconNoLogs() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6a2 2 0 0 1 2-2h7l5 5v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z" fill="rgba(255,255,255,0.85)"/>
      <path d="M13 4v5h5" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12h8M8 15h6" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
