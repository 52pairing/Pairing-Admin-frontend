"use client";

import { useMemo, useState } from "react";

import AdminPageHeader from "@/features/common/components/Header";
import InquiryFilter from "@/features/inquiries/components/InquiryFilter";
import InquiryRow from "@/features/inquiries/components/InquiryRow";
import InquiryStatCard from "@/features/inquiries/components/InquiryStatCard";
import { inquiries } from "@/features/inquiries/inquiries";
import type { InquiryMemberFilter, InquiryStatusFilter } from "@/features/inquiries/types";

export default function AdminInquiriesPage() {
  const [keywordInput, setKeywordInput] = useState("");
  const [memberTypeInput, setMemberTypeInput] = useState<InquiryMemberFilter>("ALL");
  const [statusInput, setStatusInput] = useState<InquiryStatusFilter>("ALL");
  const [filters, setFilters] = useState({ keyword: "", memberType: "ALL" as InquiryMemberFilter, status: "ALL" as InquiryStatusFilter });

  const filteredInquiries = useMemo(() => {
    const keyword = filters.keyword.trim().toLocaleLowerCase("ko-KR");
    return inquiries.filter((inquiry) =>
      (keyword === "" || [inquiry.id, inquiry.title, inquiry.author].some((value) => value.toLocaleLowerCase("ko-KR").includes(keyword))) &&
      (filters.memberType === "ALL" || inquiry.memberType === filters.memberType) &&
      (filters.status === "ALL" || inquiry.status === filters.status),
    );
  }, [filters]);

  const stats = [
    { label: "전체 문의", value: inquiries.length, tone: "default" as const },
    { label: "답변 대기", value: inquiries.filter((item) => item.status === "WAITING").length, tone: "waiting" as const },
    { label: "답변 완료", value: inquiries.filter((item) => item.status === "ANSWERED").length, tone: "answered" as const },
    { label: "오늘 접수", value: 1, tone: "today" as const },
  ];

  const handleSearch = () => setFilters({ keyword: keywordInput, memberType: memberTypeInput, status: statusInput });
  const handleReset = () => {
    setKeywordInput("");
    setMemberTypeInput("ALL");
    setStatusInput("ALL");
    setFilters({ keyword: "", memberType: "ALL", status: "ALL" });
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <AdminPageHeader title="1:1 문의 관리" description="사용자가 접수한 1:1 문의를 확인하고 답변할 수 있습니다." date="2026년 8월 11일" />
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map((stat) => <InquiryStatCard key={stat.label} {...stat} />)}</section>
      <section className="mt-6"><InquiryFilter keyword={keywordInput} memberType={memberTypeInput} status={statusInput} onKeywordChange={setKeywordInput} onMemberTypeChange={setMemberTypeInput} onStatusChange={setStatusInput} onSearch={handleSearch} onReset={handleReset} /></section>
      <section className="mt-5 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="scrollbar-hidden overflow-x-auto"><div className="min-w-[980px]">
          <div className="grid h-11 grid-cols-[145px_90px_2.4fr_1.1fr_100px_105px_105px_70px] items-center bg-[#f8fafc] px-4 text-[11px] font-semibold text-[#64748b]"><span>문의번호</span><span>유형</span><span>제목</span><span>작성자</span><span>작성일</span><span>상태</span><span>답변등록일</span><span /></div>
          {filteredInquiries.length > 0 ? filteredInquiries.map((inquiry) => <InquiryRow key={inquiry.id} inquiry={inquiry} />) : <div className="flex h-40 items-center justify-center text-[14px] font-medium text-[#94a3b8]">조건에 맞는 문의가 없습니다.</div>}
        </div></div>
      </section>
      <p className="mt-3 text-center text-[12px] text-[#94a3b8]">전체 {filteredInquiries.length}건 · 1 / 1 페이지</p>
    </div>
  );
}
