"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "../AuthProvider";
import { AdminApiError, fetchCsrfToken } from "../api";
import PasswordField from "./PasswordField";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [traceId, setTraceId] = useState<string | null>(null);
  const isFormValid = username.trim() !== "" && password !== "";

  useEffect(() => {
    void fetchCsrfToken().catch(() => {
      // 로그인 요청은 CSRF 예외이므로 토큰 선발급 실패만으로 입력을 막지 않습니다.
    });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setTraceId(null);

    try {
      await login(username.trim(), password);
      router.replace("/users");
    } catch (error) {
      if (error instanceof AdminApiError) {
        setErrorMessage(
          error.errorCode === "ADMIN_AUTH_002"
            ? "계정이 잠겼습니다. 관리자에게 문의해 주세요."
            : error.message,
        );
        setTraceId(error.traceId ?? null);
      } else {
        setErrorMessage("서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-[14px] font-medium text-[#475569]"
        >
          아이디 <span className="text-[#102d4d]">*</span>
        </label>

        <input
          id="username"
          name="username"
          type="text"
          placeholder="관리자 아이디를 입력해 주세요."
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          className="login-input h-13 w-full rounded-lg border border-[#dbe3ec] bg-[#f8fafc] px-4 text-[15px] text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#315d87] focus:bg-white focus:ring-2 focus:ring-[#102d4d]/10"
        />
      </div>

      <PasswordField
        isVisible={showPassword}
        value={password}
        onChange={setPassword}
        onVisibilityChange={() => setShowPassword((previous) => !previous)}
      />

      {errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3"
        >
          <p className="text-[13px] font-medium text-[#dc2626]">
            {errorMessage}
          </p>
          {traceId && (
            <p className="mt-1 text-[11px] text-[#94a3b8]">
              오류 추적 ID: {traceId}
            </p>
          )}
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="h-13 w-full rounded-lg bg-[#102d4d] text-[16px] font-semibold text-white transition hover:bg-[#173f68] disabled:cursor-not-allowed disabled:bg-[#dce3ea] disabled:text-[#94a3b8] disabled:hover:bg-[#dce3ea]"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </form>
  );
}
