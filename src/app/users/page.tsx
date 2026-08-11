import AdminPageHeader from "@/features/common/components/Header";
import UserCard from "@/features/users/components/UserCard";
import UserFilter from "@/features/users/components/UserFilter";
import UserList from "@/features/users/components/UserList";

import { users } from "@/features/users/users";

const userStats = [
  {
    label: "전체",
    count: 6,
  },
  {
    label: "정상",
    count: 4,
  },
  {
    label: "정지",
    count: 1,
  },
  {
    label: "탈퇴",
    count: 1,
  },
  {
    label: "클라이언트",
    count: 3,
  },
  {
    label: "프리랜서",
    count: 3,
  },
];

export default function AdminMembersPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      {/* 페이지 공통 헤더 */}
      <AdminPageHeader
        title="회원 관리"
        description="플랫폼에 등록된 모든 회원을 관리합니다."
        date="2026년 8월 6일"
      />

      {/* 통계 */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {userStats.map((stat) => (
          <UserCard
            key={stat.label}
            label={stat.label}
            count={stat.count}
          />
        ))}
      </section>

      {/* 회원 목록 */}
      <section className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
        <UserFilter />

        <div className="overflow-x-auto">
          <div className="min-w-[1050px]">
            {/* 테이블 헤더 */}
            <div className="grid h-10 grid-cols-[110px_130px_1.2fr_1.7fr_100px_120px_120px_90px_120px_70px] items-center bg-[#f8fafc] px-3 text-[12px] font-semibold text-[#94a3b8]">
              <span>회원번호</span>
              <span>유형</span>
              <span>이름·기업명</span>
              <span>이메일</span>
              <span>가입방식</span>
              <span>가입일</span>
              <span>최근로그인</span>
              <span>상태</span>
              <span>진행프로젝트</span>
              <span>상세</span>
            </div>

            {/* 회원 목록 */}
            {users.map((user) => (
              <UserList
                key={user.id}
                user={user}
              />
            ))}
          </div>
        </div>

        {/* 하단 */}
        <div className="px-5 py-4 text-[13px] font-semibold text-[#94a3b8]">
          {users.length}명의 회원
        </div>
      </section>
    </div>
  );
}
