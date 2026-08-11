import Link from "next/link";

import type { Project } from "../types";
import ProjectStatusBadge from "./ProjectStatusBadge";

interface ProjectRowProps {
  project: Project;
}

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
        <ProjectStatusBadge status={project.status} />
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
