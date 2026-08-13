"use client";

import { useCallback, useEffect, useState } from "react";

import AdminPageHeader from "@/features/common/components/Header";
import { ErrorState } from "@/features/common/components/ErrorState";
import { LoadingState } from "@/features/common/components/Loading";
import { fetchMembers, fetchMemberSummary } from "@/features/users/api";
import UserCard from "@/features/users/components/UserCard";
import UserFilter from "@/features/users/components/UserFilter";
import UserList from "@/features/users/components/UserList";
import type { MemberListParams, MemberListResponse, MemberSummary } from "@/features/users/types";

const PAGE_SIZE = 20;
const EMPTY_FILTERS: MemberListParams = {};

export default function AdminMembersPage() {
  const [summary, setSummary] = useState<MemberSummary | null>(null);
  const [list, setList] = useState<MemberListResponse | null>(null);
  const [filterInput, setFilterInput] = useState<MemberListParams>(EMPTY_FILTERS);
  const [filters, setFilters] = useState<MemberListParams>(EMPTY_FILTERS);
  const [page, setPage] = useState(0);
  const [summaryError, setSummaryError] = useState(false);
  const [listError, setListError] = useState<Error | null>(null);
  const [isListLoading, setIsListLoading] = useState(true);

  const loadSummary = useCallback(() => {
    setSummaryError(false);
    fetchMemberSummary().then(setSummary).catch(() => setSummaryError(true));
  }, []);

  const loadList = useCallback(() => {
    setIsListLoading(true);
    setListError(null);
    fetchMembers({ ...filters, keyword: filters.keyword?.trim(), page, size: PAGE_SIZE })
      .then(setList)
      .catch((error: unknown) => setListError(error instanceof Error ? error : new Error("회원 목록을 불러오지 못했습니다.")))
      .finally(() => setIsListLoading(false));
  }, [filters, page]);

  useEffect(() => {
    let active = true;
    fetchMemberSummary().then((data) => { if (active) setSummary(data); }).catch(() => { if (active) setSummaryError(true); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    fetchMembers({ ...filters, keyword: filters.keyword?.trim(), page, size: PAGE_SIZE })
      .then((data) => { if (active) setList(data); })
      .catch((error: unknown) => { if (active) setListError(error instanceof Error ? error : new Error("회원 목록을 불러오지 못했습니다.")); })
      .finally(() => { if (active) setIsListLoading(false); });
    return () => { active = false; };
  }, [filters, page]);

  const stats = summary ? [
    { label: "전체", count: summary.total }, { label: "정상", count: summary.active },
    { label: "정지", count: summary.suspended }, { label: "탈퇴", count: summary.withdrawn },
    { label: "클라이언트", count: summary.clients }, { label: "프리랜서", count: summary.freelancers },
  ] : [];

  return <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
    <AdminPageHeader title="회원 관리" description="플랫폼에 등록된 모든 회원을 관리합니다." date={new Intl.DateTimeFormat("ko-KR", { dateStyle: "long" }).format(new Date())} />
    {summaryError ? <div className="rounded-xl border border-[#e2e8f0] bg-white"><ErrorState title="회원 통계를 불러오지 못했습니다" onRetry={loadSummary} /></div> : summary ? <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{stats.map((stat) => <UserCard key={stat.label} {...stat} />)}</section> : <LoadingState message="회원 통계를 불러오는 중입니다." className="min-h-24" />}

    <section className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
      <UserFilter value={filterInput} onChange={setFilterInput} onFilterChange={(patch) => { setIsListLoading(true); setPage(0); setFilters((current) => ({ ...current, ...patch })); }} disabled={isListLoading} onSearch={() => { setPage(0); setFilters(filterInput); }} />
      {isListLoading ? <LoadingState message="회원 목록을 불러오는 중입니다." className="min-h-64" /> : listError ? <ErrorState title="회원 목록을 불러오지 못했습니다" description={listError.message} onRetry={loadList} className="min-h-64" /> : list && list.content.length > 0 ? <>
        <div className="overflow-x-auto"><div className="min-w-[1050px]"><div className="grid h-10 grid-cols-[110px_130px_1.2fr_1.7fr_100px_120px_120px_90px_120px_70px] items-center bg-[#f8fafc] px-3 text-[12px] font-semibold text-[#94a3b8]"><span>회원번호</span><span>유형</span><span>이름·기업명</span><span>이메일</span><span>가입방식</span><span>가입일</span><span>최근로그인</span><span>상태</span><span>진행프로젝트</span><span>상세</span></div>{list.content.map((user) => <UserList key={user.accountId} user={user} />)}</div></div>
        <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-[13px] font-semibold text-[#94a3b8]">총 {list.totalElements.toLocaleString("ko-KR")}명의 회원 · {list.page + 1}/{Math.max(list.totalPages, 1)} 페이지</p><div className="flex gap-2"><button type="button" disabled={list.first} onClick={() => setPage((value) => Math.max(0, value - 1))} className="h-9 rounded-lg border border-[#e2e8f0] px-4 text-[13px] font-semibold text-[#64748b] disabled:opacity-40">이전</button><button type="button" disabled={list.last} onClick={() => setPage((value) => value + 1)} className="h-9 rounded-lg border border-[#e2e8f0] px-4 text-[13px] font-semibold text-[#64748b] disabled:opacity-40">다음</button></div></div>
      </> : <div className="px-5 py-16 text-center text-[14px] text-[#64748b]">조건에 맞는 회원이 없습니다.</div>}
    </section>
  </div>;
}
