export type InquiryMemberType = "CLIENT" | "FREELANCER";
export type InquiryStatus = "WAITING" | "ANSWERED";

export type InquiryMemberFilter = InquiryMemberType | "ALL";
export type InquiryStatusFilter = InquiryStatus | "ALL";

export interface Inquiry {
  id: string;
  memberType: InquiryMemberType;
  title: string;
  author: string;
  createdAt: string;
  status: InquiryStatus;
  answeredAt: string | null;
  email: string;
  category: string;
  content: string;
  answer: string | null;
}
