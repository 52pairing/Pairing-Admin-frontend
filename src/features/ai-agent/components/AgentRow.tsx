import NegotiationStatusBadge from "./NegotiationStatusBadge";
import type { NegotiationSession } from "../types";

export default function AgentRow({ session }: { session: NegotiationSession }) {
  return (
    <div className="grid min-h-[64px] grid-cols-[135px_2fr_1fr_1fr_110px_85px_110px_110px_110px_65px] items-center border-b border-[#e5e7eb] px-4 text-[13px] last:border-b-0">
      <span className="font-bold text-[#64748b]">{session.id}</span>
      <span className="truncate pr-5 font-semibold text-[#64748b]">{session.projectName}</span>
      <span className="truncate pr-4 font-semibold text-[#64748b]">{session.clientName}</span>
      <span className="truncate pr-4 font-semibold text-[#64748b]">{session.freelancerName}</span>
      <NegotiationStatusBadge status={session.status} />
      <span className="font-semibold text-[#64748b]">{session.negotiationCount}회</span>
      <span className="font-semibold text-[#64748b]">{session.startedAt}</span>
      <span className="font-semibold text-[#64748b]">{session.endedAt ?? "-"}</span>
      <NegotiationStatusBadge status={session.status} />
      <button type="button" title="상세 화면은 추후 연동됩니다." className="flex h-8 w-11 items-center justify-center rounded-md bg-[#edf3f8] text-[12px] font-bold text-[#17324d] transition hover:bg-[#dce7f1]">상세</button>
    </div>
  );
}

