import moment from "moment-timezone";

export function getUserTimezone(): string {
  return moment.tz.guess();
}

export function formatLocal(iso: string, tz?: string, fmt = "YYYY-MM-DD HH:mm z") {
  return moment.tz(iso, tz ?? getUserTimezone()).format(fmt);
}

export function timeUntil(iso: string, tz?: string) {
  const now = moment.tz(tz ?? getUserTimezone());
  const then = moment.tz(iso, tz ?? getUserTimezone());
  const diffM = then.diff(now, "minutes");
  if (diffM <= 0) return "Now";
  const h = Math.floor(diffM / 60);
  const m = diffM % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
