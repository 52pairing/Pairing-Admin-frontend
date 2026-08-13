"use client";

import { MatchingProjectDiagnosticsDetail } from "@/features/ai-matching/components/MatchingDiagnostics";
import { ErrorState } from "@/features/common/components/ErrorState";

export default function MatchingLogTab({ projectId }: { projectId?: number }) {
  if (projectId === undefined) {
    return <ErrorState title="매칭 정보를 불러올 수 없습니다" description="협상 상세 응답에 프로젝트 ID가 없습니다." />;
  }
  return <MatchingProjectDiagnosticsDetail projectId={projectId} />;
}
