import type { SettlementStatus } from "../types";

interface SettlementStatusBadgeProps {
  status: SettlementStatus;
}

const statusLabel: Record<SettlementStatus, string> = {
  PAID: "결제 완료",
  PAYABLE: "결제 가능",
  OVERDUE: "미납",
  FAILED: "결제 실패",
};

const statusStyle: Record<SettlementStatus, string> = {
  PAID: "bg-[#dcfce7] text-[#16a34a]",
  PAYABLE: "bg-[#dbeafe] text-[#2563eb]",
  OVERDUE: "bg-[#fee2e2] text-[#ef4444]",
  FAILED: "bg-[#f1f5f9] text-[#64748b]",
};

export default function SettlementStatusBadge({
  status,
}: SettlementStatusBadgeProps) {
  return (
    <span className={`inline-flex w-fit whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-bold ${statusStyle[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
