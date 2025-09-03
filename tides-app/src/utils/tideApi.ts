import api from "../plugins/axios";
import type { TideApiResponse, TideExtreme, NearestCoastData } from "../types/types";
import { TideEventType, SafetyStatus } from "../types/types";
import { SAFE_TIDE_HEIGHT_THRESHOLD, UNSAFE_TIDE_HEIGHT_THRESHOLD } from "../constants/constants";
import { getUserTimezone } from "./timeUtils";

export async function fetchTideExtremes(lat: number, lng: number): Promise<TideApiResponse | null> {
  try {
    const res = await api.get("", {
      params: {
        extremes: "",
        lat,
        lon: lng,
        length: 48 * 3600,
      },
    });
    return res.data as TideApiResponse;
  } catch (err) {
    console.error("fetchTideExtremes error:", err);
    return null;
  }
}

function nextExtreme(extremes: TideExtreme[], type: TideEventType) {
  const now = Date.now();
  return extremes
    .map((e) => ({ ...e, t: new Date(e.date).getTime() }))
    .filter((e) => e.type === type && e.t > now)
    .sort((a, b) => a.t - b.t)[0];
}

function safetyStatus(high?: TideExtreme): SafetyStatus {
  const h = high?.height;
  if (h == null) return SafetyStatus.Caution;
  if (h <= SAFE_TIDE_HEIGHT_THRESHOLD) return SafetyStatus.Safe;
  if (h >= UNSAFE_TIDE_HEIGHT_THRESHOLD) return SafetyStatus.Unsafe;
  return SafetyStatus.Caution;
}

export async function getNearestCoastData(lat: number, lng: number): Promise<NearestCoastData | null> {
  const raw = await fetchTideExtremes(lat, lng);
  if (!raw) return null;

  const tz = getUserTimezone();
  const extremes = raw.extremes ?? [];

  const nextHigh = nextExtreme(extremes, TideEventType.High);
  const nextLow = nextExtreme(extremes, TideEventType.Low);
  const safety = safetyStatus(nextHigh);

  const timeline = extremes.slice(0, 12).map((e) => ({
    timeISO: e.date,
    height: e.height ?? 0,
  }));

  return {
    coastName: "Nearest Coast",
    locationLabel: `${lat.toFixed(3)}, ${lng.toFixed(3)}`,
    lat,
    lng,
    nextHigh,
    nextLow,
    timeline,
    timezone: tz,
    safety,
  };
}
