"use client";

import { useMemo, useState } from "react";

import AgentFilter from "@/features/ai-agent/components/AgentFilter";
import AgentRow from "@/features/ai-agent/components/AgentRow";
import AgentStatCard from "@/features/ai-agent/components/AgentStatCard";
import { negotiationSessions } from "@/features/ai-agent/negotiations";
import type { NegotiationStatusFilter } from "@/features/ai-agent/types";
import AdminPageHeader from "@/features/common/components/Header";

export default function AdminAiAgentPage() {
  const [keywordInput, setKeywordInput] = useState("");
  const [statusInput, setStatusInput] = useState<NegotiationStatusFilter>("ALL");
  const [filters, setFilters] = useState({ keyword: "", status: "ALL" as NegotiationStatusFilter });

  const filteredSessions = useMemo(() => {
    const keyword = filters.keyword.trim().toLocaleLowerCase("ko-KR");
    return negotiationSessions.filter((session) =>
      (keyword === "" || [session.id, session.projectName, session.clientName, session.freelancerName].some((value) => value.toLocaleLowerCase("ko-KR").includes(keyword))) &&
      (filters.status === "ALL" || session.status === filters.status),
    );
  }, [filters]);

  const averageCount = negotiationSessions.reduce((sum, session) => sum + session.negotiationCount, 0) / negotiationSessions.length;
  const stats = [
    { label: "전체 협상 세션", value: negotiationSessions.length },
    { label: "진행 중", value: negotiationSessions.filter((session) => session.status === "IN_PROGRESS").length },
    { label: "협상 완료", value: negotiationSessions.filter((session) => session.status === "AGREED").length },
    { label: "협상 결렬", value: negotiationSessions.filter((session) => session.status === "FAILED").length },
    { label: "평균 협상 횟수", value: `${averageCount.toFixed(1)}회` },
    { label: "평균 소요 시간", value: "2.3일" },
  ];

  const handleSearch = () => setFilters({ keyword: keywordInput, status: statusInput });
  const handleReset = () => {
    setKeywordInput("");
    setStatusInput("ALL");
    setFilters({ keyword: "", status: "ALL" });
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <AdminPageHeader title="AI Agent 관리" description="AI 협상 에이전트의 활동을 모니터링합니다." date="2026년 8월 12일" />
      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => <AgentStatCard key={stat.label} {...stat} />)}
      </section>
      <section className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
        <AgentFilter keyword={keywordInput} status={statusInput} onKeywordChange={setKeywordInput} onStatusChange={setStatusInput} onSearch={handleSearch} onReset={handleReset} />
        <div className="scrollbar-hidden overflow-x-auto"><div className="min-w-[1220px]">
          <div className="grid h-11 grid-cols-[135px_2fr_1fr_1fr_110px_85px_110px_110px_110px_65px] items-center bg-[#f8fafc] px-4 text-[12px] font-semibold text-[#94a3b8]"><span>협상번호</span><span>프로젝트</span><span>클라이언트</span><span>프리랜서</span><span>상태</span><span>협상횟수</span><span>시작일</span><span>종료일</span><span>최종결과</span><span>상세</span></div>
          {filteredSessions.length > 0 ? filteredSessions.map((session) => <AgentRow key={session.id} session={session} />) : <div className="flex h-40 items-center justify-center text-[14px] font-medium text-[#94a3b8]">조건에 맞는 협상 세션이 없습니다.</div>}
        </div></div>
        <div className="border-t border-[#e5e7eb] px-5 py-4 text-[13px] font-semibold text-[#94a3b8]">{filteredSessions.length}개의 협상 세션</div>
      </section>
    </div>
  );
}
