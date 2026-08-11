import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-6xl font-bold text-slate-900">404</p>

      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
        </p>
      </div>

      <Link
        href="/"
        className="mt-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
