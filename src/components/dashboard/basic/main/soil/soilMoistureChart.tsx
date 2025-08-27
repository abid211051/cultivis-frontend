"use client";

import { Droplets } from "lucide-react";
import Heading from "../divHeading";
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

export default function SoilMoisture() {
  return (
    <div className="bg-dark-surface shadow-xl lg:h-full h-[300px] rounded-2xl p-3 overflow-hidden">
      <div className="flex flex-col gap-3 justify-between h-full overflow-y-auto scrollbar-hide">
        <Heading Icon={Droplets} text="Soil Moisture History"></Heading>
        <ReuseableChart
          data={hourlyData}
          config={config}
          xValue="hourly"
          yValue="rainfall"
        />
      </div>
    </div>
  );
}
