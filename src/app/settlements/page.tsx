"use client";

import { useMemo, useState } from "react";

import AdminPageHeader from "@/features/common/components/Header";
import SettlementFilter from "@/features/settlements/components/SettlementFilter";
import SettlementRow from "@/features/settlements/components/SettlementRow";
import SettlementStatCard from "@/features/settlements/components/SettlementStatCard";
import {
  settlements,
  settlementStats,
} from "@/features/settlements/settlements";
import type {
  SettlementMemberFilter,
  SettlementStatusFilter,
} from "@/features/settlements/types";

export default function AdminSettlementsPage() {
  const [keywordInput, setKeywordInput] = useState("");
  const [memberTypeInput, setMemberTypeInput] = useState<SettlementMemberFilter>("ALL");
  const [statusInput, setStatusInput] = useState<SettlementStatusFilter>("ALL");
  const [keyword, setKeyword] = useState("");
  const [memberType, setMemberType] = useState<SettlementMemberFilter>("ALL");
  const [status, setStatus] = useState<SettlementStatusFilter>("ALL");

  const filteredSettlements = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase("ko-KR");

    return settlements.filter((settlement) => {
      const matchesKeyword =
        normalizedKeyword === "" ||
        settlement.id.toLocaleLowerCase("ko-KR").includes(normalizedKeyword) ||
        settlement.projectName.toLocaleLowerCase("ko-KR").includes(normalizedKeyword) ||
        settlement.memberName.toLocaleLowerCase("ko-KR").includes(normalizedKeyword);
      const matchesMemberType =
        memberType === "ALL" || settlement.memberType === memberType;
      const matchesStatus = status === "ALL" || settlement.status === status;

      return matchesKeyword && matchesMemberType && matchesStatus;
    });
  }, [keyword, memberType, status]);

  const handleSearch = () => {
    setKeyword(keywordInput);
    setMemberType(memberTypeInput);
    setStatus(statusInput);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <AdminPageHeader
        title="거래·정산 관리"
        description="플랫폼의 모든 정산 내역을 관리합니다."
        date="2026년 8월 11일"
      />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {settlementStats.map((stat) => (
          <SettlementStatCard
            key={stat.label}
            label={stat.label}
            amount={stat.amount}
          />
        ))}
      </section>

      <section className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
        <SettlementFilter
          keyword={keywordInput}
          memberType={memberTypeInput}
          status={statusInput}
          onKeywordChange={setKeywordInput}
          onMemberTypeChange={setMemberTypeInput}
          onStatusChange={setStatusInput}
          onSearch={handleSearch}
        />

        <div className="scrollbar-hidden overflow-x-auto">
          <div className="min-w-[1080px]">
            <div className="grid h-11 grid-cols-[115px_1.7fr_110px_120px_105px_70px_100px_95px_100px_100px_60px] items-center bg-[#f8fafc] px-3 text-[12px] font-semibold text-[#94a3b8]">
              <span>정산번호</span>
              <span>프로젝트</span>
              <span>회원</span>
              <span>유형</span>
              <span>기준금액</span>
              <span>수수료율</span>
              <span>수수료</span>
              <span>상태</span>
              <span>기한</span>
              <span>완료일</span>
              <span>상세</span>
            </div>

            {filteredSettlements.length > 0 ? (
              filteredSettlements.map((settlement) => (
                <SettlementRow key={settlement.id} settlement={settlement} />
              ))
            ) : (
              <div className="flex h-40 items-center justify-center text-[14px] font-medium text-[#94a3b8]">
                조건에 맞는 정산 내역이 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#e5e7eb] px-5 py-4 text-[13px] font-semibold text-[#94a3b8]">
          {filteredSettlements.length}건의 정산 내역
        </div>
      </section>
    </div>
  );
}
