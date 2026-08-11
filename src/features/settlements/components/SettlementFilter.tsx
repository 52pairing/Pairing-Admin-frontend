import type {
  SettlementMemberFilter,
  SettlementStatusFilter,
} from "../types";

interface SettlementFilterProps {
  keyword: string;
  memberType: SettlementMemberFilter;
  status: SettlementStatusFilter;
  onKeywordChange: (value: string) => void;
  onMemberTypeChange: (value: SettlementMemberFilter) => void;
  onStatusChange: (value: SettlementStatusFilter) => void;
  onSearch: () => void;
}

export default function SettlementFilter({
  keyword,
  memberType,
  status,
  onKeywordChange,
  onMemberTypeChange,
  onStatusChange,
  onSearch,
}: SettlementFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 sm:flex sm:flex-wrap sm:items-center sm:px-5 sm:py-5">
      <input
        type="search"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSearch();
        }}
        placeholder="정산번호, 프로젝트, 회원 검색..."
        aria-label="정산 검색어"
        className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4f6ff5] sm:flex-1"
      />

      <select
        value={memberType}
        onChange={(event) => onMemberTypeChange(event.target.value as SettlementMemberFilter)}
        aria-label="회원 유형"
        className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] outline-none sm:w-[140px]"
      >
        <option value="ALL">회원 유형 전체</option>
        <option value="CLIENT">클라이언트</option>
        <option value="FREELANCER">프리랜서</option>
      </select>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value as SettlementStatusFilter)}
        aria-label="정산 상태"
        className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] outline-none sm:w-[130px]"
      >
        <option value="ALL">정산 상태 전체</option>
        <option value="PAID">결제 완료</option>
        <option value="PAYABLE">결제 가능</option>
        <option value="OVERDUE">미납</option>
        <option value="FAILED">결제 실패</option>
      </select>

      <button
        type="button"
        onClick={onSearch}
          className="h-10 rounded-lg bg-[#102947] px-5 text-[13px] font-bold text-white transition hover:bg-[#17345d]"
      >
        검색
      </button>

    </div>
  );
}
