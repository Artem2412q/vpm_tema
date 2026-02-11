import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VPN «Тёма» — свобода в сети без границ",
  description:
    "Одностраничный лендинг VPN-сервиса «Тёма»: приватность, no-logs, защищённый туннель и понятные объяснения.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "VPN «Тёма»",
    description:
      "Тёма помогает безопасно выходить в интернет из любой точки мира — без слежки и лишних данных.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <a
          className="skip-link"
          href="#content"
        >
          Перейти к содержанию
        </a>
        {children}
      </body>
    </html>
  );
}
