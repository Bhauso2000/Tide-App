import { useEffect, useState } from "react";
import TideInfo from "./components/TideInfo";
import TideTimeline from "./components/TideTimeline";
import MapView from "./components/MapView";
import { LOCAL_STORAGE_KEY } from "./constants/constants";
import { useTideData } from "./hooks/useTideQuery";
import Loader from "./components/Loader";

export default function App() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setCoords(JSON.parse(saved));
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(c));
          setCoords(c);
        },
        () => alert("Unable to fetch location")
      );
    }
  }, []);

  const { data,isFetching, error, refetch } = useTideData(coords?.lat ?? null, coords?.lng ?? null);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">🌊 Tides Information</h1>
      <p className="text-gray-600 mb-6">See nearest coast, tides, and safe time window.</p>

      {(isFetching) && <Loader />}

      {error && (
        <div className="bg-red-100 border border-red-300 p-4 rounded transition-all duration-300">
          Error: {error.message}
        </div>
      )}

      {data && (
        <div className="space-y-6 animate-fadeIn">
          <TideInfo data={data} />
          <TideTimeline data={data} />
          <MapView data={data} />
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setCoords(null);
            window.location.reload();
          }}
        >
          Clear Location
        </button>
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded shadow hover:bg-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => refetch()}
        >
          Refresh Data
        </button>
      </div>

      
    </div>
  );
}
