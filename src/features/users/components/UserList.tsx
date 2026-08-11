import Link from "next/link";

import type { User } from "../users";
import UserStatusBadge from "./UserStatusBadge";
import UserTypeBadge from "./UserTypeBadge";

interface UserListProps {
  user: User;
}

export default function UserList({
  user,
}: UserListProps) {
  return (
    <div className="grid min-h-[60px] grid-cols-[110px_130px_1.2fr_1.7fr_100px_120px_120px_90px_120px_70px] items-center border-b border-[#e5e7eb] px-3 text-[13px]">
      
      {/* 회원번호 */}
      <span className="font-semibold text-[#64748b]">
        {user.id}
      </span>

      {/* 유형 */}
      <div>
        <UserTypeBadge type={user.type} />
      </div>

      {/* 이름 / 기업명 */}
      <div>
        {user.type === "CLIENT" ? (
          <>
            <p className="font-bold text-[#111827]">
              {user.company}
            </p>

            <p className="mt-0.5 text-[12px] text-[#94a3b8]">
              {user.name}
            </p>
          </>
        ) : (
          <>
            <p className="font-bold text-[#111827]">
              {user.name}
            </p>

            <p className="mt-0.5 text-[12px] text-[#94a3b8]">
              {user.name}
            </p>
          </>
        )}
      </div>

      {/* 이메일 */}
      <span className="font-semibold text-[#64748b]">
        {user.email}
      </span>

      {/* 가입방식 */}
      <span className="font-medium text-[#64748b]">
        {user.loginType}
      </span>

      {/* 가입일 */}
      <span className="font-semibold text-[#64748b]">
        {user.joinedAt}
      </span>

      {/* 최근 로그인 */}
      <span className="font-semibold text-[#64748b]">
        {user.lastLoginAt}
      </span>

      {/* 상태 */}
      <div>
        <UserStatusBadge status={user.status} />
      </div>

      {/* 프로젝트 */}
      <span className="font-semibold text-[#64748b]">
        {user.projectCount}건
      </span>

      {/* 상세 */}
      <Link
        href={`/users/${user.id}`}
        className="flex h-8 w-11 items-center justify-center rounded-md bg-[#edf3f8] text-[12px] font-bold text-[#17324d] transition hover:bg-[#dce7f1]"
      >
        상세
      </Link>
    </div>
  );
}
