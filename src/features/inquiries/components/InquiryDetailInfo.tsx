import type { Inquiry, InquiryMemberType } from "../types";

const memberLabel: Record<InquiryMemberType, string> = { CLIENT: "클라이언트", FREELANCER: "프리랜서" };
const memberStyle: Record<InquiryMemberType, string> = { CLIENT: "bg-[#eaf2ff] text-[#2563eb]", FREELANCER: "bg-[#f1eaff] text-[#7c3aed]" };

export default function InquiryDetailInfo({ inquiry }: { inquiry: Inquiry }) {
  const items = [
    { label: "문의번호", value: inquiry.id, strong: true },
    { label: "작성자명", value: inquiry.author, strong: true },
    { label: "회원유형", value: <span className={`inline-block rounded-md px-2 py-1 text-[10px] font-bold ${memberStyle[inquiry.memberType]}`}>{memberLabel[inquiry.memberType]}</span> },
    { label: "이메일", value: inquiry.email },
    { label: "문의유형", value: <span className="inline-block rounded-md bg-[#f1f5f9] px-2 py-1 text-[11px] font-bold text-[#334155]">{inquiry.category}</span> },
    { label: "작성일", value: inquiry.createdAt },
    { label: "답변등록일", value: inquiry.answeredAt ?? "—" },
  ];

  return (
    <aside className="h-fit rounded-xl border border-[#e2e8f0] bg-white px-5 py-5 shadow-sm">
      <h2 className="text-[13px] font-bold text-[#94a3b8]">문의 정보</h2>
      <dl className="mt-5 space-y-4">{items.map((item) => <div key={item.label}><dt className="text-[11px] font-medium text-[#94a3b8]">{item.label}</dt><dd className={`mt-1 break-words text-[13px] text-[#475569] ${item.strong ? "font-bold text-[#111827]" : "font-medium"}`}>{item.value}</dd></div>)}</dl>
    </aside>
  );
}

