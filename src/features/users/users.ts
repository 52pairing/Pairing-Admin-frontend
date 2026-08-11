export type UserType = "CLIENT" | "FREELANCER";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "WITHDRAWN";

export interface UserActivity {
  inProgressProjects: number;
  completedProjects: number;
  canceledProjects: number;
  totalTransactionAmount: number;
  reviewCount: number;
  averageRating: number;
}

export interface User {
  id: string;
  type: UserType;

  name: string;
  company?: string;

  email: string;
  phone: string;

  loginType: "이메일" | "카카오" | "Google";

  joinedAt: string;
  lastLoginAt: string;

  status: UserStatus;

  projectCount: number;
  businessNumber?: string;
  industry?: string;
  employeeCount?: string;
  specialty?: string;
  experience?: string;
  activity: UserActivity;
}

export const users: User[] = [
  {
    id: "MEM-001",
    type: "CLIENT",
    name: "김담당",
    company: "삼성전자",
    email: "hr@samsung.com",
    phone: "02-1234-5678",
    loginType: "이메일",
    joinedAt: "2026.01.15",
    lastLoginAt: "2026.08.10",
    status: "ACTIVE",
    projectCount: 2,
    businessNumber: "123-45-67890",
    industry: "IT·콘텐츠·AI",
    employeeCount: "500명 이상",
    activity: {
      inProgressProjects: 2,
      completedProjects: 2,
      canceledProjects: 0,
      totalTransactionAmount: 10000000,
      reviewCount: 3,
      averageRating: 4.8,
    },
  },

  {
    id: "MEM-002",
    type: "FREELANCER",
    name: "김프리",
    email: "kim@dev.com",
    phone: "010-2345-6789",
    loginType: "카카오",
    joinedAt: "2026.02.20",
    lastLoginAt: "2026.08.09",
    status: "ACTIVE",
    projectCount: 1,
    specialty: "프론트엔드 개발",
    experience: "5년",
    activity: {
      inProgressProjects: 1,
      completedProjects: 4,
      canceledProjects: 0,
      totalTransactionAmount: 18500000,
      reviewCount: 4,
      averageRating: 4.9,
    },
  },

  {
    id: "MEM-003",
    type: "CLIENT",
    name: "이기획",
    company: "카카오",
    email: "bd@kakao.com",
    phone: "02-3456-7890",
    loginType: "Google",
    joinedAt: "2026.03.01",
    lastLoginAt: "2026.07.30",
    status: "ACTIVE",
    projectCount: 1,
    businessNumber: "220-88-12345",
    industry: "IT·플랫폼",
    employeeCount: "500명 이상",
    activity: {
      inProgressProjects: 1,
      completedProjects: 1,
      canceledProjects: 0,
      totalTransactionAmount: 4500000,
      reviewCount: 1,
      averageRating: 4.7,
    },
  },

  {
    id: "MEM-004",
    type: "FREELANCER",
    name: "이준혁",
    email: "lee@backend.dev",
    phone: "010-4567-8901",
    loginType: "이메일",
    joinedAt: "2026.03.15",
    lastLoginAt: "2026.08.08",
    status: "SUSPENDED",
    projectCount: 0,
    specialty: "백엔드 개발",
    experience: "7년",
    activity: {
      inProgressProjects: 0,
      completedProjects: 3,
      canceledProjects: 1,
      totalTransactionAmount: 12000000,
      reviewCount: 3,
      averageRating: 4.5,
    },
  },

  {
    id: "MEM-005",
    type: "FREELANCER",
    name: "박서연",
    email: "park@data.io",
    phone: "010-5678-9012",
    loginType: "이메일",
    joinedAt: "2026.04.01",
    lastLoginAt: "2026.08.01",
    status: "ACTIVE",
    projectCount: 0,
    specialty: "데이터 엔지니어링",
    experience: "4년",
    activity: {
      inProgressProjects: 0,
      completedProjects: 2,
      canceledProjects: 0,
      totalTransactionAmount: 9600000,
      reviewCount: 2,
      averageRating: 4.8,
    },
  },

  {
    id: "MEM-006",
    type: "CLIENT",
    name: "박클라",
    company: "네이버",
    email: "tech@naver.com",
    phone: "1588-0000",
    loginType: "이메일",
    joinedAt: "2026.05.10",
    lastLoginAt: "2026.07.20",
    status: "WITHDRAWN",
    projectCount: 0,
    businessNumber: "220-81-62517",
    industry: "IT·플랫폼",
    employeeCount: "500명 이상",
    activity: {
      inProgressProjects: 0,
      completedProjects: 1,
      canceledProjects: 0,
      totalTransactionAmount: 5000000,
      reviewCount: 1,
      averageRating: 4.6,
    },
  },
];
