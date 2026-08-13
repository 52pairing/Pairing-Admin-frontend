import type { NegotiationSession } from "./types";

export const negotiationSessions: NegotiationSession[] = [
  {
    id: "NEG-2026-001",
    projectName: "쇼핑몰 관리자 페이지 리뉴얼",
    clientName: "삼성전자",
    freelancerName: "김프리",
    status: "AGREED",
    negotiationCount: 4,
    startedAt: "2026.07.28",
    endedAt: "2026.07.30",
  },
  {
    id: "NEG-2026-002",
    projectName: "모바일 앱 백엔드 API 개발",
    clientName: "카카오",
    freelancerName: "이준혁",
    status: "IN_PROGRESS",
    negotiationCount: 2,
    startedAt: "2026.08.01",
    endedAt: null,
  },
  {
    id: "NEG-2026-003",
    projectName: "AI 추천 시스템 구축",
    clientName: "네이버",
    freelancerName: "최민지",
    status: "FAILED",
    negotiationCount: 6,
    startedAt: "2026.07.15",
    endedAt: "2026.07.22",
  },
];

