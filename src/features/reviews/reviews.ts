import type { Review } from "./types";

export const reviews: Review[] = [
  {
    id: "REV-001",
    memberType: "CLIENT",
    memberName: "삼성전자",
    rating: 5,
    content: "매칭 속도가 빠르고 AI 협상 기능이 정말 유용했습니다. 프리랜서를 찾는 과정이 기존보다 훨씬 간편해졌습니다.",
    projectName: "쇼핑몰 관리자 페이지",
    createdAt: "2026.08.01",
    promotionStatus: "PROMOTED",
    visibilityStatus: "PUBLIC",
  },
  {
    id: "REV-002",
    memberType: "FREELANCER",
    memberName: "김프리",
    rating: 4,
    content: "플랫폼 사용이 직관적이에요. 계약 관리가 편리합니다.",
    projectName: "데이터 파이프라인 구축",
    createdAt: "2026.07.25",
    promotionStatus: "EXCLUDED",
    visibilityStatus: "PUBLIC",
  },
  {
    id: "REV-003",
    memberType: "CLIENT",
    memberName: "카카오",
    rating: 3,
    content: "개선이 필요한 부분이 있지만 전반적으로 만족합니다.",
    projectName: "AI 추천 시스템",
    createdAt: "2026.07.20",
    promotionStatus: "EXCLUDED",
    visibilityStatus: "PRIVATE",
  },
  {
    id: "REV-004",
    memberType: "FREELANCER",
    memberName: "박서연",
    rating: 5,
    content: "전문적인 프로젝트들이 많아서 좋습니다. 계속 이용할 예정입니다.",
    projectName: "ERP 시스템",
    createdAt: "2026.07.15",
    promotionStatus: "PROMOTED",
    visibilityStatus: "PUBLIC",
  },
];

