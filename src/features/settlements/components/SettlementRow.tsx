import Link from "next/link";

import type {
  Settlement,
  SettlementFeeType,
} from "../types";
import SettlementMemberBadge from "./SettlementMemberBadge";
import SettlementStatusBadge from "./SettlementStatusBadge";

interface SettlementRowProps {
  settlement: Settlement;
}

const feeTypeLabel: Record<SettlementFeeType, string> = {
  START_FEE: "착수금 수수료",
  COMPLETION_FEE: "완료금 수수료",
};

export default function SettlementRow({ settlement }: SettlementRowProps) {
  return (
    <div className="grid min-h-[64px] grid-cols-[115px_1.7fr_110px_120px_105px_70px_100px_95px_100px_100px_60px] items-center border-b border-[#e5e7eb] px-3 text-[13px] last:border-b-0">
      <span className="font-semibold text-[#64748b]">{settlement.id}</span>
      <span className="truncate pr-4 font-semibold text-[#64748b]">
        {settlement.projectName}
      </span>
      <div className="min-w-0 pr-3">
        <p className="truncate font-semibold text-[#64748b]">{settlement.memberName}</p>
        <span className="mt-1 block">
          <SettlementMemberBadge type={settlement.memberType} />
        </span>
      </div>
      <span className="font-semibold text-[#64748b]">
        {feeTypeLabel[settlement.feeType]}
      </span>
      <span className="font-semibold text-[#64748b]">
        {settlement.baseAmount.toLocaleString("ko-KR")}
      </span>
      <span className="font-semibold text-[#64748b]">{settlement.feeRate}%</span>
      <span className="font-semibold text-[#64748b]">
        {settlement.feeAmount.toLocaleString("ko-KR")}
      </span>
      <SettlementStatusBadge status={settlement.status} />
      <span className="font-semibold text-[#64748b]">{settlement.dueDate}</span>
      <span className="font-semibold text-[#64748b]">
        {settlement.completedAt ?? "-"}
      </span>
      <Link
        href={`/settlements/${settlement.id}`}
        className="flex h-8 w-11 items-center justify-center rounded-md bg-[#edf3f8] text-[12px] font-bold text-[#17324d] transition hover:bg-[#dce7f1]"
        aria-label={`${settlement.id} 상세 보기`}
      >
        상세
      </Link>
    </div>
  );
}
