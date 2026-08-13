export type NegotiationStatus = "IN_PROGRESS" | "AGREED" | "FAILED";
export type NegotiationStatusFilter = NegotiationStatus | "ALL";

export interface NegotiationSession {
  id: string;
  projectName: string;
  clientName: string;
  freelancerName: string;
  status: NegotiationStatus;
  negotiationCount: number;
  startedAt: string;
  endedAt: string | null;
}

