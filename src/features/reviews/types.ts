export type ReviewMemberType = "CLIENT" | "FREELANCER";
export type VisibilityStatus = "PUBLIC" | "PRIVATE";

export interface SiteReviewSummary {
  ratingAverage: number;
  totalCount: number;
  thisMonthCount: number;
  promotedCount: number;
  notPromotedCount: number;
  publicCount: number;
  scoreDistribution: Record<"1" | "2" | "3" | "4" | "5", number>;
}

export interface SiteReview {
  siteReviewId: number;
  siteReviewNo: string;
  writerRole: ReviewMemberType;
  writerName: string;
  score: number;
  content: string;
  projectTitle: string | null;
  visibility: VisibilityStatus;
  promoted: boolean;
  createdAt: string | null;
}

export interface SiteReviewListResponse {
  content: SiteReview[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface SiteReviewListParams {
  keyword?: string;
  score?: number;
  writerRole?: ReviewMemberType;
  visibility?: VisibilityStatus;
  promoted?: boolean;
  page?: number;
  size?: number;
}

export interface ReviewRatingItem {
  rating: number;
  count: number;
}
