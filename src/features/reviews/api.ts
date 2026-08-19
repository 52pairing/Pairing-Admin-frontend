import { adminRequest } from "@/features/auth/api";
import type { SiteReview, SiteReviewListParams, SiteReviewListResponse, SiteReviewSummary, VisibilityStatus } from "./types";

export function fetchSiteReviewSummary() {
  return adminRequest<SiteReviewSummary>("/api/v1/admin/site-reviews/summary");
}

export function fetchSiteReviews(params: SiteReviewListParams) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") search.set(key, String(value));
  });
  return adminRequest<SiteReviewListResponse>(`/api/v1/admin/site-reviews?${search}`);
}

export function updateSiteReviewVisibility(siteReviewId: number, visibility: VisibilityStatus, promoted: boolean) {
  return adminRequest<SiteReview>(`/api/v1/admin/site-reviews/${siteReviewId}/visibility`, {
    method: "PUT",
    body: JSON.stringify({ visibility, promoted }),
  });
}

export function updateSiteReviewPromotion(siteReviewId: number, promoted: boolean) {
  return adminRequest<SiteReview>(`/api/v1/admin/site-reviews/${siteReviewId}/promotion`, {
    method: "PUT",
    body: JSON.stringify({ promoted }),
  });
}
