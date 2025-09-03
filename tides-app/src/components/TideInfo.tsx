import { useMemo } from "react";
import type { NearestCoastData } from "../types/types";
import { formatLocal, timeUntil } from "../utils/timeUtils";
import { SAFE_TIDE_HEIGHT_THRESHOLD } from "../constants/constants";

export default function TideInfo({ data }: { data: NearestCoastData }) {
  const { nextHigh, nextLow, timezone, timeline } = data;
  const currentTime = formatLocal(new Date().toISOString(), timezone);

  const hasSafeWindow = useMemo(() => computeSafeWindow(timeline), [timeline]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 max-w-3xl mx-auto transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300">
      <h2 className="text-2xl font-bold mb-1">{data.coastName}</h2>
      <p className="text-gray-500 mb-2">Location: {data.locationLabel}</p>
      <p className="text-gray-700 font-medium mb-4">Current: {currentTime}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TideCard label="⬆️ Next High Tide" tide={nextHigh} timezone={timezone} />
        <TideCard label="⬇️ Next Low Tide" tide={nextLow} timezone={timezone} />
      </div>

      <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 transition-colors duration-500 hover:bg-blue-100">
        <h4 className="font-semibold mb-2">🔔 Safe Time Window</h4>
        <p>
          {hasSafeWindow
            ? `Some upcoming hours have tide < ${SAFE_TIDE_HEIGHT_THRESHOLD} m — perfect for beach activities.`
            : "No clear safe window identified."}
        </p>
      </div>
    </div>
  );
}

function TideCard({ label, tide, timezone }: { label: string; tide?: { date: string; height?: number }; timezone: string }) {
  const heightColor = tide?.height
    ? tide.height < SAFE_TIDE_HEIGHT_THRESHOLD
      ? "text-green-600"
      : tide.height < SAFE_TIDE_HEIGHT_THRESHOLD * 1.5
      ? "text-yellow-600"
      : "text-red-600"
    : "text-gray-400";

  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition-transform transform hover:scale-105 duration-300">
      <h4 className="font-semibold mb-2">{label}</h4>
      {tide ? (
        <>
          <p className="text-gray-700">{formatLocal(tide.date, timezone)}</p>
          <p className="text-gray-600">In: {timeUntil(tide.date, timezone)}</p>
          <p className={`${heightColor} font-medium mt-1`}>Height: {tide.height ?? "N/A"} m</p>
        </>
      ) : (
        <p className="text-gray-400">N/A</p>
      )}
    </div>
  );
}

function computeSafeWindow(timeline: { timeISO: string; height: number }[]) {
  return timeline.some((t) => t.height < SAFE_TIDE_HEIGHT_THRESHOLD);
}
