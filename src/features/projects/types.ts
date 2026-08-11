export type ProjectStatus =
  | "REGISTERED"
  | "RECRUITING"
  | "NEGOTIATING"
  | "CONTRACT_PENDING"
  | "IN_PROGRESS"
  | "COMPLETION_PENDING"
  | "COMPLETED"
  | "CANCELED";

export interface Project {
  id: string;
  name: string;
  category: string;
  client: string;
  status: ProjectStatus;
  contractAmount: number;
  registeredAt: string;
}

export type ProjectStatusFilter = "ALL" | ProjectStatus;
