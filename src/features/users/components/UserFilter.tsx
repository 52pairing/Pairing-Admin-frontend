"use client";

export default function UserFilter() {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 sm:flex sm:flex-wrap sm:items-center sm:px-5 sm:py-5">
      {/* 검색 */}
      <input
        type="text"
        placeholder="이름, 이메일 검색..."
        aria-label="회원 검색어"
        className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] outline-none transition focus:border-[#4f6ff5] sm:w-[220px]"
      />

      {/* 회원 유형 */}
      <select aria-label="회원 유형" className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium outline-none sm:w-[120px]">
        <option>회원 유형</option>
        <option>클라이언트</option>
        <option>프리랜서</option>
      </select>

      {/* 상태 */}
      <select aria-label="회원 상태" className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium outline-none sm:w-[90px]">
        <option>회원 상태</option>
        <option>정상</option>
        <option>정지</option>
        <option>탈퇴</option>
      </select>

      {/* 가입방식 */}
      <select aria-label="가입 방식" className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium outline-none sm:w-[140px]">
        <option>가입방식 전체</option>
        <option>이메일</option>
        <option>카카오</option>
        <option>Google</option>
      </select>

      <button
        type="button"
        className="h-10 rounded-lg bg-[#4f6ff5] px-5 text-[13px] font-bold text-white transition hover:bg-[#405fe5]"
      >
        검색
      </button>
    </div>
  );
}
