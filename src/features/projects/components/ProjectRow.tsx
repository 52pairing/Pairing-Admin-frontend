import Link from "next/link";

import type {
  Project,
  ProjectStatus,
} from "../types";

interface ProjectRowProps {
  project: Project;
}

const statusLabel: Record<ProjectStatus, string> = {
  REGISTERED: "등록 완료",
  RECRUITING: "모집중",
  NEGOTIATING: "협상중",
  CONTRACT_PENDING: "계약 대기",
  IN_PROGRESS: "진행중",
  COMPLETION_PENDING: "완료 대기",
  COMPLETED: "종료",
  CANCELED: "취소됨",
};

const statusStyle: Record<ProjectStatus, string> = {
  REGISTERED: "bg-[#f0e8ff] text-[#7c3aed]",
  RECRUITING: "bg-[#f1f5f9] text-[#64748b]",
  NEGOTIATING: "bg-[#fff3d7] text-[#d97706]",
  CONTRACT_PENDING: "bg-[#e5efff] text-[#2563eb]",
  IN_PROGRESS: "bg-[#dbeafe] text-[#2563eb]",
  COMPLETION_PENDING: "bg-[#fff7ed] text-[#ea580c]",
  COMPLETED: "bg-[#dcfce7] text-[#16a34a]",
  CANCELED: "bg-[#fee2e2] text-[#ef4444]",
};

export default function ProjectRow({ project }: ProjectRowProps) {
  return (
    <div className="grid min-h-[66px] grid-cols-[110px_2fr_1.2fr_110px_160px_120px_70px] items-center border-b border-[#e5e7eb] px-3 text-[13px] last:border-b-0">
      <span className="font-semibold text-[#64748b]">{project.id}</span>

      <div className="min-w-0 pr-4">
        <p className="truncate font-bold text-[#111827]">{project.name}</p>
        <p className="mt-1 truncate text-[12px] text-[#94a3b8]">
          {project.category}
        </p>
      </div>

      <span className="truncate pr-3 font-semibold text-[#64748b]">
        {project.client}
      </span>

      <div>
        <span className={`rounded-md px-2 py-1 text-[11px] font-bold ${statusStyle[project.status]}`}>
          {statusLabel[project.status]}
        </span>
      </div>

      <span className="font-semibold text-[#64748b]">
        월 {project.contractAmount.toLocaleString("ko-KR")}원
      </span>

      <span className="font-semibold text-[#64748b]">
        {project.registeredAt}
      </span>

      <Link
        href={`/projects/${project.id}`}
        className="flex h-8 w-11 items-center justify-center rounded-md bg-[#edf3f8] text-[12px] font-bold text-[#17324d] transition hover:bg-[#dce7f1]"
        aria-label={`${project.name} 상세 보기`}
      >
        상세
      </Link>
    </div>
  );
}
