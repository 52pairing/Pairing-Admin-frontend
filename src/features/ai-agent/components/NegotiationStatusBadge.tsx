import type { NegotiationStatus } from "../types";

const statusLabel: Record<NegotiationStatus, string> = {
  IN_PROGRESS: "진행 중",
  AGREED: "합의 완료",
  FAILED: "결렬",
};

const statusStyle: Record<NegotiationStatus, string> = {
  IN_PROGRESS: "bg-[#dbeafe] text-[#1d4ed8]",
  AGREED: "bg-[#dcfce7] text-[#16a34a]",
  FAILED: "bg-[#fee2e2] text-[#dc2626]",
};

export default function NegotiationStatusBadge({ status }: { status: NegotiationStatus }) {
  return <span className={`inline-block rounded-md px-2 py-1 text-[11px] font-bold ${statusStyle[status]}`}>{statusLabel[status]}</span>;
}

