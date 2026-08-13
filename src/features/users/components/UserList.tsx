import Link from "next/link";

import type { MemberListItem } from "../types";
import UserStatusBadge from "./UserStatusBadge";
import UserTypeBadge from "./UserTypeBadge";

const formatMemberId = (id: number) => `MEM-${String(id).padStart(3, "0")}`;
const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("ko-KR").format(new Date(value)) : "-";

export default function UserList({ user }: { user: MemberListItem }) {
  return (
    <div className="grid min-h-[60px] grid-cols-[110px_130px_1.2fr_1.7fr_100px_120px_120px_90px_120px_70px] items-center border-b border-[#e5e7eb] px-3 text-[13px]">
      <span className="font-semibold text-[#64748b]">{formatMemberId(user.accountId)}</span>
      <div><UserTypeBadge type={user.role} /></div>
      <div className="min-w-0">
        <p className="truncate font-bold text-[#111827]">{user.companyName ?? user.name}</p>
        {user.companyName ? <p className="mt-0.5 truncate text-[12px] text-[#94a3b8]">{user.name}</p> : null}
      </div>
      <span className="truncate pr-2 font-semibold text-[#64748b]">{user.email}</span>
      <span className="font-medium text-[#64748b]">{user.signupMethodLabel}</span>
      <span className="font-semibold text-[#64748b]">{formatDate(user.createdAt)}</span>
      <span className="font-semibold text-[#64748b]">{formatDate(user.lastLoginAt)}</span>
      <div><UserStatusBadge status={user.status} /></div>
      <span className="font-semibold text-[#64748b]">{user.activeProjectCount}건</span>
      <Link href={`/users/${user.accountId}`} className="flex h-8 w-11 items-center justify-center rounded-md bg-[#edf3f8] text-[12px] font-bold text-[#17324d] transition hover:bg-[#dce7f1]">상세</Link>
    </div>
  );
}
