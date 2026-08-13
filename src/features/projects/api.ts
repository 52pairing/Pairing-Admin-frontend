import { adminRequest } from "@/features/auth/api";
import type { ProjectDetail, ProjectListParams, ProjectListResponse, ProjectStatusCounts } from "./types";
const query = (params: ProjectListParams) => { const search = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== undefined && value !== "") search.set(key, String(value)); }); return search.toString(); };
export const fetchProjectStatusCounts = () => adminRequest<ProjectStatusCounts>("/api/v1/admin/projects/status-counts");
export const fetchProjects = (params: ProjectListParams) => adminRequest<ProjectListResponse>(`/api/v1/admin/projects?${query(params)}`);
export const fetchProjectDetail = (projectId: number) => adminRequest<ProjectDetail>(`/api/v1/admin/projects/${projectId}`);
