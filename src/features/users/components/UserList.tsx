import Link from "next/link";

import type {
  User,
  UserStatus,
  UserType,
} from "../users";

interface UserListProps {
  user: User;
}

const typeLabel: Record<UserType, string> = {
  CLIENT: "클라이언트",
  FREELANCER: "프리랜서",
};

const statusLabel: Record<UserStatus, string> = {
  ACTIVE: "정상",
  SUSPENDED: "정지",
  WITHDRAWN: "탈퇴",
};

const typeStyle: Record<UserType, string> = {
  CLIENT: "bg-[#eaf1f8] text-[#17324d]",
  FREELANCER: "bg-[#eee9ff] text-[#7048e8]",
};

const statusStyle: Record<UserStatus, string> = {
  ACTIVE: "bg-[#dcfce7] text-[#16a34a]",
  SUSPENDED: "bg-[#fee2e2] text-[#ef4444]",
  WITHDRAWN: "bg-[#f1f5f9] text-[#94a3b8]",
};

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
        <span
          className={`rounded-md px-2 py-1 text-[11px] font-bold ${
            typeStyle[user.type]
          }`}
        >
          {typeLabel[user.type]}
        </span>
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
        <span
          className={`rounded-md px-2 py-1 text-[11px] font-bold ${
            statusStyle[user.status]
          }`}
        >
          {statusLabel[user.status]}
        </span>
      </div>

      {/* 프로젝트 */}
      <span className="font-semibold text-[#64748b]">
        {user.projectCount}건
      </span>

      {/* 상세 */}
      <Link
        href={`/admin/members/${user.id}`}
        className="flex h-8 w-11 items-center justify-center rounded-md bg-[#edf3f8] text-[12px] font-bold text-[#17324d] transition hover:bg-[#dce7f1]"
      >
        상세
      </Link>
    </div>
  );
}