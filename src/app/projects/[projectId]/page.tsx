import Link from "next/link";
import { notFound } from "next/navigation";

import ProjectDetailCard from "@/features/projects/components/ProjectDetailCard";
import ProjectStatusBadge from "@/features/projects/components/ProjectStatusBadge";
import { projects } from "@/features/projects/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[projectId]">) {
  const { projectId } = await params;
  const project = projects.find((item) => item.id === projectId);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#111827] sm:text-[24px]">
            프로젝트 상세
          </h1>
          <p className="mt-2 text-[13px] font-semibold text-[#64748b]">
            {project.id}
          </p>
          <p className="mt-1 text-[13px] text-[#94a3b8]">
            {project.registeredAt}
          </p>
        </div>

        <Link
          href="/projects"
          className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]"
        >
          ← 프로젝트 목록으로
        </Link>
      </header>

      <div className="space-y-4">
        <ProjectDetailCard
          title="기본 정보"
          items={[
            { label: "프로젝트 번호", value: project.id },
            { label: "클라이언트", value: project.client },
            { label: "프로젝트명", value: project.name },
            { label: "카테고리", value: project.category },
            {
              label: "상태",
              value: <ProjectStatusBadge status={project.status} />,
            },
          ]}
        />

        <ProjectDetailCard
          title="계약 정보"
          items={[
            {
              label: "계약 금액",
              value: `월 ${project.contractAmount.toLocaleString("ko-KR")}원`,
            },
          ]}
        />

        <ProjectDetailCard
          title="일정 정보"
          items={[
            { label: "등록일", value: project.registeredAt },
          ]}
        />
      </div>
    </div>
  );
}
