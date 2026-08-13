"use client";

import { useState } from "react";

const missing = [
  { type: "POSITION", id: "POS-142", reason: "프리랜서 프로필 미등록으로 임베딩 스킵", checkedAt: "2026.07.25 14:23" },
  { type: "FREELANCER", id: "FL-038", reason: "스킬 태그 변경 후 갱신 미실행", checkedAt: "-" },
];
const logs = [
  { at: "2026.08.01 09:00:12", type: "POSITION", id: "POS-141", dimension: "1,536", duration: "1.24초", success: true, error: "" },
  { at: "2026.08.01 09:00:15", type: "FREELANCER", id: "FL-039", dimension: "1,536", duration: "0.98초", success: true, error: "" },
  { at: "2026.08.01 09:01:03", type: "POSITION", id: "POS-142", dimension: "-", duration: "-", success: false, error: "freelancer_profile not found" },
  { at: "2026.07.30 16:45:22", type: "FREELANCER", id: "FL-038", dimension: "-", duration: "-", success: false, error: "embedding vector null → skipped" },
];
const positions = [
  { id: "POS-141", values: [true, true, true, true, true] },
  { id: "POS-142", values: [true, false, false, false, false] },
];
const typeClass = (type: string) => type === "POSITION" ? "bg-blue-50 text-blue-600" : "bg-violet-50 text-violet-600";

export default function MatchingLogTab({ projectId }: { projectId: number }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ALL");
  const filtered = logs.filter((log) => (!query || log.id.toLowerCase().includes(query.toLowerCase())) && (filter === "ALL" || (filter === "SUCCESS" ? log.success : !log.success)));
  return <div className="space-y-4">
    <section className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white"><header className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-2"><h3 className="font-bold">임베딩 재색인 관리</h3><span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">누락 {missing.length}건</span></div><button type="button" className="h-9 rounded-lg bg-[#102d4d] px-4 text-[12px] font-bold text-white">↻ 일괄 재색인</button></header><div className="scrollbar-hidden overflow-x-auto"><div className="min-w-[720px]">{missing.map((item) => <div key={item.id} className="grid grid-cols-[130px_110px_1fr_160px_80px] items-center border-b px-4 py-3 text-[11px] last:border-0"><span><b className={`rounded px-2 py-1 text-[9px] ${typeClass(item.type)}`}>{item.type}</b></span><strong>{item.id}</strong><span className="text-slate-500">{item.reason}</span><span className="text-slate-400">{item.checkedAt}</span><button type="button" className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1.5 font-bold text-blue-600">↻ 재색인</button></div>)}</div></div></section>
    <section className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white"><header className="border-b p-4"><h3 className="font-bold">매칭 로그 조회</h3><div className="mt-3 flex flex-col gap-2 sm:flex-row"><select aria-label="매칭 로그 상태" value={filter} onChange={(event) => setFilter(event.target.value)} className="h-9 rounded-md border px-3 text-[11px]"><option value="ALL">전체</option><option value="SUCCESS">성공</option><option value="FAILED">실패</option></select><input aria-label="매칭 로그 검색" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="refId 검색" className="h-9 rounded-md border px-3 text-[11px]"/></div></header><div className="scrollbar-hidden overflow-x-auto"><div className="min-w-[820px]">{filtered.map((log) => <div key={`${log.at}-${log.id}`} className={`grid grid-cols-[165px_135px_120px_1fr_100px_170px] items-center border-b px-4 py-3 text-[10px] ${log.success ? "" : "bg-red-50/60"}`}><span className="text-slate-400">{log.at}</span><span><b className={`rounded px-2 py-1 text-[9px] ${typeClass(log.type)}`}>{log.type}</b></span><strong>{log.id}</strong><span>{log.dimension}</span><span>{log.duration}</span><span className={log.success ? "font-bold text-green-600" : "font-bold text-red-500"}>{log.success ? "성공" : <>실패 <small className="block font-normal">{log.error}</small></>}</span></div>)}{filtered.length === 0 && <p className="py-10 text-center text-[12px] text-slate-400">조건에 맞는 로그가 없습니다.</p>}</div></div></section>
    <section className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white"><header className="border-b p-4 font-bold">매칭 상태 디버깅 <span className="font-normal text-slate-400">· PROJ-{projectId}</span></header><div className="scrollbar-hidden overflow-x-auto"><div className="min-w-[760px]"><div className="grid grid-cols-[150px_repeat(5,1fr)] bg-slate-50 px-4 py-3 text-[10px] font-semibold text-slate-500"><span>포지션 ID</span><span>스냅샷</span><span>임베딩</span><span>추천 라운드</span><span>후보 생성</span><span>요청 생성</span></div>{positions.map((position) => <div key={position.id} className={`grid grid-cols-[150px_repeat(5,1fr)] border-t px-4 py-3 text-[10px] ${position.values.includes(false) ? "bg-amber-50" : ""}`}><strong>{position.id}</strong>{position.values.map((value, index) => <b key={index} className={value ? "text-green-600" : "text-red-500"}>{value ? "있음" : "없음"}</b>)}</div>)}</div></div></section>
  </div>;
}
