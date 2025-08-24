import BasicUserNavbar from "@/src/components/dashboard/basic/navbar";
import React from "react";

export default function BasicUserLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`antialiased relative flex flex-col max-h-screen bg-dark text-dark-text`}
    >
      <BasicUserNavbar />
      <main>{children}</main>
    </div>
  );
}
