import Hero from "@/components/Hero";
import TimeBlock from "@/components/TimeBlock";
import BlockedSection from "@/components/BlockedSection";
import WhySection from "@/components/WhySection";
import TrustSection from "@/components/TrustSection";
import FooterCTA from "@/components/FooterCTA";
import Section from "@/components/Section";

export default function Page() {
  return (
    <main id="content" className="min-h-screen">
      <Hero />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <div className="hr-soft my-10" aria-hidden="true" />
        <Section
          id="time"
          eyebrow="Живое время"
          title="Вы видите разницу здесь и сейчас"
          subtitle="Локальное время вашего устройства и время «страны выхода» обновляются каждую секунду — чтобы было понятно, что меняется."
        >
          <TimeBlock />
        </Section>

        <div className="hr-soft my-12" aria-hidden="true" />
        <BlockedSection />

        <div className="hr-soft my-12" aria-hidden="true" />
        <WhySection />

        <div className="hr-soft my-12" aria-hidden="true" />
        <TrustSection />

        <div className="hr-soft my-12" aria-hidden="true" />
        <FooterCTA />
      </div>
    </main>
  );
}
