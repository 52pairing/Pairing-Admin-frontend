import type { UserStatus } from "../users";

interface UserStatusBadgeProps {
  status: UserStatus;
}

const statusLabel: Record<UserStatus, string> = {
  ACTIVE: "정상",
  SUSPENDED: "정지",
  WITHDRAWN: "탈퇴",
};

const statusStyle: Record<UserStatus, string> = {
  ACTIVE: "bg-[#dcfce7] text-[#16a34a]",
  SUSPENDED: "bg-[#fee2e2] text-[#ef4444]",
  WITHDRAWN: "bg-[#f1f5f9] text-[#94a3b8]",
};

export default function UserStatusBadge({ status }: UserStatusBadgeProps) {
  return (
    <span className={`inline-flex w-fit whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-bold ${statusStyle[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
