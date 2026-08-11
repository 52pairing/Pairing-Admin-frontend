import type { Inquiry } from "../types";

export default function InquiryAnswerCard({ inquiry }: { inquiry: Inquiry }) {
  if (!inquiry.answer) {
    return (
      <section className="rounded-xl border border-[#f3d58a] bg-white px-5 py-6 shadow-sm sm:px-6">
        <h2 className="text-[15px] font-bold text-[#111827]">답변 대기 중</h2>
        <p className="mt-3 text-[13px] leading-6 text-[#64748b]">아직 등록된 답변이 없습니다. 답변 작성 기능은 API 연동 후 제공됩니다.</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-[#b9ebcc] bg-white px-5 py-5 shadow-sm sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#102947] text-white" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></svg></span>
          <div><h2 className="text-[13px] font-bold text-[#17324d]">페어링 고객지원</h2><p className="mt-1 text-[11px] text-[#94a3b8]">답변 등록일 {inquiry.answeredAt}</p></div>
        </div>
        <span className="shrink-0 rounded-md border border-[#b9ebcc] bg-[#effcf4] px-2 py-1 text-[10px] font-bold text-[#15803d]">답변 완료</span>
      </div>
      <p className="mt-4 rounded-lg bg-[#f8fafc] px-5 py-4 text-[14px] font-medium leading-7 text-[#475569]">{inquiry.answer}</p>
      <p className="mt-3 rounded-lg border border-[#f3d58a] bg-[#fffaf0] px-3 py-2 text-[12px] font-medium text-[#c26a00]">정책상 답변 등록 후 수정 또는 삭제할 수 없습니다.</p>
    </section>
  );
}

