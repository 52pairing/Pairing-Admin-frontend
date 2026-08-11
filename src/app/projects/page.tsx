"use client";

import { useMemo, useState } from "react";

import AdminPageHeader from "@/features/common/components/Header";
import ProjectFilter from "@/features/projects/components/ProjectFilter";
import ProjectRow from "@/features/projects/components/ProjectRow";
import ProjectStatusTabs, {
  projectStatuses,
} from "@/features/projects/components/ProjectStatusTabs";
import { projects } from "@/features/projects/projects";
import type {
  ProjectStatusFilter,
} from "@/features/projects/types";

export default function AdminProjectsPage() {
  const [status, setStatus] = useState<ProjectStatusFilter>("ALL");
  const [keywordInput, setKeywordInput] = useState("");
  const [clientInput, setClientInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [client, setClient] = useState("");

  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(
      ["ALL", ...projectStatuses].map((projectStatus) => [projectStatus, 0]),
    ) as Record<ProjectStatusFilter, number>;

    counts.ALL = projects.length;
    projects.forEach((project) => {
      counts[project.status] += 1;
    });

    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLocaleLowerCase("ko-KR");

    return projects.filter((project) => {
      const matchesStatus = status === "ALL" || project.status === status;
      const matchesKeyword =
        normalizedKeyword === "" ||
        project.name.toLocaleLowerCase("ko-KR").includes(normalizedKeyword) ||
        project.client.toLocaleLowerCase("ko-KR").includes(normalizedKeyword);
      const matchesClient = client === "" || project.client === client;

      return matchesStatus && matchesKeyword && matchesClient;
    });
  }, [client, keyword, status]);

  const handleSearch = () => {
    setKeyword(keywordInput);
    setClient(clientInput);
  };

  const handleReset = () => {
    setStatus("ALL");
    setKeywordInput("");
    setClientInput("");
    setKeyword("");
    setClient("");
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
      <AdminPageHeader
        title="프로젝트 관리"
        description="플랫폼에 등록된 모든 프로젝트를 관리합니다."
        date="2026년 8월 11일"
      />

      <ProjectStatusTabs
        value={status}
        counts={statusCounts}
        onChange={setStatus}
      />

      <section className="mt-6 overflow-hidden rounded-xl border border-[#e2e8f0] bg-white">
        <ProjectFilter
          keyword={keywordInput}
          client={clientInput}
          onKeywordChange={setKeywordInput}
          onClientChange={setClientInput}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className="overflow-x-auto">
          <div className="min-w-[980px]">
            <div className="grid h-11 grid-cols-[110px_2fr_1.2fr_110px_160px_120px_70px] items-center bg-[#f8fafc] px-3 text-[12px] font-semibold text-[#94a3b8]">
              <span>번호</span>
              <span>프로젝트명</span>
              <span>클라이언트</span>
              <span>상태</span>
              <span>계약 금액</span>
              <span>등록일</span>
              <span>상세</span>
            </div>

            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))
            ) : (
              <div className="flex h-40 items-center justify-center text-[14px] font-medium text-[#94a3b8]">
                조건에 맞는 프로젝트가 없습니다.
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#e5e7eb] px-5 py-4 text-[13px] font-semibold text-[#94a3b8]">
          {filteredProjects.length}개의 프로젝트
        </div>
      </section>
    </div>
  );
}
