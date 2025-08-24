"use client";
import {
  HeartHandshake,
  LayoutDashboard,
  ListTodo,
  MapIcon,
  Newspaper,
  User,
} from "lucide-react";
import Link from "next/link";
import React, { useMemo } from "react";

const NavLink = () => {
  const links = useMemo(
    () => [
      { href: "/dashboard/basic", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/basic/field", icon: MapIcon, label: "Field" },
      { href: "/dashboard/basic/task", icon: ListTodo, label: "Task" },
      { href: "/dashboard/basic", icon: HeartHandshake, label: "Community" },
      { href: "/dashboard/basic", icon: Newspaper, label: "News" },
      { href: "/dashboard/basic", icon: User, label: "User" },
    ],
    []
  );
  return (
    <>
      {links.map((link, i) => (
        <Link
          href={link.href}
          key={i}
          className={`lg:min-w-[110px] flex items-center justify-center gap-2 p-2.5 rounded-lg hover:bg-white hover:text-black`}
        >
          <link.icon />
          <span className={`lg:block hidden`}>{link.label}</span>
        </Link>
      ))}
    </>
  );
};

export default React.memo(NavLink);
