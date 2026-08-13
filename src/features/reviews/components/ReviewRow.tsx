import type { SiteReview } from "../types";

const memberStyle = { CLIENT: "bg-[#eaf1f8] text-[#17324d]", FREELANCER: "bg-[#eee9ff] text-[#7048e8]" };
const memberLabel = { CLIENT: "클라이언트", FREELANCER: "프리랜서" };

export default function ReviewRow({ review, onToggleVisibility, onTogglePromotion, disabled }: { review: SiteReview; onToggleVisibility: (review: SiteReview) => void; onTogglePromotion: (review: SiteReview) => void; disabled: boolean }) {
  return <div className="review-list-row grid min-h-[98px] grid-cols-[85px_110px_110px_120px_2.5fr_1.4fr_110px_105px_90px_145px] items-center border-b border-[#e5e7eb] px-3 text-[12px]">
    <span className="font-semibold text-[#64748b]">{review.siteReviewNo}</span>
    <div><span className={`rounded-md px-2 py-1 text-[10px] font-bold ${memberStyle[review.writerRole]}`}>{memberLabel[review.writerRole]}</span></div>
    <span className="truncate pr-3 font-semibold text-[#64748b]">{review.writerName}</span>
    <span className="whitespace-nowrap text-[16px] text-[#f59e0b]" aria-label={`${review.score}점`}>{"★".repeat(review.score)}<span className="text-[#cbd5e1]">{"★".repeat(5 - review.score)}</span></span>
    <p className="line-clamp-3 pr-6 font-medium leading-5 text-[#64748b]">{review.content}</p>
    <span className="line-clamp-2 pr-4 font-semibold text-[#64748b]">{review.projectTitle ?? "삭제된 프로젝트"}</span>
    <span className="font-semibold text-[#64748b]">{review.createdAt?.slice(0, 10) ?? "-"}</span>
    <div><span className={`rounded-md px-2 py-1 text-[10px] font-bold ${review.promoted ? "bg-[#fff3d7] text-[#b66b00]" : "bg-[#f1f5f9] text-[#64748b]"}`}>{review.promoted ? "홍보 활용" : "홍보 제외"}</span></div>
    <div><span className={`rounded-md px-2 py-1 text-[10px] font-bold ${review.visibility === "PUBLIC" ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#f1f5f9] text-[#64748b]"}`}>{review.visibility === "PUBLIC" ? "공개" : "비공개"}</span></div>
    <div className="flex flex-col items-start gap-2"><button disabled={disabled} onClick={() => onToggleVisibility(review)} className="h-8 rounded-lg bg-[#f1f5f9] px-3 text-[11px] font-semibold disabled:opacity-50">{review.visibility === "PUBLIC" ? "비공개로 변경" : "공개로 변경"}</button><button disabled={disabled || review.visibility === "PRIVATE"} title={review.visibility === "PRIVATE" ? "공개 리뷰만 홍보에 활용할 수 있습니다." : undefined} onClick={() => onTogglePromotion(review)} className="h-8 rounded-lg bg-[#fff3d7] px-3 text-[11px] font-semibold text-[#b66b00] disabled:opacity-50">{review.promoted ? "홍보 제외" : "홍보 활용"}</button></div>
  </div>;
}
