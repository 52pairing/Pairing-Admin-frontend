"use client";

import { useState } from "react";

import PasswordField from "./PasswordField";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isFormValid = email.trim() !== "" && password !== "";

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-[14px] font-medium text-[#475569]"
        >
          이메일 <span className="text-[#102d4d]">*</span>
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="이메일 주소를 입력해 주세요."
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isFormValid}
          className="h-13 w-full rounded-lg bg-[#102d4d] text-[16px] font-semibold text-white transition hover:bg-[#173f68] disabled:cursor-not-allowed disabled:bg-[#dce3ea] disabled:text-[#94a3b8] disabled:hover:bg-[#dce3ea]"
        >
          로그인
        </button>
      </div>
    </form>
  );
}
