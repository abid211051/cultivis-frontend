import { ChevronRight, ClipboardList, Clock } from "lucide-react";
import Heading from "../divHeading";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { taskdivHeight } from "./taskConfig";

interface TaskItemProps {
  time: string;
  description: string;
}

function TaskItem({ time, description }: TaskItemProps) {
  return (
    <Popover>
      <PopoverTrigger className="text-start active:scale-95">
        <p className="flex items-center gap-1 font-medium text-sm">
          <Clock className="size-3.5" />
          <span>{time}</span>
        </p>
        <p className="line-clamp-2 text-sm text-gray-400">{description}</p>
      </PopoverTrigger>
      <PopoverContent>
        <p className="flex items-center gap-1 font-medium text-sm">
          <Clock className="size-3.5" />
          <span>{time}</span>
        </p>
        <p className="text-sm text-gray-700">{description}</p>
      </PopoverContent>
    </Popover>
  );
}

export default function TaskComponent() {
  const upcomingTask = {
    time: "Fri 10:00 AM",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum, quaerat! Lorem ipsum dolor sit amet consectetur.",
  };

  const todaysTasks = [
    {
      time: "10:20",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Das adsad da asdasd adsad asasw wre wffwsfwe adsqw",
    },
    {
      time: "11:00",
      description:
        "Another task description that might be longer than two lines.",
    },
    {
      time: "11:00",
      description:
        "Another task description that might be longer than two lines.",
    },
    {
      time: "11:00",
      description:
        "Another task description that might be longer than two lines.",
    },
  ];

  return (
    <div
      className={`bg-dark-surface relative flex gap-4 rounded-2xl ${taskdivHeight} p-3`}
    >
      <div className="flex-1 flex flex-col gap-2 justify-between overflow-hidden">
        <Heading Icon={ClipboardList} text="Tasks" txtSize="xl">
          <Link
            href={"#"}
            className="p-2 bg-dark-light rounded-full hover:bg-dark-lighter transition-colors"
          >
            <ChevronRight className="size-4" />
          </Link>
        </Heading>

        <div className="flex flex-col items-center gap-2">
          <div className="relative w-26 h-26">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="52"
                cy="52"
                r="48"
                stroke="gray"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="52"
                cy="52"
                r="48"
                stroke="var(--chart-1)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={(1 - 0.9) * 2 * Math.PI * 46}
              />
            </svg>
            <div className="absolute flex flex-col justify-center items-center inset-0 text-lg font-semibold">
              <span>90%</span>
              <span className="text-xs text-dark-text-secondary">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Task */}
        <div className="flex flex-col gap-1 bg-dark-light border-primary p-2 rounded-lg shadow-sm overflow-y-auto scrollbar-hide">
          <p className="lg:text-lg font-semibold">Upcoming Task</p>
          <TaskItem
            time={upcomingTask.time}
            description={upcomingTask.description}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="relative flex-1 flex flex-col">
        <p className="lg:text-lg font-semibold mb-2">Today's Tasks</p>
        <ul className="h-full overflow-y-auto scrollbar-hide scroll-smooth flex flex-col  gap-2">
          {todaysTasks.length ? (
            todaysTasks.map((task, i) => (
              <li
                key={i}
                className="flex justify-between items-start py-2.5 border-b-2 border-dashed"
              >
                <TaskItem time={task.time} description={task.description} />
                <input
                  type="checkbox"
                  className="scale-110 accent-primary mt-1.5"
                />
              </li>
            ))
          ) : (
            <div className="h-full flex flex-col justify-center">
              <p className="text-center">No Tasks Today!</p>
            </div>
          )}
        </ul>
        <div className="absolute -bottom-0.5 left-0 w-full h-14 bg-gradient-to-t from-dark-surface/100 to-dark-surface/10 pointer-events-none" />
      </div>
    </div>
  );
}
