import { adminRequest } from "@/features/auth/api";
import type { SettlementDetail, SettlementListParams, SettlementListResponse, SettlementSummary } from "./types";
const query = (params: SettlementListParams) => { const search = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") search.set(key, String(value)); }); return search.toString(); };
export const fetchSettlementSummary = () => adminRequest<SettlementSummary>("/api/v1/admin/settlements/summary");
export const fetchSettlements = (params: SettlementListParams) => adminRequest<SettlementListResponse>(`/api/v1/admin/settlements?${query(params)}`);
export const fetchSettlementDetail = (settlementId: number) => adminRequest<SettlementDetail>(`/api/v1/admin/settlements/${settlementId}`);
