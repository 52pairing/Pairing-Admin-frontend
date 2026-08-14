"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";

import { ErrorState } from "@/features/common/components/ErrorState";
import { LoadingState } from "@/features/common/components/Loading";
import { ConfirmModal } from "@/features/common/components/Modal";
import {
  fetchMatchingProjectDiagnostics,
  fetchMatchingProjects,
  reindexPosition,
} from "../api";
import type {
  MatchingIssue,
  MatchingPositionDiagnostics,
  MatchingProjectDiagnostics,
  MatchingProjectSummary,
  PageData,
} from "../types";

const formatDate = (value: string | null) => {
  if (!value) return "-";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: "short" }).format(date);
};

const statusTone = (hasIssue: boolean) => hasIssue
  ? "border-red-200 bg-red-50 text-red-700"
  : "border-green-200 bg-green-50 text-green-700";

export default function MatchingDiagnostics() {
  const [onlyIssues, setOnlyIssues] = useState(false);
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState<PageData<MatchingProjectSummary> | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (selectedProjectId !== null) return;
    let active = true;
    fetchMatchingProjects(onlyIssues, page)
      .then((data) => { if (active) { setProjects(data); setError(undefined); } })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "매칭 진단 프로젝트를 불러오지 못했습니다."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [onlyIssues, page, selectedProjectId]);

  if (selectedProjectId !== null) {
    return <MatchingProjectDiagnosticsDetail projectId={selectedProjectId} onBack={() => { setLoading(true); setSelectedProjectId(null); }} />;
  }

  return <section className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
    <header className="flex flex-col gap-3 border-b border-[#e2e8f0] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <div>
        <h2 className="font-bold text-[#111827]">매칭 진단 프로젝트</h2>
        <p className="mt-1 text-[12px] text-[#64748b]">착수금 결제가 완료된 프로젝트의 매칭 파이프라인 상태를 확인합니다.</p>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-[#475569]">
        <input
          type="checkbox"
          checked={onlyIssues}
          onChange={(event) => { setLoading(true); setOnlyIssues(event.target.checked); setPage(0); }}
          className="h-4 w-4 rounded border-[#cbd5e1]"
        />
        문제 있는 프로젝트만
      </label>
    </header>

    {loading ? <LoadingState className="min-h-64" message="매칭 진단 프로젝트를 불러오는 중입니다." />
      : error ? <ErrorState title="프로젝트 목록을 불러오지 못했습니다" description={error} className="min-h-64" />
      : projects?.content.length ? <>
        <div className="overflow-x-auto">
          <div className="min-w-[1180px]">
            <div className="grid grid-cols-[80px_2fr_1.2fr_110px_120px_150px_85px_85px_160px_70px] items-center bg-[#f8fafc] px-4 py-3 text-[11px] font-bold text-[#64748b]">
              <span>ID</span><span>프로젝트</span><span>클라이언트</span><span>상태</span><span>결제 상태</span><span>모집 시작</span><span>포지션</span><span>문제</span><span>최근 AI 호출</span><span>상세</span>
            </div>
            {projects.content.map((project) => <div key={project.projectId} className="grid grid-cols-[80px_2fr_1.2fr_110px_120px_150px_85px_85px_160px_70px] items-center border-t border-[#e2e8f0] px-4 py-3 text-[12px]">
              <span className="font-semibold text-[#64748b]">{project.projectId}</span>
              <strong className="truncate pr-3 text-[#111827]" title={project.title}>{project.title}</strong>
              <span className="truncate pr-3" title={project.clientName ?? "회사 정보 없음"}>{project.clientName ?? "회사 정보 없음"}</span>
              <span>{project.statusLabel}</span>
              <span>{project.paymentStatusLabel}</span>
              <span>{formatDate(project.recruitStartedAt)}</span>
              <span>{project.positionCount}개</span>
              <span><b className={`inline-flex rounded-full border px-2 py-1 text-[11px] ${statusTone(project.issueCount > 0)}`}>{project.issueCount}건</b></span>
              <span>{project.lastAiLogAt ? formatDate(project.lastAiLogAt) : "호출 기록 없음"}</span>
              <button type="button" onClick={() => setSelectedProjectId(project.projectId)} className="rounded-md border border-[#cbd5e1] px-2 py-1.5 font-semibold text-[#17345d] hover:bg-[#f8fafc]">보기</button>
            </div>)}
          </div>
        </div>
        <Pagination data={projects} onPage={(nextPage) => { setLoading(true); setPage(nextPage); }} />
      </> : <div className="py-16 text-center text-[13px] text-[#64748b]">조건에 맞는 프로젝트가 없습니다.</div>}
  </section>;
}

