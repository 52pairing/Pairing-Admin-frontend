interface ProjectFilterProps {
  keyword: string;
  client: string;
  onKeywordChange: (value: string) => void;
  onClientChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function ProjectFilter({
  keyword,
  client,
  onKeywordChange,
  onClientChange,
  onSearch,
  onReset,
}: ProjectFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 sm:flex sm:flex-wrap sm:items-center sm:px-5 sm:py-5">
      <input
        type="search"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSearch();
        }}
        placeholder="프로젝트명, 클라이언트 검색..."
        aria-label="프로젝트 검색어"
        className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4f6ff5] sm:flex-1"
      />

      <select
        value={client}
        onChange={(event) => onClientChange(event.target.value)}
        aria-label="클라이언트"
        className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] outline-none sm:w-[150px]"
      >
        <option value="">클라이언트 전체</option>
        <option value="삼성전자">삼성전자</option>
        <option value="카카오">카카오</option>
        <option value="네이버">네이버</option>
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
