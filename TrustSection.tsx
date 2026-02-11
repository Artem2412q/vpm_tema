"use client";

import Section from "@/components/Section";

const POINTS = [
  { title: "No‑logs", desc: "Не храним историю действий и не ведём журналы активности." },
  { title: "Защита в публичных сетях", desc: "В кафе, отеле или аэропорту шифрование помогает снизить риски." },
  { title: "Свобода чтения и общения", desc: "Вы выбираете страну выхода и получаете более стабильный доступ к информации." },
  { title: "Прозрачные принципы", desc: "Говорим честно: VPN — это защита канала, а не «невидимость»." }
];

export default function TrustSection() {
  return (
    <Section
      id="privacy"
      eyebrow="Privacy‑first"
      title="Мы не храним данные"
      subtitle="Это главный принцип. Мы проектируем систему так, чтобы не создавать лишних журналов о вашей активности."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="glass rounded-xl2 border border-border/60 p-6 sm:p-8 shadow-soft">
          <p className="text-4xl sm:text-5xl font-semibold leading-[1.05]">
            Мы не храним <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--accent))] to-[hsl(var(--accent2))]">данные</span>.
          </p>
          <p className="mt-4 text-sm text-muted/90 leading-relaxed">
            Под «данными» мы имеем в виду историю посещений, содержимое трафика, подробные журналы активности.
            Технические метрики, необходимые для работы сервиса (например, кратковременная диагностика ошибок),
            стараемся минимизировать и хранить ограниченно.
          </p>

          <div className="mt-6 rounded-xl2 border border-border/60 bg-white/5 p-4">
            <p className="text-sm font-semibold">Дисклеймер</p>
            <p className="mt-2 text-sm text-muted/90 leading-relaxed">
              VPN не делает вас невидимыми для всего на свете — но защищает канал и снижает риски.
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {POINTS.map((p) => (
            <div key={p.title} className="glass rounded-xl2 border border-border/60 p-5">
              <p className="text-sm text-muted/80">{p.title}</p>
              <p className="mt-1 text-base font-semibold">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
