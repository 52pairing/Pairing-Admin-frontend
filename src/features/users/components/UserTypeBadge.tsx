import type { UserType } from "../types";

interface UserTypeBadgeProps {
  type: UserType;
}

const typeLabel: Record<UserType, string> = {
  CLIENT: "클라이언트",
  FREELANCER: "프리랜서",
};

const typeStyle: Record<UserType, string> = {
  CLIENT: "bg-[#eaf1f8] text-[#17324d]",
  FREELANCER: "bg-[#eee9ff] text-[#7048e8]",
};

export default function UserTypeBadge({ type }: UserTypeBadgeProps) {
  return (
    <span className={`inline-flex w-fit whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-bold ${typeStyle[type]}`}>
      {typeLabel[type]}
    </span>
  );
}
