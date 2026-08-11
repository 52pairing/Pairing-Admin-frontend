import Link from "next/link";
import { notFound } from "next/navigation";

import UserActivityCard from "@/features/users/components/UserActivityCard";
import UserDetailCard from "@/features/users/components/UserDetailCard";
import UserStatusBadge from "@/features/users/components/UserStatusBadge";
import UserTypeBadge from "@/features/users/components/UserTypeBadge";
import { users } from "@/features/users/users";

function formatHeaderDate(date: string) {
  const [year, month, day] = date.split(".");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

export function generateStaticParams() {
  return users.map((user) => ({ userId: user.id }));
}

export default async function UserDetailPage({
  params,
}: PageProps<"/users/[userId]">) {
  const { userId } = await params;
  const user = users.find((item) => item.id === userId);

  if (!user) notFound();

  const profileItems =
    user.type === "CLIENT"
      ? [
          { label: "기업명", value: user.company ?? "-" },
          { label: "사업분야", value: user.industry ?? "-" },
          { label: "사업자번호", value: user.businessNumber ?? "-" },
          { label: "직원수", value: user.employeeCount ?? "-" },
        ]
      : [
          { label: "전문분야", value: user.specialty ?? "-" },
          { label: "경력", value: user.experience ?? "-" },
        ];

  const activities = [
    { label: "진행중 프로젝트", value: user.activity.inProgressProjects },
    { label: "완료 프로젝트", value: user.activity.completedProjects },
    { label: "취소", value: user.activity.canceledProjects },
    {
      label: "누적 거래금액",
      value: `${user.activity.totalTransactionAmount.toLocaleString("ko-KR")}원`,
    },
    { label: "리뷰 수", value: user.activity.reviewCount },
    { label: "평균 별점", value: user.activity.averageRating.toFixed(1) },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111827] sm:text-[24px]">
            회원 상세
          </h1>
          <p className="mt-2 text-[13px] font-semibold text-[#64748b]">
            {user.type === "CLIENT" ? user.company : user.name}
          </p>
          <p className="mt-1 text-[13px] text-[#94a3b8]">
            {formatHeaderDate(user.joinedAt)}
          </p>
        </div>

        <Link
          href="/users"
          className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
        >
          ← 회원 목록으로
        </Link>
      </header>

      <div className="space-y-4">
        <UserDetailCard
          title="기본 정보"
          items={[
            { label: "회원번호", value: user.id },
            { label: "유형", value: <UserTypeBadge type={user.type} /> },
            { label: "이름", value: user.name },
            { label: "이메일", value: user.email },
            { label: "전화번호", value: user.phone },
            { label: "가입방식", value: user.loginType },
            { label: "가입일", value: user.joinedAt },
            { label: "최근로그인", value: user.lastLoginAt },
            { label: "상태", value: <UserStatusBadge status={user.status} /> },
            ...profileItems,
          ]}
        />

        <section className="rounded-xl border border-[#e2e8f0] bg-white px-5 py-5 sm:px-6">
          <h2 className="text-[15px] font-bold text-[#111827]">활동 현황</h2>
          <div className="scrollbar-hidden mt-5 flex gap-3 overflow-x-auto">
            {activities.map((activity) => (
              <UserActivityCard
                key={activity.label}
                label={activity.label}
                value={activity.value}
              />
            ))}
          </div>
        </section>

        {user.status !== "WITHDRAWN" && (
          <button
            type="button"
            disabled
            title="회원 상태 변경 API 연동이 필요합니다."
            className="h-10 rounded-lg bg-[#dc2626] px-5 text-[13px] font-bold text-white opacity-70 disabled:cursor-not-allowed"
          >
            {user.status === "SUSPENDED" ? "정지 해제" : "회원 정지"}
          </button>
        )}
      </div>
    </div>
  );
}
