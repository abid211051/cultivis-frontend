import Image from "next/image";
import { ClipboardList, LayoutIcon, MapPlusIcon } from "lucide-react";

export default function AuthAnimateComponent() {
  return (
    <div className="lg:block hidden relative xl:w-[70%] w-[90%] h-[90%]">
      <div className="square box1 bg-[#33602E]/40 border-2 border-[#12d5b8] flex items-center justify-center">
        <Image
          src={"/CultiVis.png"}
          alt="logo"
          width={100}
          height={100}
          priority
          className="rounded-md"
        />
      </div>
      <div className="square box2 bg-[#33602E]/40 border-2 border-[#12d5b8] flex flex-col justify-between gap-6 p-4">
        <ClipboardList size={30} />
        <p>
          Track Tasks, Stay Up to Date with Our{" "}
          <span className="text-amber-400">Todo List</span> Feauture
        </p>
      </div>
      <div className="square box3 bg-[#33602E]/40 border-2 border-[#12d5b8] flex flex-col justify-between gap-6 p-4">
        <LayoutIcon size={30} />
        <p>
          Your Entire Field at a Glance Powered by Our Interactive, Insight-rich{" "}
          <span className="text-amber-400">Dashboard</span>
        </p>
      </div>
      <div className="square box4 bg-[#33602E]/40 border-2 border-[#12d5b8] flex flex-col justify-between gap-6 p-4">
        <MapPlusIcon size={30} />
        <p>
          Create Fields and Track Crop Health from Anywhere Using Our Smart{" "}
          <span className="text-amber-400">Map </span> Tool.
        </p>
      </div>
    </div>
  );
}
