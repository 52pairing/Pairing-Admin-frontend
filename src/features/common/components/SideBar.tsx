"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const Icon = ({
  children,
  size = 24,
  strokeWidth = 2,
  className,
}: IconProps & { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const Users = (props: IconProps) => <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
const FileText = (props: IconProps) => <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></Icon>;
const RefreshCw = (props: IconProps) => <Icon {...props}><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></Icon>;
const Star = (props: IconProps) => <Icon {...props}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" /></Icon>;
const Bot = (props: IconProps) => <Icon {...props}><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="8.5" cy="16" r="1" fill="currentColor" stroke="none" /><circle cx="15.5" cy="16" r="1" fill="currentColor" stroke="none" /><path d="M12 2v4M8 7h8M7 11V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /></Icon>;
const MessageSquare = (props: IconProps) => <Icon {...props}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" /></Icon>;
const UserRound = (props: IconProps) => <Icon {...props}><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></Icon>;
const LogOut = (props: IconProps) => <Icon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Icon>;
const ChevronDown = (props: IconProps) => <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;

const menuItems = [
  {
    label: "회원관리",
    href: "/admin/members",
    icon: Users,
  },
  {
    label: "프로젝트 정산관리",
    href: "/admin/projects",
    icon: FileText,
  },
  {
    label: "거래/정산관리",
    href: "/admin/settlements",
    icon: RefreshCw,
  },
  {
    label: "리뷰 관리",
    href: "/admin/reviews",
    icon: Star,
  },
  {
    label: "AI Agent관리",
    href: "/admin/ai-agent",
    icon: Bot,
  },
  {
    label: "1대1문의 관리",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[280px] shrink-0 flex-col bg-[#09192f] px-6 py-8 text-white">
      {/* 상단 로고 */}
      <div className="mb-12 flex items-center gap-3 px-2">
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">
          관리자
        </h1>

        <span className="rounded-md bg-[#4f6ff5] px-2.5 py-1 text-[13px] font-semibold text-white">
          v1.0
        </span>
      </div>

      {/* 메뉴 */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex h-[56px] items-center gap-4 rounded-xl px-4
                text-[15px] font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-[#17345d] text-white"
                    : "text-[#aeb9ca] hover:bg-[#102947] hover:text-white"
                }
              `}
            >
              <Icon
                size={22}
                strokeWidth={1.8}
                className={
                  isActive
                    ? "text-[#5578ff]"
                    : "text-[#aeb9ca] group-hover:text-white"
                }
              />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 아래 영역 밀기 */}
      <div className="flex-1" />

      {/* 관리자 정보 */}
      <div className="border-t border-[#233750] pt-6">
        <button
          type="button"
          className="mb-5 flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-[#102947]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c4ccd7] text-[#536174]">
            <UserRound size={23} strokeWidth={2} />
          </div>

          <div className="flex flex-1 items-center justify-between">
            <span className="text-[15px] font-semibold text-white">
              관리자
            </span>

            <ChevronDown
              size={18}
              strokeWidth={1.8}
              className="text-[#8290a4]"
            />
          </div>
        </button>

        {/* 로그아웃 */}
        <button
          type="button"
          className="
            flex h-[50px] w-full items-center justify-center gap-2
            rounded-xl border border-[#40516a]
            bg-[#1d304a] text-[14px] font-semibold text-white
            transition
            hover:bg-[#29415f]
          "
        >
          <LogOut size={19} strokeWidth={1.8} />
          로그아웃
        </button>
      </div>
    </aside>
  );
}
