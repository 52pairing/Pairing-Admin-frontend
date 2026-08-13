import type { ProjectStatus, ProjectStatusCounts } from "../types";
export default function ProjectStatusTabs({ value, counts, onChange }: { value?: ProjectStatus; counts: ProjectStatusCounts; onChange: (value?: ProjectStatus) => void }) {
  const tabs = [{ status: undefined, label: "전체", count: counts.total }, ...counts.items];
  return <div className="overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white"><div className="flex min-w-max px-2" role="tablist" aria-label="프로젝트 상태">{tabs.map((tab) => { const active = value === tab.status; return <button key={tab.status ?? "ALL"} type="button" role="tab" aria-selected={active} onClick={() => onChange(tab.status)} className={`relative px-4 py-4 text-[13px] font-semibold ${active ? "text-[#3b6df6]" : "text-[#94a3b8]"}`}>{tab.label} ({tab.count}){active ? <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#3b6df6]" /> : null}</button>; })}</div></div>;
}
