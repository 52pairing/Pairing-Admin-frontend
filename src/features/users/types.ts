export type UserType = "CLIENT" | "FREELANCER";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "LOCKED" | "PENDING" | "WITHDRAWN";
export type SignupMethod = "EMAIL" | "KAKAO" | "GOOGLE" | "SOCIAL";

export interface MemberSummary {
  total: number;
  active: number;
  suspended: number;
  withdrawn: number;
  clients: number;
  freelancers: number;
}

export interface MemberListItem {
  accountId: number;
  name: string;
  companyName: string | null;
  email: string;
  phone: string;
  role: UserType;
  roleLabel: string;
  status: UserStatus;
  statusLabel: string;
  suspended: boolean;
  signupMethod: SignupMethod;
  signupMethodLabel: string;
  createdAt: string;
  lastLoginAt: string | null;
  activeProjectCount: number;
}

export interface MemberListResponse {
  content: MemberListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface MemberListParams {
  role?: UserType;
  status?: UserStatus;
  signupMethod?: SignupMethod;
  keyword?: string;
  page?: number;
  size?: number;
}

export interface MemberCondition {
  jobCategory: string;
  jobCategoryLabel: string;
  jobRole: string;
  jobRoleLabel: string;
  affiliation: string | null;
  careerYears: number;
  hasFreelanceExperience: boolean;
  workStyle: string;
  workStyleLabel: string;
  workForm: string;
  workFormLabel: string;
  payUnit: string;
  payUnitLabel: string;
  payAmount: number;
  minAcceptAmount: number | null;
  availableFrom: string | null;
  startNegotiable: boolean;
  periodValue: number;
  periodUnit: string;
  periodUnitLabel: string;
}

export interface MemberSkill {
  code: string;
  label: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  levelLabel: string;
}

export interface MemberProfile {
  companyName: string | null;
  businessNo: string | null;
  businessField: string | null;
  employeeCount: string | null;
  birthDate: string | null;
  address: string | null;
  grade: string;
  gradeLabel: string;
  aiMatchingAgreed: boolean | null;
  matchingPaused: boolean | null;
  condition: MemberCondition | null;
  skills: MemberSkill[] | null;
}

export interface MemberDetail {
  accountId: number;
  name: string;
  email: string;
  phone: string;
  role: UserType;
  roleLabel: string;
  status: UserStatus;
  statusLabel: string;
  suspended: boolean;
  suspendedAt: string | null;
  suspendReason: string | null;
  signupMethod: SignupMethod;
  signupMethodLabel: string;
  emailVerified: boolean;
  loginFailCount: number;
  lockedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  withdrawnAt: string | null;
  withdrawReason: string | null;
  profile: MemberProfile | null;
  activity: {
    inProgressProjects: number;
    completedProjects: number;
    canceledProjects: number;
    totalTradeAmount: number;
    reviewCount: number;
    averageScore: number | null;
  };
}
