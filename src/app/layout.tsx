import type { Metadata } from "next";

import AdminSidebar from "@/features/common/components/SideBar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Pairing 관리자",
  description: "Pairing 서비스 관리자 페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen">
        <AdminSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </body>
    </html>
  );
}
