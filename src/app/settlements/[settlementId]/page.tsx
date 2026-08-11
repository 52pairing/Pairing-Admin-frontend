import Link from "next/link";
import { notFound } from "next/navigation";

import SettlementDetailCard from "@/features/settlements/components/SettlementDetailCard";
import SettlementMemberBadge from "@/features/settlements/components/SettlementMemberBadge";
import SettlementStatusBadge from "@/features/settlements/components/SettlementStatusBadge";
import { settlements } from "@/features/settlements/settlements";
import type { SettlementFeeType } from "@/features/settlements/types";

const feeTypeLabel: Record<SettlementFeeType, string> = {
  START_FEE: "착수금 수수료",
  COMPLETION_FEE: "완료금 수수료",
};

function formatHeaderDate(date: string) {
  const [year, month, day] = date.split(".");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

export function generateStaticParams() {
  return settlements.map((settlement) => ({
    settlementId: settlement.id,
  }));
}

export default async function SettlementDetailPage({
  params,
}: PageProps<"/settlements/[settlementId]">) {
  const { settlementId } = await params;
  const settlement = settlements.find((item) => item.id === settlementId);

  if (!settlement) notFound();

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111827] sm:text-[24px]">
            정산 상세
          </h1>
          <p className="mt-2 text-[13px] font-semibold text-[#64748b]">
            {settlement.id}
          </p>
          <p className="mt-1 text-[13px] text-[#94a3b8]">
            {formatHeaderDate(settlement.createdAt)}
          </p>
        </div>

        <Link
          href="/settlements"
          className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
        >
          ← 정산 목록으로
        </Link>
      </header>

      <div className="space-y-4">
        <SettlementDetailCard
          title="기본 정보"
          items={[
            { label: "정산번호", value: settlement.id },
            { label: "프로젝트", value: settlement.projectName },
            { label: "회원", value: settlement.memberName },
            {
              label: "회원유형",
              value: <SettlementMemberBadge type={settlement.memberType} />,
            },
            {
              label: "수수료유형",
              value: feeTypeLabel[settlement.feeType],
            },
            {
              label: "상태",
              value: <SettlementStatusBadge status={settlement.status} />,
            },
          ]}
        />

        <SettlementDetailCard
          title="금액 정보"
          items={[
            {
              label: "기준금액",
              value: `${settlement.baseAmount.toLocaleString("ko-KR")}원`,
            },
            { label: "수수료율", value: `${settlement.feeRate}%` },
            {
              label: "수수료",
              value: `${settlement.feeAmount.toLocaleString("ko-KR")}원`,
            },
          ]}
        />

        <SettlementDetailCard
          title="일정 정보"
          items={[
            { label: "결제기한", value: settlement.dueDate },
            { label: "완료일", value: settlement.completedAt ?? "-" },
          ]}
        />
      </div>
    </div>
  );
}
