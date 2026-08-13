import { adminRequest } from "@/features/auth/api";
import type { NegotiationDetail, NegotiationListParams, NegotiationListResponse, NegotiationSummary, NegotiationTokenUsage } from "./types";
const params = (value: NegotiationListParams) => { const p = new URLSearchParams(); Object.entries(value).forEach(([k,v]) => { if(v !== undefined && v !== "") p.set(k,String(v)); }); return p; };
export const fetchNegotiationSummary = () => adminRequest<NegotiationSummary>("/api/v1/admin/negotiations/summary");
export const fetchNegotiations = (value: NegotiationListParams) => adminRequest<NegotiationListResponse>(`/api/v1/admin/negotiations?${params(value)}`);
export const fetchNegotiationDetail = (id: number) => adminRequest<NegotiationDetail>(`/api/v1/admin/negotiations/${id}`);
export const fetchNegotiationTokenUsage = (id: number) => adminRequest<NegotiationTokenUsage>(`/api/v1/admin/negotiations/${id}/token-usage`);
