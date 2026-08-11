import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  isVisible: boolean;
  value: string;
  onChange: (value: string) => void;
  onVisibilityChange: () => void;
}

export default function PasswordField({
  isVisible,
  value,
  onChange,
  onVisibilityChange,
}: PasswordFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="password"
        className="block text-[14px] font-medium text-[#475569]"
      >
        비밀번호 <span className="text-[#102d4d]">*</span>
      </label>

      <div className="relative">
        <input
          id="password"
          name="password"
          type={isVisible ? "text" : "password"}
          placeholder="비밀번호를 입력해 주세요."
          autoComplete="current-password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required
          className="login-input h-13 w-full rounded-lg border border-[#dbe3ec] bg-[#f8fafc] px-4 pr-12 text-[15px] text-[#111827] outline-none transition placeholder:text-[#9ca3af] focus:border-[#315d87] focus:bg-white focus:ring-2 focus:ring-[#102d4d]/10"
        />

        <button
          type="button"
          onClick={onVisibilityChange}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] transition hover:text-[#64748b]"
          aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
          aria-pressed={isVisible}
        >
          {isVisible ? (
            <EyeOff size={23} strokeWidth={1.8} />
          ) : (
            <Eye size={23} strokeWidth={1.8} />
          )}
        </button>
      </div>
    </div>
  );
}
