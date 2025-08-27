"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";
import { useRef, useState } from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";

interface ChartProps {
  data: object[] | [];
  config: Record<string, { label: string; color: string }>;
  xValue: string;
  yValue: string;
}

export default function ReuseableChart({
  data,
  config,
  xValue,
  yValue,
}: ChartProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(data.length - 1);
  const chartRef = useRef<HTMLDivElement>(null);

  const MIN_WINDOW = 2;
  const ZOOM_FACTOR = 0.2;
  // Zoom in out in chart
  const handleWheel = (e: React.WheelEvent) => {
    if (!chartRef.current) return;

    const totalWindow = endIndex - startIndex + 1;
    const rect = chartRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const anchorIndex = startIndex + Math.floor(totalWindow * ratio);

    let newWindow = totalWindow;

    if (e.deltaY < 0 && totalWindow > MIN_WINDOW) {
      newWindow = Math.max(
        MIN_WINDOW,
        Math.floor(totalWindow * (1 - ZOOM_FACTOR))
      );
    } else if (e.deltaY > 0) {
      newWindow = Math.min(
        data.length,
        Math.ceil(totalWindow * (1 + ZOOM_FACTOR))
      );
    } else {
      return;
    }

    let newStart = anchorIndex - Math.floor(newWindow * ratio);
    let newEnd = newStart + newWindow - 1;

    if (newStart < 0) {
      newStart = 0;
      newEnd = newWindow - 1;
    }
    if (newEnd >= data.length) {
      newEnd = data.length - 1;
      newStart = newEnd - newWindow + 1;
      if (newStart < 0) newStart = 0;
    }

    setStartIndex(newStart);
    setEndIndex(newEnd);
  };

  const visibleData = data.slice(startIndex, endIndex + 1);

  return (
    <>
      <ChartContainer
        ref={chartRef}
        config={config}
        className="h-[70%] aspect-auto w-full overflow-hidden"
        onWheel={handleWheel}
      >
        <AreaChart
          accessibilityLayer
          data={visibleData}
          margin={{ left: 5, right: 5, top: 25 }}
        >
          <YAxis
            dataKey={yValue}
            width={20}
            minTickGap={20}
            tickFormatter={(value) => {
              const v = Number(value);
              return `${value}`.includes(".") ? `${v.toFixed(1)}` : `${v}`;
            }}
          />
          <XAxis
            dataKey={xValue}
            height={24}
            minTickGap={20}
            tick={({ x, y, payload }) => {
              return (
                <text
                  x={x}
                  y={y + 12}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize={12}
                >
                  {payload.value}
                </text>
              );
            }}
          />
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
            dataKey={yValue}
            type="monotone"
            fill={`var(--color-${yValue})`}
            fillOpacity={0.4}
            stroke={`var(--color-${yValue})`}
            // stackId="temperature" // need unique stack id when multiple <Area/> component display at a time
            dot
          />
        </AreaChart>
      </ChartContainer>
    </>
  );
}
