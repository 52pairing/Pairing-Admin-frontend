import LoginForm from "@/features/auth/components/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 sm:px-10">
      <section className="w-full max-w-[440px]">
        <div className="mb-8 flex items-center gap-2.5" aria-label="Pairing 관리자">
          <span className="text-[22px] font-extrabold tracking-[-0.04em] text-[#102d4d]">
            Pairing
          </span>
        
        </div>

        <h1 className="text-[30px] font-bold tracking-[-0.02em] text-[#102d4d]">
          관리자 로그인
        </h1>
        <p className="mt-2 text-[14px] text-[#94a3b8]">
          관리자 계정으로 로그인해주세요.
        </p>

        <LoginForm />
      </section>
    </main>
  );
}
