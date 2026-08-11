import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-6xl font-bold text-slate-900">403</p>

      <div>
        <h1 className="text-xl font-semibold text-slate-900">
          접근 권한이 없습니다
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          현재 계정으로 이용할 수 없는 페이지입니다.
          <br />
          계정 유형에 맞는 홈으로 이동해 주세요.
        </p>
      </div>

      <Link
        href="/"
        className="mt-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        내 홈으로
      </Link>
    </div>
  );
}
