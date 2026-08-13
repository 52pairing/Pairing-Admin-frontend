import { adminRequest } from "@/features/auth/api";
import type { InquiryDetail, InquiryListParams, InquiryListResponse, InquirySummary } from "./types";
export const fetchInquirySummary = () => adminRequest<InquirySummary>("/api/v1/admin/inquiries/summary");
export function fetchInquiries(params: InquiryListParams) { const search = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") search.set(key, String(value)); }); return adminRequest<InquiryListResponse>(`/api/v1/admin/inquiries?${search}`); }
export const fetchInquiryDetail = (inquiryId: number) => adminRequest<InquiryDetail>(`/api/v1/admin/inquiries/${inquiryId}`);
export const answerInquiry = (inquiryId: number, answer: string) => adminRequest<InquiryDetail>(`/api/v1/admin/inquiries/${inquiryId}/answer`, { method: "POST", body: JSON.stringify({ answer }) });
