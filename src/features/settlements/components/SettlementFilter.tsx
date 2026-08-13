import type { SettlementListParams, SettlementMemberType, SettlementPhase, SettlementStatus } from "../types";

export type SettlementFilterValue = Pick<SettlementListParams, "keyword" | "payerRole" | "status" | "phase" | "fromDate" | "toDate">;

interface SettlementFilterProps {
  value: SettlementFilterValue;
  onChange: (value: SettlementFilterValue) => void;
  onFilterChange: (patch: Partial<SettlementFilterValue>) => void;
  onSearch: () => void;
  error?: string;
  disabled: boolean;
}

export default function SettlementFilter({ value, onChange, onFilterChange, onSearch, error, disabled }: SettlementFilterProps) {
  const update = (patch: Partial<SettlementFilterValue>) => onChange({ ...value, ...patch });
  const applyFilter = (patch: Partial<SettlementFilterValue>) => { update(patch); onFilterChange(patch); };

  return <form onSubmit={(event) => { event.preventDefault(); onSearch(); }} className="flex flex-wrap gap-2 p-4 sm:px-5 sm:py-5"><input type="search" value={value.keyword ?? ""} onChange={(e) => update({ keyword: e.target.value })} placeholder="정산번호, 프로젝트, 회원, 회사명 검색..." className="h-10 min-w-[240px] flex-1 rounded-lg border border-[#e2e8f0] px-4 text-[13px]" aria-label="정산 검색어"/><select value={value.payerRole ?? ""} onChange={(e) => applyFilter({ payerRole: (e.target.value || undefined) as SettlementMemberType | undefined })} className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]" aria-label="회원 유형"><option value="">회원 전체</option><option value="CLIENT">클라이언트</option><option value="FREELANCER">프리랜서</option></select><select value={value.phase ?? ""} onChange={(e) => applyFilter({ phase: (e.target.value || undefined) as SettlementPhase | undefined })} className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]" aria-label="수수료 유형"><option value="">유형 전체</option><option value="DEPOSIT">착수금 수수료</option><option value="SUCCESS_FEE">완료금 수수료</option></select><select value={value.status ?? ""} onChange={(e) => applyFilter({ status: (e.target.value || undefined) as SettlementStatus | undefined })} className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]" aria-label="정산 상태"><option value="">상태 전체</option><option value="PENDING">결제 대기</option><option value="PAID">결제 완료</option><option value="OVERDUE">미납</option><option value="FAILED">결제 실패</option><option value="CANCELED">취소</option></select><input type="date" value={value.fromDate ?? ""} max={value.toDate || undefined} onChange={(e) => update({ fromDate: e.target.value })} aria-label="생성일 시작" className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]"/><input type="date" value={value.toDate ?? ""} min={value.fromDate || undefined} onChange={(e) => update({ toDate: e.target.value })} aria-label="생성일 종료" className="h-10 rounded-lg border border-[#e2e8f0] px-3 text-[13px]"/><button disabled={disabled} className="h-10 rounded-lg bg-[#102947] px-5 text-[13px] font-bold text-white disabled:opacity-50">검색</button>{error ? <p role="alert" className="w-full text-[13px] text-red-600">{error}</p> : null}</form>;
}
