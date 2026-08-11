"use client";

import { useMemo, useState } from "react";

import { ConfirmModal } from "@/features/common/components/Modal";
import AdminPageHeader from "@/features/common/components/Header";
import RatingDistribution from "@/features/reviews/components/RatingDistribution";
import ReviewFilter from "@/features/reviews/components/ReviewFilter";
import ReviewRow from "@/features/reviews/components/ReviewRow";
import ReviewStatCard from "@/features/reviews/components/ReviewStatCard";
import { reviews as initialReviews } from "@/features/reviews/reviews";
import type { PromotionStatusFilter, Review, ReviewMemberFilter, VisibilityStatusFilter } from "@/features/reviews/types";

type PendingAction = { type: "visibility" | "promotion"; review: Review } | null;

export default function AdminReviewsPage() {
  const [reviewItems, setReviewItems] = useState(initialReviews);
  const [keywordInput, setKeywordInput] = useState("");
  const [memberTypeInput, setMemberTypeInput] = useState<ReviewMemberFilter>("ALL");
  const [promotionInput, setPromotionInput] = useState<PromotionStatusFilter>("ALL");
  const [visibilityInput, setVisibilityInput] = useState<VisibilityStatusFilter>("ALL");
  const [filters, setFilters] = useState({ keyword: "", memberType: "ALL" as ReviewMemberFilter, promotion: "ALL" as PromotionStatusFilter, visibility: "ALL" as VisibilityStatusFilter });
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const filteredReviews = useMemo(() => {
    const keyword = filters.keyword.trim().toLocaleLowerCase("ko-KR");
    return reviewItems.filter((review) =>
      (keyword === "" || [review.id, review.memberName, review.content, review.projectName].some((value) => value.toLocaleLowerCase("ko-KR").includes(keyword))) &&
      (filters.memberType === "ALL" || review.memberType === filters.memberType) &&
      (filters.promotion === "ALL" || review.promotionStatus === filters.promotion) &&
      (filters.visibility === "ALL" || review.visibilityStatus === filters.visibility),
    );
  }, [filters, reviewItems]);

  const stats = useMemo(() => {
    const average = reviewItems.length === 0 ? 0 : reviewItems.reduce((sum, review) => sum + review.rating, 0) / reviewItems.length;
    return [
      { label: "평균 별점", value: average.toFixed(1) },
      { label: "전체 리뷰", value: reviewItems.length },
      { label: "이번 달", value: reviewItems.filter((review) => review.createdAt.startsWith("2026.08")).length },
      { label: "홍보 활용", value: reviewItems.filter((review) => review.promotionStatus === "PROMOTED").length },
      { label: "홍보 제외", value: reviewItems.filter((review) => review.promotionStatus === "EXCLUDED").length },
      { label: "공개", value: reviewItems.filter((review) => review.visibilityStatus === "PUBLIC").length },
    ];
  }, [reviewItems]);

  const ratingDistribution = useMemo(() => [5, 4, 3, 2, 1].map((rating) => ({ rating, count: reviewItems.filter((review) => review.rating === rating).length })), [reviewItems]);

  const handleSearch = () => setFilters({ keyword: keywordInput, memberType: memberTypeInput, promotion: promotionInput, visibility: visibilityInput });
  const handleReset = () => {
    setKeywordInput(""); setMemberTypeInput("ALL"); setPromotionInput("ALL"); setVisibilityInput("ALL");
    setFilters({ keyword: "", memberType: "ALL", promotion: "ALL", visibility: "ALL" });
  };
  const handleConfirm = () => {
    if (!pendingAction) return;
    setReviewItems((items) => items.map((review) => review.id !== pendingAction.review.id ? review : pendingAction.type === "visibility" ? { ...review, visibilityStatus: review.visibilityStatus === "PUBLIC" ? "PRIVATE" : "PUBLIC" } : { ...review, promotionStatus: review.promotionStatus === "PROMOTED" ? "EXCLUDED" : "PROMOTED" }));
    setPendingAction(null);
  };

  const actionLabel = pendingAction?.type === "visibility"
    ? pendingAction.review.visibilityStatus === "PUBLIC" ? "비공개로 변경" : "공개로 변경"
    : pendingAction?.review.promotionStatus === "PROMOTED" ? "홍보 제외" : "홍보 활용";

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <AdminPageHeader title="사이트 리뷰 관리" description="클라이언트·프리랜서가 남긴 사이트 리뷰의 공개 및 홍보 활용 여부를 관리합니다." date="2026년 8월 11일" />
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{stats.map((stat) => <ReviewStatCard key={stat.label} {...stat} />)}</section>
      <RatingDistribution ratings={ratingDistribution} />
      <section className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
        <ReviewFilter keyword={keywordInput} memberType={memberTypeInput} promotionStatus={promotionInput} visibilityStatus={visibilityInput} onKeywordChange={setKeywordInput} onMemberTypeChange={setMemberTypeInput} onPromotionStatusChange={setPromotionInput} onVisibilityStatusChange={setVisibilityInput} onSearch={handleSearch} onReset={handleReset} />
        <div className="scrollbar-hidden overflow-x-auto"><div className="min-w-[1280px]">
          <div className="grid h-11 grid-cols-[85px_110px_110px_120px_2.5fr_1.4fr_110px_105px_90px_145px] items-center bg-[#f8fafc] px-3 text-[11px] font-semibold text-[#94a3b8]">
            <span>번호</span><span>유형</span><span>회원</span><span>별점</span><span>내용</span><span>프로젝트</span><span>작성일</span><span>홍보상태</span><span>공개여부</span><span>관리</span>
          </div>
          {filteredReviews.length > 0 ? filteredReviews.map((review) => <ReviewRow key={review.id} review={review} onToggleVisibility={(item) => setPendingAction({ type: "visibility", review: item })} onTogglePromotion={(item) => setPendingAction({ type: "promotion", review: item })} />) : <div className="flex h-40 items-center justify-center text-[14px] font-medium text-[#94a3b8]">조건에 맞는 리뷰가 없습니다.</div>}
        </div></div>
        <div className="border-t border-[#e5e7eb] px-5 py-4 text-[13px] font-semibold text-[#94a3b8]">{filteredReviews.length}개의 리뷰</div>
      </section>
      <ConfirmModal open={pendingAction !== null} title="리뷰 상태를 변경할까요?" description={pendingAction ? `${pendingAction.review.id} 리뷰를 '${actionLabel}' 상태로 변경합니다.` : undefined} confirmText="변경" cancelText="취소" onConfirm={handleConfirm} onClose={() => setPendingAction(null)} closeOnOverlayClick={false} />
    </div>
  );
}
