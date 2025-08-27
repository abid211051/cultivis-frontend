"use client";
import { useState, useRef, useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart"; // shadcn chart wrappers

type DataPoint = { date: string; value: number };

export default function ZoomableChart() {
  // ✅ Generate dataset only once (no random re-gen on re-render)
  const data: DataPoint[] = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      date: new Date(Date.now() + i * 60000).toISOString(),
      value: Math.sin(i / 10) * 10 + 50, // fixed curve (no randomness)
    }));
  }, []);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(data.length - 1);
  const chartRef = useRef<HTMLDivElement>(null);

  const zoomedData = useMemo(() => {
    return data.slice(startIndex, endIndex + 1);
  }, [startIndex, endIndex, data]);

  const handleZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!chartRef.current) return;

    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;

    const zoomStep = Math.max(1, Math.floor(data.length * 0.05));
    const windowSize = endIndex - startIndex + 1;

    if (e.deltaY < 0 && windowSize > zoomStep * 2) {
      const leftCrop = Math.floor(zoomStep * ratio);
      const rightCrop = zoomStep - leftCrop;
      setStartIndex((s) => Math.min(s + leftCrop, endIndex - 2));
      setEndIndex((e) => Math.max(e - rightCrop, startIndex + 2));
    } else if (e.deltaY > 0) {
      const leftExpand = Math.floor(zoomStep * ratio);
      const rightExpand = zoomStep - leftExpand;
      setStartIndex((s) => Math.max(0, s - leftExpand));
      setEndIndex((e) => Math.min(data.length - 1, e + rightExpand));
    }
  };

  const formatXAxis = (tick: string) => {
    const d = new Date(tick);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      ref={chartRef}
      className="w-full h-[400px] bg-dark-light rounded-xl"
      onWheel={handleZoom}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ChartContainer
          className="w-full h-full"
          config={{
            value: {
              label: "Value",
              color: "#8884d8",
            },
          }}
        >
          <ComposedChart data={zoomedData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              style={{ fontSize: "10px" }}
            />
            <YAxis style={{ fontSize: "10px" }} width={35} />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  className="text-black content-center"
                />
              }
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              isAnimationActive={false}
              dot={{ r: 3, stroke: "#4f46e5", fill: "#fff", strokeWidth: 2 }}
              activeDot={{
                r: 5,
                stroke: "#4f46e5",
                fill: "#fff",
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
