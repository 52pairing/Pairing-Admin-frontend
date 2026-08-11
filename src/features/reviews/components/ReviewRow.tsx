import type { PromotionStatus, Review, ReviewMemberType, VisibilityStatus } from "../types";

interface ReviewRowProps {
  review: Review;
  onToggleVisibility: (review: Review) => void;
  onTogglePromotion: (review: Review) => void;
}

const memberLabel: Record<ReviewMemberType, string> = { CLIENT: "클라이언트", FREELANCER: "프리랜서" };
const memberStyle: Record<ReviewMemberType, string> = { CLIENT: "bg-[#eaf1f8] text-[#17324d]", FREELANCER: "bg-[#eee9ff] text-[#7048e8]" };
const promotionLabel: Record<PromotionStatus, string> = { PROMOTED: "홍보 활용", EXCLUDED: "홍보 제외" };
const promotionStyle: Record<PromotionStatus, string> = { PROMOTED: "bg-[#fff3d7] text-[#b66b00]", EXCLUDED: "bg-[#f1f5f9] text-[#64748b]" };
const visibilityLabel: Record<VisibilityStatus, string> = { PUBLIC: "공개", PRIVATE: "비공개" };
const visibilityStyle: Record<VisibilityStatus, string> = { PUBLIC: "bg-[#dcfce7] text-[#15803d]", PRIVATE: "bg-[#f1f5f9] text-[#64748b]" };

export default function ReviewRow({ review, onToggleVisibility, onTogglePromotion }: ReviewRowProps) {
  return (
    <div className="grid min-h-[98px] grid-cols-[85px_110px_110px_120px_2.5fr_1.4fr_110px_105px_90px_145px] items-center border-b border-[#e5e7eb] px-3 text-[12px] last:border-b-0">
      <span className="font-semibold text-[#64748b]">{review.id}</span>
      <div><span className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold ${memberStyle[review.memberType]}`}>{memberLabel[review.memberType]}</span></div>
      <span className="truncate pr-3 font-semibold text-[#64748b]">{review.memberName}</span>
      <span className="whitespace-nowrap text-[16px] tracking-[1px] text-[#f59e0b]" aria-label={`${review.rating}점`}>{"★".repeat(review.rating)}<span className="text-[#cbd5e1]">{"★".repeat(5 - review.rating)}</span></span>
      <p className="line-clamp-3 pr-6 font-medium leading-5 text-[#64748b]">{review.content}</p>
      <span className="line-clamp-2 pr-4 font-semibold leading-5 text-[#64748b]">{review.projectName}</span>
      <span className="font-semibold text-[#64748b]">{review.createdAt}</span>
      <div><span className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold ${promotionStyle[review.promotionStatus]}`}>{promotionLabel[review.promotionStatus]}</span></div>
      <div><span className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold ${visibilityStyle[review.visibilityStatus]}`}>{visibilityLabel[review.visibilityStatus]}</span></div>
      <div className="flex flex-col items-start gap-2">
        <button type="button" onClick={() => onToggleVisibility(review)} className="h-8 rounded-lg bg-[#f1f5f9] px-3 text-[11px] font-semibold text-[#64748b] transition hover:bg-[#e2e8f0]">{review.visibilityStatus === "PUBLIC" ? "비공개로 변경" : "공개로 변경"}</button>
        <button type="button" onClick={() => onTogglePromotion(review)} className={`h-8 rounded-lg px-3 text-[11px] font-semibold transition ${review.promotionStatus === "PROMOTED" ? "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]" : "bg-[#fff3d7] text-[#b66b00] hover:bg-[#ffebbd]"}`}>{review.promotionStatus === "PROMOTED" ? "홍보 제외" : "홍보 활용"}</button>
      </div>
    </div>
  );
}

