export function getNow() {
  return new Date();
}

export function formatTime(date: Date, timeZone?: string) {
  const fmt = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone
  });
  return fmt.format(date);
}
