import type { PromotionStatusFilter, ReviewMemberFilter, VisibilityStatusFilter } from "../types";

interface ReviewFilterProps {
  keyword: string;
  memberType: ReviewMemberFilter;
  promotionStatus: PromotionStatusFilter;
  visibilityStatus: VisibilityStatusFilter;
  onKeywordChange: (value: string) => void;
  onMemberTypeChange: (value: ReviewMemberFilter) => void;
  onPromotionStatusChange: (value: PromotionStatusFilter) => void;
  onVisibilityStatusChange: (value: VisibilityStatusFilter) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function ReviewFilter(props: ReviewFilterProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 sm:flex sm:flex-wrap sm:items-center sm:px-5 sm:py-5">
      <input
        type="search"
        value={props.keyword}
        onChange={(event) => props.onKeywordChange(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && props.onSearch()}
        placeholder="회원명, 내용, 프로젝트 검색..."
        aria-label="리뷰 검색어"
        className="col-span-2 h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4f6ff5] sm:w-[250px]"
      />
      <select value={props.memberType} onChange={(event) => props.onMemberTypeChange(event.target.value as ReviewMemberFilter)} aria-label="회원 유형" className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] outline-none sm:w-[130px]">
        <option value="ALL">회원 유형 전체</option><option value="CLIENT">클라이언트</option><option value="FREELANCER">프리랜서</option>
      </select>
      <select value={props.promotionStatus} onChange={(event) => props.onPromotionStatusChange(event.target.value as PromotionStatusFilter)} aria-label="홍보 상태" className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] outline-none sm:w-[130px]">
        <option value="ALL">홍보 상태 전체</option><option value="PROMOTED">홍보 활용</option><option value="EXCLUDED">홍보 제외</option>
      </select>
      <select value={props.visibilityStatus} onChange={(event) => props.onVisibilityStatusChange(event.target.value as VisibilityStatusFilter)} aria-label="공개 여부" className="h-10 min-w-0 rounded-lg border border-[#e2e8f0] bg-white px-3 text-[13px] outline-none sm:w-[125px]">
        <option value="ALL">공개 여부 전체</option><option value="PUBLIC">공개</option><option value="PRIVATE">비공개</option>
      </select>
      <button type="button" onClick={props.onSearch} className="h-10 rounded-lg bg-[#3b6df6] px-5 text-[13px] font-bold text-white transition hover:bg-[#315fd8]">검색</button>
    </div>
  );
}

