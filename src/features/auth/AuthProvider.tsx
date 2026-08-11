"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { fetchMe, login, logout } from "./api";
import type { AdminUser } from "./types";

interface AuthContextValue {
  admin: AdminUser | null;
  login: (username: string, password: string) => Promise<AdminUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_BYPASS_ENABLED =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_AUTH_BYPASS === "true";

const PREVIEW_ADMIN: AdminUser = {
  adminId: 0,
  username: "디자인 미리보기",
  lastLoginAt: "",
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminUser | null>(
    AUTH_BYPASS_ENABLED ? PREVIEW_ADMIN : null,
  );
  const [isLoading, setIsLoading] = useState(!AUTH_BYPASS_ENABLED);
  const isAuthPage = pathname.startsWith("/auth/");

  useEffect(() => {
    if (AUTH_BYPASS_ENABLED) return;

    let isActive = true;

    fetchMe()
      .then((currentAdmin) => {
        if (isActive) setAdmin(currentAdmin);
      })
      .catch(() => {
        if (isActive) setAdmin(null);
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (!admin && !isAuthPage) {
      router.replace("/auth/login");
    } else if (admin && isAuthPage) {
      router.replace("/users");
    }
  }, [admin, isAuthPage, isLoading, router]);

  const handleLogin = async (username: string, password: string) => {
    const currentAdmin = await login(username, password);
    setAdmin(currentAdmin);
    return currentAdmin;
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      setAdmin(null);
    }
  };

  const isRedirecting = (!admin && !isAuthPage) || (admin && isAuthPage);

  if (isLoading || isRedirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="flex flex-col items-center gap-3 text-[#64748b]">
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#cbd5e1] border-r-[#17345d]" />
          <p className="text-[13px] font-medium">로그인 상태를 확인하고 있습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다.");
  }

  return context;
}
