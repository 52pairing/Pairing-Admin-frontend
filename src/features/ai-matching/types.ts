export type MatchingTargetType = "ALL" | "FREELANCER" | "POSITION";
export interface MissingEmbedding { targetType: Exclude<MatchingTargetType,"ALL">; targetId: number; displayName: string; status: string; reason: string; model: string|null; lastLogStatus: string|null; lastLogAt: string|null }
export interface PageData<T>{content:T[];page:number;size:number;totalElements:number;totalPages:number;first:boolean;last:boolean}
export interface MissingEmbeddingsResponse { summary:{freelancerMissingCount:number;positionMissingCount:number};items:PageData<MissingEmbedding> }
export interface AiLog {logId:number;agentType:string;refType:string;refId:number;status:"SUCCESS"|"FAILED";errorMessage:string|null;createdAt:string|null}
export interface AiLogParams {agentType?:string;refType?:string;refId?:number;status?:"SUCCESS"|"FAILED";from?:string;to?:string;page?:number;size?:number}
export interface Diagnostics {project:{projectId:number;title:string;status:string;paymentStatus:string};position:{positionId:number;status:string;jobCategory:string;jobRole:string};snapshots:{projectSnapshotExists:boolean;positionSnapshotExists:boolean};embeddings:{positionEmbeddingExists:boolean;positionModel:string|null;freelancerEmbeddingCount:number};round:{roundId:number;roundNo:number;roundType:string;status:string}|null;counts:{candidateCount:number;exposedCandidateCount:number;requestCount:number};lastAiLog:{status:string;createdAt:string|null;errorMessage:string|null}|null}

export interface MatchingProjectSummary {
  projectId: number;
  title: string;
  clientName: string | null;
  status: string;
  paymentStatus: string;
  recruitStartedAt: string | null;
  positionCount: number;
  issueCount: number;
  lastAiLogAt: string | null;
}

export interface MatchingIssue {
  code: string;
  message: string;
}

export interface MatchingPositionDiagnostics {
  position: {
    positionId: number;
    status: string;
    jobCategory: string;
    jobRole: string;
  };
  positionSnapshotExists: boolean;
  positionEmbeddingExists: boolean;
  positionModel: string | null;
  positionEmbeddingDimension: number | null;
  freelancerEmbeddingCount: number;
  round: {
    roundId: number | null;
    roundNo: number | null;
    roundType: string | null;
    status: string | null;
  };
  counts: {
    candidateCount: number;
    exposedCandidateCount: number;
    requestCount: number;
  };
  lastAiLog: {
    status: string | null;
    createdAt: string | null;
    errorMessage: string | null;
  };
  issues: MatchingIssue[];
}

export interface MatchingProjectDiagnostics {
  project: {
    projectId: number;
    title: string;
    status: string;
    paymentStatus: string;
  };
  projectSnapshotExists: boolean;
  positionCount: number;
  issueCount: number;
  positions: MatchingPositionDiagnostics[];
}
