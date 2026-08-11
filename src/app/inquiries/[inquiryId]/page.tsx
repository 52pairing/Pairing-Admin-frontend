import Link from "next/link";
import { notFound } from "next/navigation";

import InquiryAnswerCard from "@/features/inquiries/components/InquiryAnswerCard";
import InquiryContentCard from "@/features/inquiries/components/InquiryContentCard";
import InquiryDetailInfo from "@/features/inquiries/components/InquiryDetailInfo";
import { inquiries } from "@/features/inquiries/inquiries";

export function generateStaticParams() {
  return inquiries.map((inquiry) => ({ inquiryId: inquiry.id }));
}

export default async function InquiryDetailPage({ params }: PageProps<"/inquiries/[inquiryId]">) {
  const { inquiryId } = await params;
  const inquiry = inquiries.find((item) => item.id === inquiryId);

  if (!inquiry) notFound();

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111827] sm:text-[24px]">1:1 문의 상세</h1>
          <p className="mt-2 text-[13px] font-semibold text-[#64748b]">{inquiry.id}</p>
          <p className="mt-1 text-[13px] text-[#94a3b8]">{inquiry.createdAt}</p>
        </div>
        <Link href="/inquiries" className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]">← 문의 목록으로</Link>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[265px_minmax(0,1fr)]">
        <InquiryDetailInfo inquiry={inquiry} />
        <div className="space-y-4"><InquiryContentCard inquiry={inquiry} /><InquiryAnswerCard inquiry={inquiry} /></div>
      </div>
    </div>
  );
}
