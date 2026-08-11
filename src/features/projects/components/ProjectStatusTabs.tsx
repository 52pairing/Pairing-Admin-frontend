import type {
  ProjectStatus,
  ProjectStatusFilter,
} from "../types";

interface ProjectStatusTabsProps {
  value: ProjectStatusFilter;
  counts: Record<ProjectStatusFilter, number>;
  onChange: (value: ProjectStatusFilter) => void;
}

const tabs: Array<{
  label: string;
  value: ProjectStatusFilter;
}> = [
  { label: "전체", value: "ALL" },
  { label: "등록 완료", value: "REGISTERED" },
  { label: "모집중", value: "RECRUITING" },
  { label: "협상중", value: "NEGOTIATING" },
  { label: "계약 대기", value: "CONTRACT_PENDING" },
  { label: "진행중", value: "IN_PROGRESS" },
  { label: "완료 대기", value: "COMPLETION_PENDING" },
  { label: "종료", value: "COMPLETED" },
  { label: "취소됨", value: "CANCELED" },
];

export const projectStatuses = tabs
  .filter((tab) => tab.value !== "ALL")
  .map((tab) => tab.value as ProjectStatus);

export default function ProjectStatusTabs({
  value,
  counts,
  onChange,
}: ProjectStatusTabsProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e2e8f0] bg-white">
      <div className="flex min-w-max px-2" role="tablist" aria-label="프로젝트 상태">
        {tabs.map((tab) => {
          const isActive = value === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.value)}
              className={`relative px-4 py-4 text-[13px] font-semibold transition xl:px-5 ${
                isActive
                  ? "text-[#3b6df6]"
                  : "text-[#94a3b8] hover:text-[#64748b]"
              }`}
            >
              {tab.label} ({counts[tab.value]})
              {isActive && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#3b6df6]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
