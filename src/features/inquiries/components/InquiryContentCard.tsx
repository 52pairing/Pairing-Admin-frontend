import type { Inquiry } from "../types";

export default function InquiryContentCard({ inquiry }: { inquiry: Inquiry }) {
  return (
    <section className="rounded-xl border border-[#e2e8f0] bg-white px-5 py-5 shadow-sm sm:px-6">
      <p className="text-[12px] font-bold text-[#94a3b8]">문의 내용</p>
      <h2 className="mt-4 text-[18px] font-bold text-[#111827]">{inquiry.title}</h2>
      <p className="mt-4 rounded-lg bg-[#f8fafc] px-5 py-4 text-[14px] font-medium leading-7 text-[#475569]">{inquiry.content}</p>
    </section>
  );
}

