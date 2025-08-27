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
  Clock,
  Calendar,
  Thermometer,
  CloudRain,
  TrendingUpDown,
} from "lucide-react";
import { useState } from "react";
import { weatherdivHeight } from "./weatherConfig";
import ReuseableChart from "../reusableChart";

const config = {
  temperature: { label: "Temp(°C)", color: "var(--chart-1)" },
  rainfall: { label: "Rain(mm)", color: "var(--chart-2)" },
};

const hourlyData = [
  { hourly: "12:00", temperature: 19, rainfall: 0.25 },
  { hourly: "14:00", temperature: 20, rainfall: 0.2 },
  { hourly: "16:00", temperature: 18, rainfall: 0.01 },
  { hourly: "18:00", temperature: 17, rainfall: 0.0 },
  { hourly: "20:00", temperature: 16, rainfall: 0.0 },
  { hourly: "22:00", temperature: 11, rainfall: 0.02 },
  { hourly: "00:00", temperature: 8, rainfall: 0.05 },
  { hourly: "02:00", temperature: 6, rainfall: 0.0 },
  { hourly: "04:00", temperature: 2, rainfall: 0.0 },
  { hourly: "06:00", temperature: 1, rainfall: 0.0 },
  { hourly: "08:00", temperature: 2, rainfall: 0.0 },
  { hourly: "10:00", temperature: 7, rainfall: 0.0 },
];

const weeklyData = [
  { weekly: "21 Jan", temperature: 19, rainfall: 0.25 },
  { weekly: "22 Jan", temperature: 20, rainfall: 0.2 },
  { weekly: "23 Jan", temperature: 18, rainfall: 0.01 },
  { weekly: "24 Jan", temperature: 17, rainfall: 0.0 },
  { weekly: "25 Jan", temperature: 16, rainfall: 0.2 },
  { weekly: "26 Jan", temperature: 11, rainfall: 0.0 },
  { weekly: "27 Jan", temperature: 8, rainfall: 0.0 },
];

const timeIconMap = {
  hourly: { icon: Clock, label: "Hourly" },
  weekly: { icon: Calendar, label: "Weekly" },
};

const dataIconMap = {
  temperature: { icon: Thermometer, label: "Temperature" },
  rainfall: { icon: CloudRain, label: "Rainfall" },
};

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
  const [xValue, setxValue] = useState("hourly");
  const [yValue, setyValue] = useState("temperature");

  const data = xValue === "hourly" ? hourlyData : weeklyData;

  return (
    <div
      className={`bg-dark-surface shadow-xl rounded-2xl p-3 ${weatherdivHeight} overflow-hidden`}
    >
      <div className="flex flex-col gap-3 justify-between h-full overflow-y-auto scrollbar-hide">
        <Heading text={"Forecast"} Icon={TrendingUpDown}>
          <div className="flex gap-2">
            <Select value={xValue} onValueChange={setxValue}>
              <ResponsiveSelectTrigger
                value={xValue}
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

            <Select value={yValue} onValueChange={setyValue}>
              <ResponsiveSelectTrigger
                value={yValue}
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
        <ReuseableChart
          data={data || []}
          config={config}
          xValue={xValue}
          yValue={yValue}
        />
      </div>
    </div>
  );
}
