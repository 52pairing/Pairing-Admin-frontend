"use client";

import type { MemberListParams, SignupMethod, UserStatus, UserType } from "../types";

type FilterValue = Pick<MemberListParams, "keyword" | "role" | "status" | "signupMethod">;

export default function UserFilter({ value, onChange, onSearch, onReset, disabled }: { value: FilterValue; onChange: (value: FilterValue) => void; onSearch: () => void; onReset: () => void; disabled: boolean }) {
  const update = (patch: Partial<FilterValue>) => onChange({ ...value, ...patch });
  return (
    <form className="grid grid-cols-2 gap-2 p-4 sm:flex sm:flex-wrap sm:items-center sm:px-5 sm:py-5" onSubmit={(event) => { event.preventDefault(); onSearch(); }}>
      <input type="search" value={value.keyword ?? ""} onChange={(event) => update({ keyword: event.target.value })} placeholder="이름, 이메일, 휴대폰, 기업명 검색..." aria-label="회원 검색어" className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] outline-none transition focus:border-[#4f6ff5] sm:flex-1" />
      <select value={value.role ?? ""} onChange={(event) => update({ role: (event.target.value || undefined) as UserType | undefined })} aria-label="회원 유형" className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium outline-none sm:w-[120px]"><option value="">유형 전체</option><option value="CLIENT">클라이언트</option><option value="FREELANCER">프리랜서</option></select>
      <select value={value.status ?? ""} onChange={(event) => update({ status: (event.target.value || undefined) as UserStatus | undefined })} aria-label="회원 상태" className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium outline-none sm:w-[110px]"><option value="">상태 전체</option><option value="ACTIVE">정상</option><option value="SUSPENDED">정지</option><option value="LOCKED">잠금</option><option value="PENDING">가입 대기</option><option value="WITHDRAWN">탈퇴</option></select>
      <select value={value.signupMethod ?? ""} onChange={(event) => update({ signupMethod: (event.target.value || undefined) as SignupMethod | undefined })} aria-label="가입 방식" className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] font-medium outline-none sm:w-[140px]"><option value="">가입방식 전체</option><option value="EMAIL">이메일</option><option value="KAKAO">카카오</option><option value="GOOGLE">구글</option><option value="SOCIAL">소셜</option></select>
      <button type="submit" disabled={disabled} className="h-10 rounded-lg bg-[#102947] px-5 text-[13px] font-bold text-white transition hover:bg-[#17345d] disabled:opacity-60">검색</button>
      <button type="button" disabled={disabled} onClick={onReset} className="h-10 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#64748b] disabled:opacity-60">초기화</button>
    </form>
  );
}
