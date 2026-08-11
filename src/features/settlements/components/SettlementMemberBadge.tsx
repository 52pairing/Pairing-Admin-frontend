import type { SettlementMemberType } from "../types";

interface SettlementMemberBadgeProps {
  type: SettlementMemberType;
}

const memberLabel: Record<SettlementMemberType, string> = {
  CLIENT: "클라이언트",
  FREELANCER: "프리랜서",
};

const memberStyle: Record<SettlementMemberType, string> = {
  CLIENT: "bg-[#eaf1f8] text-[#17324d]",
  FREELANCER: "bg-[#eee9ff] text-[#7048e8]",
};

export default function SettlementMemberBadge({
  type,
}: SettlementMemberBadgeProps) {
  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-bold ${memberStyle[type]}`}>
      {memberLabel[type]}
    </span>
  );
}
