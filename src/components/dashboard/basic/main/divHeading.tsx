import React from "react";

type HeadingContent = {
  text: string;
  Icon: React.ComponentType<any>;
  txtSize?: "sm" | "lg" | "xl";
  className?: string;
  children?: React.ReactNode;
};

export default function Heading({
  text,
  Icon,
  txtSize = "sm",
  className,
  children,
}: HeadingContent) {
  return (
    <div
      className={`relative flex flex-wrap items-center justify-between ${className}`}
    >
      <p
        className={`text-${txtSize} font-semibold text-gray-400 tracking-wide flex items-center gap-1.5`}
      >
        <Icon
          className={`${
            txtSize === "sm" ? "size-4" : txtSize === "lg" ? "size-5" : "size-6"
          }`}
        />
        {text}
      </p>
      {children}
    </div>
  );
}
