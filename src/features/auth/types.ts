export interface AdminUser {
  adminId: number;
  username: string;
  lastLoginAt: string;
}

interface ApiResponseBase {
  status: number;
  message: string;
  timestamp?: string;
}

export interface ApiSuccessResponse<T> extends ApiResponseBase {
  code: string;
  data: T;
}

export interface ApiErrorResponse extends ApiResponseBase {
  errorCode: string;
  traceId?: string;
}
