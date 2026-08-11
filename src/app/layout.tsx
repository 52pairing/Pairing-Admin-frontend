import type { Metadata } from "next";

import AppShell from "@/features/common/components/AppShell";

import "./globals.css";

export const metadata: Metadata = {
  title: "Pairing 관리자",
  description: "Pairing 서비스 관리자 페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
