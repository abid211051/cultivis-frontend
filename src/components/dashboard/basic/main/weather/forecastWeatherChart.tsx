"use client";

import type React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/components/ui/select";
import Heading from "../divHeading";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/src/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Clock,
  Calendar,
  Thermometer,
  CloudRain,
  TrendingUpDown,
} from "lucide-react";
import { useState } from "react";
import { weatherdivHeight } from "./weatherConfig";

const config = {
  temperature: { label: "Temp(°C)", color: "var(--chart-1)" },
  rainfall: { label: "Rain(mm)", color: "var(--chart-2)" },
} satisfies ChartConfig;

const hourlyData = [
  { time: "12:00", temperature: 19, rainfall: 0.25 },
  { time: "14:00", temperature: 20, rainfall: 0.2 },
  { time: "16:00", temperature: 18, rainfall: 0.01 },
  { time: "18:00", temperature: 17, rainfall: 0.0 },
  { time: "20:00", temperature: 16, rainfall: 0.0 },
  { time: "22:00", temperature: 11, rainfall: 0.02 },
  { time: "00:00", temperature: 8, rainfall: 0.05 },
  { time: "02:00", temperature: 6, rainfall: 0.0 },
  { time: "04:00", temperature: 2, rainfall: 0.0 },
  { time: "06:00", temperature: 1, rainfall: 0.0 },
  { time: "08:00", temperature: 2, rainfall: 0.0 },
  { time: "10:00", temperature: 7, rainfall: 0.0 },
];

const weeklyData = [
  { day: "21 Jan", temperature: 19, rainfall: 0.25 },
  { day: "22 Jan", temperature: 20, rainfall: 0.2 },
  { day: "23 Jan", temperature: 18, rainfall: 0.01 },
  { day: "24 Jan", temperature: 17, rainfall: 0.0 },
  { day: "25 Jan", temperature: 16, rainfall: 0.2 },
  { day: "26 Jan", temperature: 11, rainfall: 0.0 },
  { day: "27 Jan", temperature: 8, rainfall: 0.0 },
];

function ResponsiveSelectTrigger({
  value,
  iconMap,
  className,
}: {
  value: string;
  iconMap: Record<string, { icon: React.ComponentType<any>; label: string }>;
  className?: string;
}) {
  const currentOption = iconMap[value];
  const Icon = currentOption?.icon;

  return (
    <SelectTrigger size="sm" className={className}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="size-4 text-gray-400" />}
      </div>
    </SelectTrigger>
  );
}

export default function ForecastWeather() {
  const [timeValue, setTimeValue] = useState("hourly");
  const [dataValue, setDataValue] = useState("temperature");

  const timeIconMap = {
    hourly: { icon: Clock, label: "Hourly" },
    weekly: { icon: Calendar, label: "Weekly" },
  };

  const dataIconMap = {
    temperature: { icon: Thermometer, label: "Temperature" },
    rainfall: { icon: CloudRain, label: "Rainfall" },
  };

  return (
    <div
      className={`bg-dark-surface shadow-xl rounded-2xl p-3 ${weatherdivHeight} overflow-hidden`}
    >
      <div className="flex flex-col overflow-x-auto  gap-3 justify-between h-full overflow-y-scroll scrollbar-hide rounded-md">
        <Heading text={"Forecast"} Icon={TrendingUpDown}>
          <div className="flex gap-2">
            <Select value={timeValue} onValueChange={setTimeValue}>
              <ResponsiveSelectTrigger
                value={timeValue}
                iconMap={timeIconMap}
                className="outline-0 border-none bg-dark-light rounded-xl text-gray-300 px-2.5 py-2"
              />
              <SelectContent>
                <SelectItem value="hourly">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Hourly
                  </div>
                </SelectItem>
                <SelectItem value="weekly">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Weekly
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select value={dataValue} onValueChange={setDataValue}>
              <ResponsiveSelectTrigger
                value={dataValue}
                iconMap={dataIconMap}
                className="outline-0 border-none bg-dark-light rounded-xl text-gray-300 px-2.5 py-2"
              />
              <SelectContent>
                <SelectItem value="temperature">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Temperature
                  </div>
                </SelectItem>
                <SelectItem value="rainfall">
                  <div className="flex items-center gap-2">
                    <CloudRain className="h-4 w-4" />
                    Rainfall
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Heading>

        <ChartContainer
          config={config}
          className="h-[70%] aspect-auto w-full overflow-x-auto scrollbar-hide"
        >
          <AreaChart
            accessibilityLayer
            data={timeValue === "hourly" ? hourlyData : weeklyData}
            margin={{ left: 5, right: 5, top: 25 }}
          >
            <YAxis
              dataKey={dataValue}
              width={20}
              minTickGap={20}
              tickFormatter={(value, index) => {
                const v = Number(value);
                return `${value}`.includes(".") ? `${v.toFixed(1)}` : `${v}`;
              }}
            />
            <XAxis
              dataKey={timeValue === "hourly" ? "time" : "day"}
              height={24}
              tickMargin={10}
              minTickGap={20}
              tick={({ x, y, payload }) => {
                const [day, month] = payload.value.split(" ");
                return (
                  <text
                    x={x}
                    y={y + 2}
                    textAnchor="middle"
                    fill="#9ca3af"
                    fontSize={12}
                  >
                    <tspan x={x} dy="0">
                      {day}
                    </tspan>
                    <tspan x={x} dy="1em">
                      {month}
                    </tspan>
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
              dataKey={dataValue}
              type="monotone"
              fill={`var(--color-${dataValue})`}
              fillOpacity={0.4}
              stroke={`var(--color-${dataValue})`}
              stackId="temperature"
              dot
            ></Area>
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
