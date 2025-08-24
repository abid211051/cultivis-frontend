"use client";

import { ChevronRight, CloudRain, CloudSunRain } from "lucide-react";
import Heading from "../divHeading";

export default function WeatherOverview() {
  return (
    <div className="bg-dark-surface shadow-xl rounded-2xl lg:max-h-full max-h-[350px] p-3">
      <div className="h-full rounded-xl overflow-y-auto flex flex-col scrollbar-hide">
        <Heading text={"Weather"} Icon={CloudSunRain}>
          <button className="p-2 bg-dark-light rounded-full hover:bg-dark-lighter transition-colors">
            <ChevronRight className="size-4 text-gray-400" />
          </button>
        </Heading>
        <div className="flex-1 flex flex-col gap-3 justify-between">
          <div className="flex items-center justify-around">
            <p className="text-6xl font-bold">21°</p>
            <div className="flex flex-col gap-1 text-right">
              <p className="flex items-center gap-1 text-lg font-medium">
                <CloudRain className="size-5" />
                Sunny
              </p>
              <p className="text-sm text-gray-400">31° / 11°</p>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-flow-col auto-cols-[minmax(100px,1fr)] overflow-x-auto gap-3 snap-x snap-mandatory scrollbar-hide scroll-smooth pr-6">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className="snap-start bg-dark-light px-3 py-2 rounded-xl text-center hover:bg-dark-lighter transition-colors"
                >
                  <p className="text-xs text-gray-400">Humidity</p>
                  <p className="font-semibold text-lg">{70 + (i % 20)}%</p>
                </div>
              ))}
            </div>
            <div className="absolute -right-0.5 top-0 h-full w-12 bg-gradient-to-l from-dark-surface to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
