import type {
  AdminUser,
  ApiErrorResponse,
  ApiSuccessResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8081";
const AUTH_BASE_PATH = "/api/v1/admin/auth";

export class AdminApiError extends Error {
  status: number;
  errorCode?: string;
  traceId?: string;

  constructor({
    status,
    message,
    errorCode,
    traceId,
  }: {
    status: number;
    message: string;
    errorCode?: string;
    traceId?: string;
  }) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.errorCode = errorCode;
    this.traceId = traceId;
  }
}

function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

async function parseResponse<T>(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse
    | null;

  if (!response.ok) {
    const errorPayload = payload as ApiErrorResponse | null;
    throw new AdminApiError({
      status: response.status,
      message: errorPayload?.message ?? "요청을 처리하지 못했습니다.",
      errorCode: errorPayload?.errorCode,
      traceId:
        errorPayload?.traceId ?? response.headers.get("X-Trace-Id") ?? undefined,
    });
  }

  if (!payload || !("data" in payload)) {
    throw new AdminApiError({
      status: response.status,
      message: "서버 응답 형식이 올바르지 않습니다.",
    });
  }

  return payload.data;
}

async function issueCsrfToken() {
  const response = await fetch(`${API_BASE_URL}${AUTH_BASE_PATH}/csrf`, {
    credentials: "include",
    cache: "no-store",
  });

  return parseResponse<{
    headerName: string;
    token: string;
    enabled: boolean;
  }>(response);
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  csrfRetried = false,
): Promise<T> {
  const method = init.method?.toUpperCase() ?? "GET";
  const requiresCsrf =
    !["GET", "HEAD", "OPTIONS"].includes(method) &&
    path !== `${AUTH_BASE_PATH}/login`;
  const headers = new Headers(init.headers);

  if (init.body) headers.set("Content-Type", "application/json");

  if (requiresCsrf) {
    let csrfToken = getCookie("XSRF-TOKEN");

    if (!csrfToken) {
      await issueCsrfToken();
      csrfToken = getCookie("XSRF-TOKEN");
    }

    if (csrfToken) {
      headers.set("X-XSRF-TOKEN", decodeURIComponent(csrfToken));
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  try {
    return await parseResponse<T>(response);
  } catch (error) {
    if (
      error instanceof AdminApiError &&
      error.errorCode === "ADMIN_GLOBAL_009" &&
      !csrfRetried
    ) {
      await issueCsrfToken();
      return request<T>(path, init, true);
    }

    throw error;
  }
}

export function fetchCsrfToken() {
  return issueCsrfToken();
}

export function login(username: string, password: string) {
  return request<AdminUser>(`${AUTH_BASE_PATH}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function fetchMe() {
  return request<AdminUser>(`${AUTH_BASE_PATH}/me`);
}

export async function logout() {
  try {
    await request<null>(`${AUTH_BASE_PATH}/logout`, { method: "POST" });
  } catch (error) {
    if (error instanceof AdminApiError && error.status === 401) return;
    throw error;
  }
}
