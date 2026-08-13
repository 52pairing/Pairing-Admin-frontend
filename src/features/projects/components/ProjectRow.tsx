import Link from "next/link";
import type { ProjectListItem } from "../types";
import ProjectStatusBadge from "./ProjectStatusBadge";
export default function ProjectRow({ project }: { project: ProjectListItem }) {
  const category = project.positionCount ? `${project.jobCategoryLabel} · ${project.jobRoleLabel}${project.positionCount > 1 ? ` 외 ${project.positionCount - 1}건` : ""}` : "포지션 미등록";
  const amount = project.contractSalaryAmount == null ? `예산 ${project.budgetAmount.toLocaleString("ko-KR")}원` : `월 ${project.contractSalaryAmount.toLocaleString("ko-KR")}원`;
  return <div className="grid min-h-[66px] grid-cols-[110px_2fr_1.2fr_110px_160px_120px_70px] items-center border-b border-[#e5e7eb] px-3 text-[13px]"><span>{project.projectNo}</span><div className="min-w-0 pr-4"><p className="truncate font-bold">{project.title}</p><p className="mt-1 truncate text-[12px] text-[#94a3b8]">{category}</p></div><Link href={`/users/${project.clientAccountId}`} className="truncate font-semibold text-[#64748b] hover:underline">{project.clientName}</Link><div>{project.status ? <ProjectStatusBadge status={project.status} label={project.statusLabel} /> : <span>{project.statusLabel}</span>}</div><span>{amount}</span><span>{project.createdAt?.slice(0, 10) ?? "-"}</span><Link href={`/projects/${project.projectId}`} className="flex h-8 w-11 items-center justify-center rounded-md bg-[#edf3f8] text-[12px] font-bold text-[#17324d]">상세</Link></div>;
}
