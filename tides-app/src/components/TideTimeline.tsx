import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import type { NearestCoastData } from "../types/types";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale);

export default function TideTimeline({ data }: { data: NearestCoastData }) {
  const chartData = {
    labels: data.timeline.map((t) => t.timeISO),
    datasets: [
      {
        label: "Tide Height (m)",
        data: data.timeline.map((t) => t.height),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",  
        fill: true,
        tension: 0.3,  
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
  maintainAspectRatio: false,
  scales: {
    x: { 
      type: "time" as const, 
      grid: { color: "#e5e7eb" } 
    },
    y: { 
      grid: { color: "#e5e7eb" } 
    },
  },
  plugins: {
    tooltip: { 
      mode: "index" as const, 
      intersect: false 
    },
    legend: { display: true, position: "top" as const },
  },
  interaction: { 
    mode: "nearest" as const, 
    axis: "x" as const, 
    intersect: false 
  },
};


  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 mb-4 transform transition-transform duration-300 hover:scale-[1.02]">
      <h3 className="text-lg font-semibold mb-2">🌊 Tide Timeline</h3>
      <div className="h-80">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
