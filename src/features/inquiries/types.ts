export type InquiryMemberType = "CLIENT" | "FREELANCER" | "ADMIN";
export type InquiryStatus = "PENDING" | "ANSWERED";
export interface InquirySummary { totalCount: number; pendingCount: number; answeredCount: number; todayCount: number }
export interface InquiryListItem { inquiryId: number; inquiryNo: string; writerRole: InquiryMemberType; title: string; writerName: string; createdAt: string | null; status: InquiryStatus; answeredAt: string | null }
export interface InquiryListResponse { content: InquiryListItem[]; page: number; size: number; totalElements: number; totalPages: number; first: boolean; last: boolean }
export interface InquiryListParams { keyword?: string; writerRole?: InquiryMemberType; status?: InquiryStatus; page?: number; size?: number }
export interface InquiryFile { fileId: number; originalName: string; url: string }
export interface InquiryDetail extends InquiryListItem { writerAccountId: number; writerEmail: string; content: string; files: InquiryFile[]; answer: string | null; answererName: string | null }
