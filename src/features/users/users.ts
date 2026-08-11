export type UserType = "CLIENT" | "FREELANCER";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "WITHDRAWN";

export interface User {
  id: string;
  type: UserType;

  name: string;
  company?: string;

  email: string;

  loginType: "이메일" | "카카오" | "Google";

  joinedAt: string;
  lastLoginAt: string;

  status: UserStatus;

  projectCount: number;
}

export const users: User[] = [
  {
    id: "MEM-001",
    type: "CLIENT",
    name: "김담당",
    company: "삼성전자",
    email: "hr@samsung.com",
    loginType: "이메일",
    joinedAt: "2026.01.15",
    lastLoginAt: "2026.08.10",
    status: "ACTIVE",
    projectCount: 2,
  },

  {
    id: "MEM-002",
    type: "FREELANCER",
    name: "김프리",
    email: "kim@dev.com",
    loginType: "카카오",
    joinedAt: "2026.02.20",
    lastLoginAt: "2026.08.09",
    status: "ACTIVE",
    projectCount: 1,
  },

  {
    id: "MEM-003",
    type: "CLIENT",
    name: "이기획",
    company: "카카오",
    email: "bd@kakao.com",
    loginType: "Google",
    joinedAt: "2026.03.01",
    lastLoginAt: "2026.07.30",
    status: "ACTIVE",
    projectCount: 1,
  },

  {
    id: "MEM-004",
    type: "FREELANCER",
    name: "이준혁",
    email: "lee@backend.dev",
    loginType: "이메일",
    joinedAt: "2026.03.15",
    lastLoginAt: "2026.08.08",
    status: "SUSPENDED",
    projectCount: 0,
  },

  {
    id: "MEM-005",
    type: "FREELANCER",
    name: "박서연",
    email: "park@data.io",
    loginType: "이메일",
    joinedAt: "2026.04.01",
    lastLoginAt: "2026.08.01",
    status: "ACTIVE",
    projectCount: 0,
  },

  {
    id: "MEM-006",
    type: "CLIENT",
    name: "박클라",
    company: "네이버",
    email: "tech@naver.com",
    loginType: "이메일",
    joinedAt: "2026.05.10",
    lastLoginAt: "2026.07.20",
    status: "WITHDRAWN",
    projectCount: 0,
  },
];