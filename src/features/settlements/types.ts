export type SettlementMemberType = "CLIENT" | "FREELANCER";
export type SettlementFeeType = "START_FEE" | "COMPLETION_FEE";
export type SettlementStatus = "PAID" | "PAYABLE" | "OVERDUE" | "FAILED";

export interface Settlement {
  id: string;
  projectName: string;
  memberName: string;
  memberType: SettlementMemberType;
  feeType: SettlementFeeType;
  baseAmount: number;
  feeRate: number;
  feeAmount: number;
  status: SettlementStatus;
  createdAt: string;
  dueDate: string;
  completedAt: string | null;
}

export type SettlementMemberFilter = "ALL" | SettlementMemberType;
export type SettlementStatusFilter = "ALL" | SettlementStatus;
