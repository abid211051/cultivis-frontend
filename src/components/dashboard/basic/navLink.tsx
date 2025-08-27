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
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const NavLink = () => {
  const pathname = usePathname();
  const links = useMemo(
    () => [
      { href: "/dashboard/basic", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/dashboard/basic/field", icon: MapIcon, label: "Field" },
      { href: "/dashboard/basic/task", icon: ListTodo, label: "Task" },
      {
        href: "/dashboard/community",
        icon: HeartHandshake,
        label: "Community",
      },
      { href: "/dashboard/news", icon: Newspaper, label: "News" },
      { href: "/dashboard/user", icon: User, label: "User" },
    ],
    []
  );
  return (
    <>
      {links.map((link, i) => (
        <Link
          href={link.href}
          key={i}
          className={`lg:min-w-[90px] font-medium flex items-center justify-center gap-2 p-2.5 rounded-full ${
            pathname === link.href && "bg-white text-black"
          }`}
        >
          <link.icon className="size-5" />
          <span className={`lg:block hidden`}>{link.label}</span>
        </Link>
      ))}
    </>
  );
};

export default React.memo(NavLink);
