"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AdminApiError } from "@/features/auth/api";
import { ErrorState } from "@/features/common/components/ErrorState";
import { LoadingState } from "@/features/common/components/Loading";
import { Modal } from "@/features/common/components/Modal";
import { fetchMemberDetail, releaseMemberSuspension, suspendMember } from "@/features/users/api";
import UserActivityCard from "@/features/users/components/UserActivityCard";
import UserDetailCard, { type UserDetailItem } from "@/features/users/components/UserDetailCard";
import UserStatusBadge from "@/features/users/components/UserStatusBadge";
import UserTypeBadge from "@/features/users/components/UserTypeBadge";
import type { MemberDetail } from "@/features/users/types";

const EMPTY_VALUE = "-";

function formatMemberId(accountId: number) {
  return `MEM-${String(accountId).padStart(3, "0")}`;
}

function formatPhone(value: string) {
  if (/^01\d{8,9}$/.test(value)) return value.replace(/^(01\d)(\d{3,4})(\d{4})$/, "$1-$2-$3");
  if (/^02\d{7,8}$/.test(value)) return value.replace(/^(02)(\d{3,4})(\d{4})$/, "$1-$2-$3");
  return value;
}

function formatBusinessNo(value: string | null) {
  return value?.replace(/^(\d{3})(\d{2})(\d{5})$/, "$1-$2-$3") ?? EMPTY_VALUE;
}

function formatDate(value: string | null) {
  if (!value) return EMPTY_VALUE;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ko-KR", { dateStyle: "medium", timeStyle: value.includes("T") ? "short" : undefined }).format(date);
}

function calculateAge(birthDate: string | null) {
  if (!birthDate) return EMPTY_VALUE;
  const birth = new Date(`${birthDate}T00:00:00`);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age -= 1;
  return `${birthDate} (만 ${age}세)`;
}

function yesNo(value: boolean | null) {
  return value === null ? EMPTY_VALUE : value ? "예" : "아니요";
}

function getAccountId(value: string) {
  const normalized = value.replace(/^MEM-/i, "");
  return /^\d+$/.test(normalized) ? Number(normalized) : null;
}

function ProfileCard({ member }: { member: MemberDetail }) {
  if (!member.profile) {
    return <UserDetailCard title="프로필 정보" items={[{ label: "안내", value: "프로필 정보가 없습니다." }]} />;
  }

  const profile = member.profile;
  if (member.role === "CLIENT") {
    return <UserDetailCard title="기업 프로필" items={[
      { label: "기업명", value: profile.companyName ?? EMPTY_VALUE },
      { label: "사업자번호", value: formatBusinessNo(profile.businessNo) },
      { label: "사업분야", value: profile.businessField ?? EMPTY_VALUE },
      { label: "직원수", value: profile.employeeCount ?? EMPTY_VALUE },
      { label: "주소", value: profile.address ?? EMPTY_VALUE },
      { label: "등급", value: profile.gradeLabel },
    ]} />;
  }

  const condition = profile.condition;
  const profileItems: UserDetailItem[] = [
    { label: "생년월일", value: calculateAge(profile.birthDate) },
    { label: "주소", value: profile.address ?? EMPTY_VALUE },
    { label: "등급", value: profile.gradeLabel },
    { label: "AI 매칭 동의", value: yesNo(profile.aiMatchingAgreed) },
    { label: "매칭 일시중지", value: yesNo(profile.matchingPaused) },
  ];
  const conditionItems: UserDetailItem[] = condition ? [
    { label: "직군", value: condition.jobCategoryLabel },
    { label: "직무", value: condition.jobRoleLabel },
    { label: "소속", value: condition.affiliation ?? EMPTY_VALUE },
    { label: "경력", value: `${condition.careerYears}년` },
    { label: "프리랜서 경험", value: yesNo(condition.hasFreelanceExperience) },
    { label: "근무 방식", value: condition.workStyleLabel },
    { label: "근무 형태", value: condition.workFormLabel },
    { label: "희망 단가", value: `${condition.payAmount.toLocaleString("ko-KR")}원 / ${condition.payUnitLabel}` },
    { label: "최소 수용 금액", value: condition.minAcceptAmount === null ? EMPTY_VALUE : `${condition.minAcceptAmount.toLocaleString("ko-KR")}원` },
    { label: "투입 가능일", value: formatDate(condition.availableFrom) },
    { label: "시작일 협의", value: yesNo(condition.startNegotiable) },
    { label: "희망 기간", value: `${condition.periodValue}${condition.periodUnitLabel}` },
  ] : [{ label: "안내", value: "조건 미등록" }];
  const skills = profile.skills ?? [];

  return <div className="space-y-4">
    <UserDetailCard title="프리랜서 프로필" items={profileItems} />
    <UserDetailCard title="근무 조건" items={conditionItems} />
    <UserDetailCard title="기술 스택" items={[{ label: "보유 기술", value: skills.length ? skills.map((skill) => `${skill.label} (${skill.levelLabel})`).join(", ") : "등록된 기술이 없습니다." }]} />
  </div>;
}

