export type CountryKey = "NL" | "DE" | "FI" | "SE" | "US";

export type CountryMeta = {
  label: string;
  // для 3D дуги
  lat: number;
  lon: number;
  // для блока времени
  timeZone: string;
};

export const COUNTRIES: Record<CountryKey, CountryMeta> = {
  // Где менять страны/координаты/таймзоны:
  // 1) lat/lon — для дуги на Земле
  // 2) timeZone — IANA timezone
  NL: { label: "Нидерланды", lat: 52.37, lon: 4.90, timeZone: "Europe/Amsterdam" },
  DE: { label: "Германия", lat: 52.52, lon: 13.40, timeZone: "Europe/Berlin" },
  FI: { label: "Финляндия", lat: 60.17, lon: 24.94, timeZone: "Europe/Helsinki" },
  SE: { label: "Швеция", lat: 59.33, lon: 18.07, timeZone: "Europe/Stockholm" },
  US: { label: "США (Нью‑Йорк)", lat: 40.71, lon: -74.01, timeZone: "America/New_York" }
};

// «Россия» — точка старта дуги (метафора)
export const RUSSIA_POINT = { lat: 55.75, lon: 37.62 }; // Москва как условный центр
