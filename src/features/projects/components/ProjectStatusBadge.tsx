import type { ProjectStatus } from "../types";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
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

export default function ProjectStatusBadge({
  status,
}: ProjectStatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-[11px] font-bold ${statusStyle[status]}`}>
      {statusLabel[status]}
    </span>
  );
}
