import type { ReviewMemberType, SiteReviewListParams, VisibilityStatus } from "../types";

export type ReviewFilterValue = Pick<SiteReviewListParams, "keyword" | "score" | "writerRole" | "visibility" | "promoted">;

interface ReviewFilterProps {
  value: ReviewFilterValue;
  onChange: (value: ReviewFilterValue) => void;
  onFilterChange: (patch: Partial<ReviewFilterValue>) => void;
  onSearch: () => void;
  disabled: boolean;
}

export default function ReviewFilter({ value, onChange, onFilterChange, onSearch, disabled }: ReviewFilterProps) {
  const update = (patch: Partial<ReviewFilterValue>) => onChange({ ...value, ...patch });
  const applyFilter = (patch: Partial<ReviewFilterValue>) => { update(patch); onFilterChange(patch); };

  return <form onSubmit={(event) => { event.preventDefault(); onSearch(); }} className="flex flex-wrap gap-2 p-4 sm:px-5 sm:py-5">
    <input type="search" value={value.keyword ?? ""} onChange={(e) => update({ keyword: e.target.value })} placeholder="회원명, 내용, 프로젝트 검색..." aria-label="리뷰 검색어" className="h-10 min-w-[240px] flex-1 rounded-lg border border-[#e2e8f0] px-4 text-[13px]" />
    <select value={value.score ?? ""} onChange={(e) => applyFilter({ score: e.target.value ? Number(e.target.value) : undefined })} aria-label="별점" className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]"><option value="">별점 전체</option>{[5, 4, 3, 2, 1].map((score) => <option key={score} value={score}>{score}점</option>)}</select>
    <select value={value.writerRole ?? ""} onChange={(e) => applyFilter({ writerRole: (e.target.value || undefined) as ReviewMemberType | undefined })} aria-label="회원 유형" className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]"><option value="">회원 전체</option><option value="CLIENT">클라이언트</option><option value="FREELANCER">프리랜서</option></select>
    <select value={value.promoted === undefined ? "" : String(value.promoted)} onChange={(e) => applyFilter({ promoted: e.target.value === "" ? undefined : e.target.value === "true" })} aria-label="홍보 상태" className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]"><option value="">홍보 전체</option><option value="true">홍보 활용</option><option value="false">홍보 제외</option></select>
    <select value={value.visibility ?? ""} onChange={(e) => applyFilter({ visibility: (e.target.value || undefined) as VisibilityStatus | undefined })} aria-label="공개 여부" className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]"><option value="">공개 전체</option><option value="PUBLIC">공개</option><option value="PRIVATE">비공개</option></select>
    <button disabled={disabled} className="h-10 rounded-lg bg-[#102947] px-5 text-[13px] font-bold text-white disabled:opacity-50">검색</button>
  </form>;
}
