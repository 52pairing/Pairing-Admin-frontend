import type { NegotiationStatusFilter } from "../types";

interface AgentFilterProps {
  keyword: string;
  status: NegotiationStatusFilter;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: NegotiationStatusFilter) => void;
  onSearch: () => void;
}

export default function AgentFilter({ keyword, status, onKeywordChange, onStatusChange, onSearch }: AgentFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 sm:flex sm:items-center sm:px-5 sm:py-5">
      <input
        type="search"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && onSearch()}
        placeholder="프로젝트명, 클라이언트, 프리랜서 검색..."
        aria-label="협상 검색어"
        className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] outline-none transition placeholder:text-[#94a3b8] focus:border-[#17345d] sm:flex-1"
      />
      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value as NegotiationStatusFilter)}
        aria-label="협상 상태"
        className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] text-[#475569] outline-none sm:w-[140px]"
      >
        <option value="ALL">전체</option>
        <option value="IN_PROGRESS">진행 중</option>
        <option value="AGREED">합의 완료</option>
        <option value="FAILED">결렬</option>
      </select>
      <button type="button" onClick={onSearch} className="h-10 rounded-lg bg-[#102947] px-5 text-[13px] font-bold text-white transition hover:bg-[#17345d]">검색</button>
    </div>
  );
}

