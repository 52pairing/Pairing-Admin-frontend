interface SettlementStatCardProps {
  label: string;
  amount: number;
  count?: number;
}

export default function SettlementStatCard({
  label,
  amount,
  count,
}: SettlementStatCardProps) {
  return (
    <div className="min-w-0 rounded-xl border border-[#e2e8f0] bg-white px-4 py-4 sm:px-5">
      <p className="text-[13px] font-medium text-[#94a3b8]">{label}</p>
      <p className="mt-3 whitespace-nowrap text-[16px] font-bold text-[#111827] sm:text-[20px] xl:text-[18px] 2xl:text-[22px]">
        {amount.toLocaleString("ko-KR")}원
      </p>
      {count !== undefined ? <p className="mt-1 text-[12px] text-[#94a3b8]">{count.toLocaleString("ko-KR")}건</p> : null}
    </div>
  );
}
