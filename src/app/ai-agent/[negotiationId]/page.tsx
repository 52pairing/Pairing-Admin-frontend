"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchNegotiationDetail, fetchNegotiationTokenUsage } from "@/features/ai-agent/api";
import AgentDetailCard from "@/features/ai-agent/components/AgentDetailCard";
import MatchingLogTab from "@/features/ai-agent/components/MatchingLogTab";
import NegotiationStatusBadge from "@/features/ai-agent/components/NegotiationStatusBadge";
import type { NegotiationDetail, NegotiationTokenUsage } from "@/features/ai-agent/types";
import { ErrorState } from "@/features/common/components/ErrorState";
import { LoadingState } from "@/features/common/components/Loading";

type DetailTab = "LOG" | "TOKEN" | "MATCHING";
const show = (value: string | null) => value ?? "—";
const seconds = (value: number | null) => value === null ? "-" : `${(value / 1000).toFixed(1)}초`;

export default function AiAgentDetailPage() {
  const { negotiationId } = useParams<{ negotiationId: string }>();
  const id = /^\d+$/.test(negotiationId) ? Number(negotiationId) : null;
  const [data, setData] = useState<NegotiationDetail | null>(null);
  const [token, setToken] = useState<NegotiationTokenUsage | null>(null);
  const [tab, setTab] = useState<DetailTab>("LOG");
  const [loadingToken, setLoadingToken] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (id === null) return;
    let active = true;
    fetchNegotiationDetail(id).then((value) => { if (active) setData(value); }).catch((reason: unknown) => {
      if (active) setError(reason instanceof Error ? reason.message : "협상을 불러오지 못했습니다.");
    });
    return () => { active = false; };
  }, [id]);

  const openToken = async () => {
    setTab("TOKEN");
    if (token || id === null) return;
    setLoadingToken(true);
    try { setToken(await fetchNegotiationTokenUsage(id)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "토큰 사용량을 불러오지 못했습니다."); }
    finally { setLoadingToken(false); }
  };

  if (id === null) return <ErrorState title="올바르지 않은 협상 ID입니다" />;
  if (error && !data) return <ErrorState title="협상을 불러오지 못했습니다" description={error} />;
  if (!data) return <LoadingState message="협상 상세를 불러오는 중입니다." className="min-h-[60vh]" />;

  const result = Object.entries({ "단가": data.finalResult.amountLabel, "기간": data.finalResult.periodLabel, "시작일": data.finalResult.startDateLabel, "근무 방식": data.finalResult.workStyleLabel, "근무 형태": data.finalResult.workFormLabel }).filter(([, value]) => value !== null);
  const tabs: Array<{ value: DetailTab; label: string; action: () => void }> = [
    { value: "LOG", label: "협상 로그", action: () => setTab("LOG") },
    { value: "TOKEN", label: "토큰 사용량", action: () => void openToken() },
    { value: "MATCHING", label: "매칭", action: () => setTab("MATCHING") },
  ];

  return <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between"><div><h1 className="text-[24px] font-bold">AI 협상 상세</h1><p className="mt-2 text-[13px]">협상 ID {data.negotiationId}</p></div><Link href="/ai-agent" className="h-fit w-fit rounded-lg border bg-white px-4 py-2 text-[13px]">← AI Agent 목록으로</Link></header>
    <div className="space-y-4">
      <AgentDetailCard title="기본 정보" items={[{ label: "협상 ID", value: data.negotiationId }, { label: "프로젝트", value: data.projectTitle }, { label: "클라이언트", value: data.clientName }, { label: "프리랜서", value: data.freelancerName }, { label: "상태", value: <NegotiationStatusBadge status={data.status} label={data.statusLabel} /> }, { label: "협상 라운드", value: `${data.totalRound}회` }, { label: "시작일", value: show(data.startedAt) }, { label: "종료일", value: show(data.endedAt) }]} />
      <AgentDetailCard title="최종 협상 결과" items={result.length ? result.map(([label, value]) => ({ label, value })) : [{ label: "결과", value: "합의된 항목이 없습니다." }]} />
      <div className="scrollbar-hidden overflow-x-auto border-b"><div className="flex min-w-max">{tabs.map((item) => <button key={item.value} type="button" onClick={item.action} className={`relative px-5 py-4 text-[13px] font-semibold ${tab === item.value ? "text-blue-600" : "text-slate-500"}`}>{item.label}{tab === item.value && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600" />}</button>)}</div></div>
      {tab === "LOG" && <NegotiationLogs data={data} />}
      {tab === "TOKEN" && (loadingToken ? <LoadingState message="토큰 사용량을 불러오는 중입니다." /> : token ? <TokenView data={token} /> : <ErrorState title="토큰 사용량을 불러오지 못했습니다" description={error} />)}
      {tab === "MATCHING" && <MatchingLogTab projectId={data.projectId} />}
    </div>
  </div>;
}

function NegotiationLogs({ data }: { data: NegotiationDetail }) {
  return <div className="space-y-4">{data.rounds.map((round) => { const humanCount = round.messages.filter((message) => !message.byAgent && message.messageType === "RESPONSE").length; return <section key={round.roundNo} className="overflow-hidden rounded-xl border bg-white"><header className="flex gap-4 bg-[#f8fafc] p-4 font-bold"><span>{round.roundNo === 0 ? "협상 전 안내" : `${round.roundNo}차 협상`}</span><span>{round.messageCount}건</span>{humanCount > 0 && <span className="text-orange-600">사람 개입 {humanCount}회</span>}</header><div className="scrollbar-hidden overflow-x-auto"><div className="min-w-[1100px]">{round.messages.map((message, index) => <div key={`${message.sentAt}-${index}`} className={`grid grid-cols-[145px_110px_90px_90px_140px_2fr_1.3fr_80px] gap-2 border-t p-3 text-[11px] ${!message.byAgent ? "border-l-4 border-l-orange-400 bg-orange-50" : ""}`}><span>{show(message.sentAt)}</span><span>{message.senderLabel}</span><span>{show(message.conditionLabel)}</span><span>{message.messageTypeLabel}</span><span>{show(message.proposedValueLabel)}</span><span>{message.content}</span><span>{show(message.reason)}</span><span>{show(message.responseLabel)}</span></div>)}</div></div></section>; })}</div>;
}

function TokenView({ data }: { data: NegotiationTokenUsage }) {
  const usage = data.usage;
  const known = data.byRound.reduce((sum, round) => sum + round.promptTokens, 0);
  const unknown = Math.max(0, usage.promptTokens - known);
  return <div className="space-y-4"><section className="grid grid-cols-2 gap-3 lg:grid-cols-7">{[["총 호출", usage.totalCalls], ["입력 토큰", usage.promptTokens], ["출력 토큰", usage.outputTokens], ["평균 응답", seconds(usage.averageLatencyMs)], ["최대 응답", seconds(usage.maxLatencyMs)], ["성공/실패", `${usage.successCalls}/${usage.failedCalls}`], ["재시도", usage.retryCount]].map(([label, value]) => <div key={label} className="rounded-xl border bg-white p-4"><p className="text-[12px] text-[#94a3b8]">{label}</p><p className="mt-2 font-bold">{value}</p></div>)}</section><section className="rounded-xl border bg-white p-5"><h3 className="font-bold">라운드별 사용량</h3><div className="mt-4 space-y-2">{data.byRound.map((round) => <div key={round.roundNo} className="grid grid-cols-[50px_1fr_100px] text-[12px]"><b>R{round.roundNo}</b><span>{round.promptTokens.toLocaleString()} / {round.outputTokens.toLocaleString()} tokens</span><span>{round.calls}건</span></div>)}{unknown > 0 && <p className="mt-3 text-[12px] text-amber-700">라운드 미확인 · 차트 제외: 입력 토큰 {unknown.toLocaleString()}</p>}</div></section><section className="scrollbar-hidden overflow-x-auto rounded-xl border bg-white p-5"><h3 className="font-bold">호출 내역</h3><div className="mt-4 min-w-[900px]">{data.calls.map((call) => <div key={call.logId} className="grid grid-cols-[70px_170px_1.4fr_90px_90px_90px_110px_1fr] border-t py-3 text-[11px]"><span>{call.roundNo ?? "-"}</span><span>{show(call.calledAt)}</span><span>{call.model}</span><span>{call.promptTokens?.toLocaleString() ?? "-"}</span><span>{call.outputTokens?.toLocaleString() ?? "-"}</span><span>{seconds(call.latencyMs)}</span><span>{call.statusLabel === "실패" && call.retryCount > 0 ? "실패 (재시도)" : call.statusLabel}</span><span>{call.errorMessage ?? "-"}</span></div>)}</div></section></div>;
}
