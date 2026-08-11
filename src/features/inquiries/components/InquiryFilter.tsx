import type { InquiryMemberFilter, InquiryStatusFilter } from "../types";

interface InquiryFilterProps {
  keyword: string;
  memberType: InquiryMemberFilter;
  status: InquiryStatusFilter;
  onKeywordChange: (value: string) => void;
  onMemberTypeChange: (value: InquiryMemberFilter) => void;
  onStatusChange: (value: InquiryStatusFilter) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function InquiryFilter({ keyword, memberType, status, onKeywordChange, onMemberTypeChange, onStatusChange, onSearch, onReset }: InquiryFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-[#e2e8f0] bg-white p-4 sm:flex sm:items-center">
      <div className="relative col-span-2 min-w-0 flex-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>
        <input type="search" value={keyword} onChange={(event) => onKeywordChange(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSearch()} placeholder="회원명, 제목, 문의번호 검색..." aria-label="문의 검색어" className="h-10 w-full rounded-lg border border-[#d8dee8] bg-[#fbfcfe] pl-9 pr-4 text-[13px] outline-none transition placeholder:text-[#94a3b8] focus:border-[#17345d]" />
      </div>
      <select value={memberType} onChange={(event) => onMemberTypeChange(event.target.value as InquiryMemberFilter)} aria-label="회원 유형" className="h-10 rounded-lg border border-[#d8dee8] bg-white px-3 text-[13px] text-[#475569] outline-none sm:w-[110px]"><option value="ALL">전체</option><option value="CLIENT">클라이언트</option><option value="FREELANCER">프리랜서</option></select>
      <select value={status} onChange={(event) => onStatusChange(event.target.value as InquiryStatusFilter)} aria-label="답변 상태" className="h-10 rounded-lg border border-[#d8dee8] bg-white px-3 text-[13px] text-[#475569] outline-none sm:w-[110px]"><option value="ALL">전체</option><option value="WAITING">대기 중</option><option value="ANSWERED">답변 완료</option></select>
      <button type="button" onClick={onSearch} className="h-10 rounded-lg bg-[#102947] px-5 text-[13px] font-bold text-white transition hover:bg-[#17345d]">검색</button>
    </div>
  );
}

