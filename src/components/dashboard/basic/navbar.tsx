"use client";
import { Grip } from "lucide-react";
import NavLink from "./navLink";
import React, { useRef, useState } from "react";

export default function BasicUserNavbar() {
  const [position, setPosition] = useState<{
    top: number;
    left?: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const mainDiv = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ x: 0, y: 0 });
  const handlePointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (!mainDiv.current) return;
    const rect = mainDiv.current.getBoundingClientRect();
    dragRef.current = {
      x: ev.clientX - rect.left,
      y: ev.clientY - rect.top,
    };
    setPosition({
      top: rect.top,
      left: rect.left,
    });
    setIsDragging(true);
    ev.currentTarget.setPointerCapture(ev.pointerId);
  };

  const handlePointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      top: ev.clientY - dragRef.current.y,
      left: ev.clientX - dragRef.current.x,
    });
  };
  const handlePointerUp = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (position?.top) {
      const ismidCross = position.top > window.innerHeight / 2;
      ismidCross ? setPosition({ top: 98 }) : setPosition(null);
    }
    setIsDragging(false);
  };
  return (
    <div
      ref={mainDiv}
      className={`absolute bg-dark-surface flex rounded-lg`}
      style={
        isDragging
          ? { top: `${position?.top}px`, left: `${position?.left}px`, gap: 0 }
          : {
              top: `${position?.top || 2}%`,
              left: `50%`,
              gap: 15,
              transform:
                position?.top === 98
                  ? `translate(-50%, -100%)`
                  : `translate(-50%, 0%)`,
            }
      }
    >
      <div
        className={`min-w-[40px] flex items-center justify-center cursor-grab`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          touchAction: "none",
        }}
      >
        <Grip />
      </div>
      <div
        className={`flex gap-2 overflow-x-scroll scrollbar-hide  items-center justify-between ${
          isDragging ? "w-[0px]" : "lg:w-[750px] sm:w-[400px] w-[270px]"
        } duration-300 ease-in-out`}
      >
        <NavLink />
      </div>
    </div>
  );
}
