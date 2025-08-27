"use client";

import { Droplets } from "lucide-react";
import Heading from "../divHeading";

export default function SoilMoisture() {
  return (
    <div className="bg-dark-surface lg:h-full h-[300px] rounded-2xl p-3 overflow-hidden">
      <Heading Icon={Droplets} text="Soil Moisture History"></Heading>
    </div>
  );
}