export default function UserDetailPage() {
  const params = useParams<{ userId: string }>();
  const accountId = getAccountId(params.userId);
  const [member, setMember] = useState<MemberDetail | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadMember = useCallback(async () => {
    if (accountId === null) {
      setError(new Error("올바르지 않은 회원번호입니다."));
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      setMember(await fetchMemberDetail(accountId));
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError : new Error("회원 정보를 불러오지 못했습니다."));
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId === null) return;

    let isActive = true;
    fetchMemberDetail(accountId)
      .then((detail) => {
        if (isActive) setMember(detail);
      })
      .catch((caughtError: unknown) => {
        if (isActive) {
          setError(
            caughtError instanceof Error
              ? caughtError
              : new Error("회원 정보를 불러오지 못했습니다."),
          );
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [accountId]);

  if (accountId === null) {
    return <ErrorState title="올바르지 않은 회원번호입니다" description="회원 목록에서 다시 선택해 주세요." className="min-h-[60vh]" />;
  }
  if (isLoading) return <LoadingState message="회원 정보를 불러오는 중입니다." className="min-h-[60vh]" />;
  if (error || !member) {
    const description = error instanceof AdminApiError && error.status === 404 ? "존재하지 않는 회원입니다." : error?.message;
    return <ErrorState title="회원 정보를 불러오지 못했습니다" description={description} onRetry={loadMember} className="min-h-[60vh]" />;
  }

  const basicItems: UserDetailItem[] = [
    { label: "회원번호", value: formatMemberId(member.accountId) },
    { label: "유형", value: <UserTypeBadge type={member.role} /> },
    { label: "이름", value: member.name },
    { label: "이메일", value: member.email },
    { label: "전화번호", value: formatPhone(member.phone) },
    { label: "가입방식", value: member.signupMethodLabel },
    { label: "이메일 인증", value: yesNo(member.emailVerified) },
    { label: "로그인 실패", value: `${member.loginFailCount}회` },
    { label: "최근 로그인", value: formatDate(member.lastLoginAt) },
    { label: "가입일", value: formatDate(member.createdAt) },
    { label: "수정일", value: formatDate(member.updatedAt) },
    { label: "상태", value: <UserStatusBadge status={member.status} /> },
    { label: "자동 잠금 시각", value: formatDate(member.lockedAt) },
    { label: "정지 시각", value: formatDate(member.suspendedAt) },
    { label: "정지 사유", value: member.suspendReason ?? EMPTY_VALUE },
    { label: "탈퇴 시각", value: formatDate(member.withdrawnAt) },
    { label: "탈퇴 사유", value: member.withdrawReason ?? EMPTY_VALUE },
  ];
  const activities = [
    { label: "진행중 프로젝트", value: member.activity.inProgressProjects },
    { label: "완료 프로젝트", value: member.activity.completedProjects },
    { label: "취소", value: member.activity.canceledProjects },
    { label: "누적 거래금액", value: `${member.activity.totalTradeAmount.toLocaleString("ko-KR")}원` },
    { label: "리뷰 수", value: member.activity.reviewCount },
    { label: "평균 별점", value: member.activity.averageScore?.toFixed(1) ?? EMPTY_VALUE },
  ];

  const handleStatusChange = async () => {
    if (!member.suspended && !reason.trim()) {
      setActionError("정지 사유를 입력해 주세요.");
      return;
    }
    setIsSubmitting(true);
    setActionError(null);
    try {
      const updatedMember = member.suspended
        ? await releaseMemberSuspension(member.accountId)
        : await suspendMember(member.accountId, reason.trim());
      setMember(updatedMember);
      setIsActionOpen(false);
      setReason("");
    } catch (caughtError) {
      const apiError = caughtError instanceof AdminApiError ? caughtError : null;
      if (apiError?.errorCode === "ADMIN_MEMBER_003") {
        setActionError("이미 다른 관리자가 처리한 회원입니다. 최신 정보를 다시 불러왔습니다.");
        try { setMember(await fetchMemberDetail(member.accountId)); } catch { /* 원래 오류를 유지한다. */ }
      } else {
        setActionError(apiError?.message ?? "회원 상태를 변경하지 못했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="min-h-screen bg-[#f7f8fa] p-4 sm:p-6 xl:p-8">
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div><h1 className="text-[22px] font-bold text-[#111827] sm:text-[24px]">회원 상세</h1><p className="mt-2 text-[13px] font-semibold text-[#64748b]">{member.profile?.companyName ?? member.name}</p><p className="mt-1 text-[13px] text-[#94a3b8]">{formatDate(member.createdAt)}</p></div>
      <Link href="/users" className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#e2e8f0] bg-white px-4 text-[13px] font-semibold text-[#64748b] transition hover:bg-[#f8fafc]">← 회원 목록으로</Link>
    </header>
    <div className="space-y-4">
      <UserDetailCard title="기본 정보" items={basicItems} />
      <ProfileCard member={member} />
      <section className="rounded-xl border border-[#e2e8f0] bg-white px-5 py-5 sm:px-6"><h2 className="text-[15px] font-bold text-[#111827]">활동 현황</h2><div className="scrollbar-hidden mt-5 flex gap-3 overflow-x-auto">{activities.map((activity) => <UserActivityCard key={activity.label} label={activity.label} value={activity.value} />)}</div></section>
      {(member.suspended || member.status !== "WITHDRAWN") && <button type="button" onClick={() => { setActionError(null); setIsActionOpen(true); }} className={`h-10 rounded-lg px-5 text-[13px] font-bold text-white ${member.suspended ? "bg-[#17345d]" : "bg-[#dc2626]"}`}>{member.suspended ? "정지 해제" : "회원 정지"}</button>}
    </div>
    <Modal open={isActionOpen} onClose={() => { if (!isSubmitting) setIsActionOpen(false); }} closeOnOverlayClick={!isSubmitting} size="md">
      <h2 className="text-[20px] font-bold text-[#111827]">{member.suspended ? "회원 정지를 해제할까요?" : "회원을 정지할까요?"}</h2>
      <p className="mt-3 text-[14px] leading-6 text-[#64748b]">대상: {member.profile?.companyName ?? member.name} ({formatMemberId(member.accountId)})</p>
      {member.suspended ? <p className="mt-4 text-[13px] leading-6 text-[#64748b]">정지를 해제하면 로그인할 수 있으며, 로그인 실패 횟수도 0으로 초기화됩니다.</p> : <><label htmlFor="suspend-reason" className="mt-5 text-[13px] font-semibold text-[#111827]">정지 사유 <span className="text-red-600">*</span></label><textarea id="suspend-reason" value={reason} maxLength={500} disabled={isSubmitting} onChange={(event) => setReason(event.target.value)} rows={4} className="mt-2 resize-none rounded-lg border border-[#e2e8f0] p-3 text-[13px] outline-none focus:border-[#4f6ff5]" placeholder="정지 사유를 입력해 주세요."/><p className="mt-1 text-right text-[12px] text-[#94a3b8]">{reason.length}/500</p></>}
      {actionError ? <p role="alert" className="mt-3 text-[13px] font-medium text-red-600">{actionError}</p> : null}
      <div className="mt-6 flex gap-3"><button type="button" disabled={isSubmitting} onClick={() => setIsActionOpen(false)} className="h-11 flex-1 rounded-lg border border-[#e2e8f0] font-semibold text-[#64748b] disabled:opacity-50">취소</button><button type="button" disabled={isSubmitting} onClick={() => void handleStatusChange()} className={`h-11 flex-1 rounded-lg font-bold text-white disabled:opacity-50 ${member.suspended ? "bg-[#17345d]" : "bg-[#dc2626]"}`}>{isSubmitting ? "처리 중..." : member.suspended ? "정지 해제" : "회원 정지"}</button></div>
    </Modal>
  </div>;
}
