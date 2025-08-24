import { ClipboardList, Clock } from "lucide-react";
import Heading from "../divHeading";

export default function TaskComponent() {
  return (
    <div className="bg-dark-surface flex gap-4 rounded-2xl lg:max-h-full max-h-[350px] p-3">
      <div className="flex-1 flex flex-col gap-2 justify-between overflow-hidden">
        <Heading Icon={ClipboardList} text="Tasks" txtSize="xl" />
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-25 h-25">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="gray"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="var(--chart-1)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={(1 - 0.9) * 2 * Math.PI * 46}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
              90%
            </div>
          </div>
          <span className="text-sm text-dark-text-secondary">Completed</span>
        </div>
        <div className="flex flex-col gap-2 bg-dark-light border-primary p-2 rounded-lg shadow-sm overflow-y-auto scrollbar-hide">
          <p className="font-semibold">Upcoming Task</p>
          <div>
            <p className="flex gap-2 items-center text-sm text-dark-text-secondary">
              <Clock className="size-4" />
              <span>Fri 10:00 AM</span>
            </p>
            <p className="line-clamp-2 text-sm mt-1 text-gray-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum,
              quaerat! Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <p className="text-lg font-semibold mb-2">Today's Tasks</p>
        <ul className="overflow-y-auto scrollbar-hide scroll-smooth">
          {Array.from({ length: 14 }, (_, i) => (
            <li
              key={i}
              className="flex justify-between items-start py-2.5 border-b-2 border-dashed"
            >
              <div className="flex flex-col pr-1">
                <span className="flex items-center gap-1 font-medium text-sm">
                  <Clock className="size-3" />
                  10:00
                </span>
                <p className="line-clamp-2 text-sm text-gray-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.das
                  adsad da asdasd adsad asasw wre wffwsfwe adsqw
                </p>
              </div>
              <input
                type="checkbox"
                className="scale-110 accent-primary mt-1.5"
              />
            </li>
          ))}
        </ul>
        <button className="absolute bottom-0 bg-gradient-to-l from-dark-surface to-transparent pointer-events-none">
          See More →
        </button>
      </div>
    </div>
  );
}
