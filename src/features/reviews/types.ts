export type ReviewMemberType = "CLIENT" | "FREELANCER";
export type PromotionStatus = "PROMOTED" | "EXCLUDED";
export type VisibilityStatus = "PUBLIC" | "PRIVATE";

export type ReviewMemberFilter = ReviewMemberType | "ALL";
export type PromotionStatusFilter = PromotionStatus | "ALL";
export type VisibilityStatusFilter = VisibilityStatus | "ALL";

export interface Review {
  id: string;
  memberType: ReviewMemberType;
  memberName: string;
  rating: number;
  content: string;
  projectName: string;
  createdAt: string;
  promotionStatus: PromotionStatus;
  visibilityStatus: VisibilityStatus;
}

export interface ReviewRatingItem {
  rating: number;
  count: number;
}

