"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import AdminSidebar from "./SideBar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth/");

  if (isAuthPage) {
    return children;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="scrollbar-hidden min-w-0 flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
