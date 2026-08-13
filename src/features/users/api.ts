import { adminRequest } from "@/features/auth/api";

import type { MemberDetail, MemberListParams, MemberListResponse, MemberSummary } from "./types";

export function fetchMemberSummary() {
  return adminRequest<MemberSummary>("/api/v1/admin/members/summary");
}

export function fetchMembers(params: MemberListParams = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") searchParams.set(key, String(value));
  });
  const query = searchParams.toString();
  return adminRequest<MemberListResponse>(`/api/v1/admin/members${query ? `?${query}` : ""}`);
}

export function fetchMemberDetail(accountId: number) {
  return adminRequest<MemberDetail>(`/api/v1/admin/members/${accountId}`);
}

export function suspendMember(accountId: number, reason: string) {
  return adminRequest<MemberDetail>(`/api/v1/admin/members/${accountId}/suspension`, {
    method: "PATCH",
    body: JSON.stringify({ reason }),
  });
}

export function releaseMemberSuspension(accountId: number) {
  return adminRequest<MemberDetail>(`/api/v1/admin/members/${accountId}/suspension`, { method: "DELETE" });
}
