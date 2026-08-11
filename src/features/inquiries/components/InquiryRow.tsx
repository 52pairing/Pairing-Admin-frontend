import Link from "next/link";

import type { Inquiry, InquiryMemberType, InquiryStatus } from "../types";

const memberLabel: Record<InquiryMemberType, string> = { CLIENT: "클라이언트", FREELANCER: "프리랜서" };
const memberStyle: Record<InquiryMemberType, string> = { CLIENT: "bg-[#eaf2ff] text-[#2563eb]", FREELANCER: "bg-[#f1eaff] text-[#7c3aed]" };
const statusLabel: Record<InquiryStatus, string> = { WAITING: "대기 중", ANSWERED: "답변 완료" };
const statusStyle: Record<InquiryStatus, string> = { WAITING: "border-[#f5d48a] bg-[#fffaf0] text-[#c26a00]", ANSWERED: "border-[#b9ebcc] bg-[#effcf4] text-[#15803d]" };

export default function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  return (
    <div className="grid min-h-[58px] grid-cols-[145px_90px_2.4fr_1.1fr_100px_105px_105px_70px] items-center border-b border-[#edf0f3] px-4 text-[12px] last:border-b-0">
      <span className="font-mono text-[11px] text-[#64748b]">{inquiry.id}</span>
      <div><span className={`rounded-md px-2 py-1 text-[10px] font-bold ${memberStyle[inquiry.memberType]}`}>{memberLabel[inquiry.memberType]}</span></div>
      <span className="truncate pr-5 font-semibold text-[#1f2937]">{inquiry.title}</span>
      <span className="truncate pr-4 font-semibold text-[#334155]">{inquiry.author}</span>
      <span className="text-[#94a3b8]">{inquiry.createdAt}</span>
      <div><span className={`inline-block rounded-md border px-2 py-1 text-[10px] font-bold ${statusStyle[inquiry.status]}`}>{statusLabel[inquiry.status]}</span></div>
      <span className="text-[#64748b]">{inquiry.answeredAt ?? <span className="text-[#cbd5e1]">—</span>}</span>
      <Link href={`/inquiries/${inquiry.id}`} className="text-left text-[12px] font-bold text-[#2563eb] underline-offset-2 hover:underline">상세보기</Link>
    </div>
  );
}