export function MatchingProjectDiagnosticsDetail({ projectId, onBack }: { projectId: number; onBack?: () => void }) {
  const [data, setData] = useState<MatchingProjectDiagnostics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [reindexTarget, setReindexTarget] = useState<MatchingPositionDiagnostics | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string>();

  useEffect(() => {
    let active = true;
    fetchMatchingProjectDiagnostics(projectId)
      .then((result) => { if (active) { setData(result); setError(undefined); } })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "프로젝트 진단 결과를 불러오지 못했습니다."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [projectId]);

  const reindex = async () => {
    if (!reindexTarget || !data) return;
    setSubmitting(true);
    try {
      await reindexPosition(reindexTarget.position.positionId, data.project.projectId);
      setNotice("재색인을 시작했습니다. 잠시 후 목록을 새로고침해 주세요.");
      setReindexTarget(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "재색인을 시작하지 못했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return <section className="space-y-4">
    {onBack ? <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-lg border border-[#e2e8f0] bg-white px-4 py-2 text-[13px] font-semibold text-[#475569] hover:bg-[#f8fafc]"><ArrowLeft className="h-4 w-4"/>프로젝트 목록</button> : null}
    {notice ? <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-3 text-[13px] text-green-700">{notice}</p> : null}
    {loading ? <LoadingState className="min-h-64" message="프로젝트 진단 결과를 불러오는 중입니다." />
      : error && !data ? <ErrorState title="진단 결과를 불러오지 못했습니다" description={error} className="min-h-64" />
      : data ? <>
        <header className="rounded-xl border border-[#e2e8f0] bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div><p className="text-[12px] font-semibold text-[#94a3b8]">PROJECT #{data.project.projectId}</p><h2 className="mt-1 text-xl font-bold text-[#111827]">{data.project.title}</h2><p className="mt-2 text-[13px] text-[#64748b]">{data.project.statusLabel} · {data.project.paymentStatusLabel}</p></div>
            <div className="flex flex-wrap gap-2"><SummaryBadge label="프로젝트 스냅샷" value={data.projectSnapshotExists ? "정상" : "없음"} issue={!data.projectSnapshotExists}/><SummaryBadge label="포지션" value={`${data.positionCount}개`}/><SummaryBadge label="문제" value={`${data.issueCount}건`} issue={data.issueCount > 0}/></div>
          </div>
        </header>
        {error ? <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-[13px] text-red-700">{error}</p> : null}
        <div className="space-y-3">{data.positions.map((position) => <PositionCard key={position.position.positionId} position={position} onReindex={() => setReindexTarget(position)} />)}</div>
        {data.positions.length === 0 ? <div className="rounded-xl border bg-white py-16 text-center text-[13px] text-[#64748b]">진단할 포지션이 없습니다.</div> : null}
      </> : null}
    <ConfirmModal
      open={reindexTarget !== null}
      title="포지션 임베딩을 재색인할까요?"
      description={reindexTarget ? `포지션 #${reindexTarget.position.positionId}의 재색인 작업을 시작합니다.` : undefined}
      confirmText={submitting ? "요청 중..." : "재색인 시작"}
      cancelText="취소"
      onConfirm={() => { if (!submitting) void reindex(); }}
      onClose={() => { if (!submitting) setReindexTarget(null); }}
      closeOnOverlayClick={false}
    />
  </section>;
}

function PositionCard({ position, onReindex }: { position: MatchingPositionDiagnostics; onReindex: () => void }) {
  const hasIssue = position.issues.length > 0;
  const canReindex = position.issues.some((issue) => issue.code === "POSITION_EMBEDDING_MISSING");
  return <article className={`overflow-hidden rounded-xl border bg-white ${hasIssue ? "border-red-200" : "border-[#e2e8f0]"}`}>
    <header className="flex flex-col gap-3 border-b border-[#e2e8f0] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">{hasIssue ? <AlertTriangle className="h-5 w-5 text-red-500"/> : <CheckCircle2 className="h-5 w-5 text-green-600"/>}<div><h3 className="font-bold text-[#111827]">포지션 #{position.position.positionId}</h3><p className="mt-0.5 text-[12px] text-[#64748b]">{position.position.jobCategory} · {position.position.jobRole} · {position.position.statusLabel}</p></div></div>
      {canReindex ? <button type="button" onClick={onReindex} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#102947] px-4 py-2 text-[12px] font-bold text-white hover:bg-[#17345d]"><RefreshCw className="h-4 w-4"/>재색인</button> : null}
    </header>
    <div className="grid gap-px bg-[#e2e8f0] sm:grid-cols-2 lg:grid-cols-4">
      <DiagnosticCell label="포지션 스냅샷" value={position.positionSnapshotExists ? "있음" : "없음"} issue={!position.positionSnapshotExists}/>
      <DiagnosticCell label="포지션 임베딩" value={position.positionEmbeddingExists ? "있음" : "없음"} issue={!position.positionEmbeddingExists}/>
      <DiagnosticCell label="임베딩 모델 / 차원" value={`${position.positionModel ?? "없음"} / ${position.positionEmbeddingDimension ?? "-"}`}/>
      <DiagnosticCell label="프리랜서 후보 풀" value={`${position.freelancerEmbeddingCount.toLocaleString("ko-KR")}명`} issue={position.freelancerEmbeddingCount === 0}/>
      <DiagnosticCell label="최신 라운드" value={position.round.roundId === null ? "없음" : `R${position.round.roundNo} · ${position.round.roundTypeLabel ?? "-"} · ${position.round.statusLabel ?? "-"}`} issue={position.round.roundId === null}/>
      <DiagnosticCell label="후보 / 노출 / 요청" value={`${position.counts.candidateCount} / ${position.counts.exposedCandidateCount} / ${position.counts.requestCount}`}/>
      <DiagnosticCell label="최근 AI 호출" value={position.lastAiLog.status === null ? "호출 기록 없음" : `${position.lastAiLog.statusLabel ?? "-"} · ${formatDate(position.lastAiLog.createdAt)}`} issue={position.lastAiLog.status === "FAILED"}/>
      <DiagnosticCell label="AI 오류" value={position.lastAiLog.errorMessage ?? "-"}/>
    </div>
    <IssueList issues={position.issues}/>
  </article>;
}

function IssueList({ issues }: { issues: MatchingIssue[] }) {
  if (issues.length === 0) return <p className="p-4 text-[12px] font-semibold text-green-700">확인된 문제가 없습니다.</p>;
  return <ul className="space-y-2 bg-red-50/60 p-4">{issues.map((issue, index) => <li key={`${issue.code}-${index}`} className="flex gap-2 text-[12px] leading-5 text-red-700"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0"/><span><b className="mr-2">{issue.code}</b>{issue.message}</span></li>)}</ul>;
}

function DiagnosticCell({ label, value, issue = false }: { label: string; value: string; issue?: boolean }) {
  return <div className="bg-white p-4"><p className="text-[11px] font-semibold text-[#94a3b8]">{label}</p><p className={`mt-1 break-words text-[12px] font-semibold ${issue ? "text-red-600" : "text-[#334155]"}`}>{value}</p></div>;
}

function SummaryBadge({ label, value, issue = false }: { label: string; value: string; issue?: boolean }) {
  return <div className={`rounded-lg border px-3 py-2 text-[12px] ${statusTone(issue)}`}><span className="mr-2 opacity-80">{label}</span><b>{value}</b></div>;
}

function Pagination({ data, onPage }: { data: PageData<MatchingProjectSummary>; onPage: (page: number) => void }) {
  return <div className="flex flex-col gap-3 border-t px-5 py-4 text-[13px] sm:flex-row sm:items-center sm:justify-between"><span>총 {data.totalElements.toLocaleString("ko-KR")}개 · {data.page + 1}/{Math.max(data.totalPages, 1)} 페이지</span><div className="flex gap-2"><button type="button" disabled={data.first} onClick={() => onPage(data.page - 1)} className="rounded-lg border px-4 py-2 disabled:opacity-40">이전</button><button type="button" disabled={data.last} onClick={() => onPage(data.page + 1)} className="rounded-lg border px-4 py-2 disabled:opacity-40">다음</button></div></div>;
}
