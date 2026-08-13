interface AgentStatCardProps {
  label: string;
  value: string | number;
}

export default function AgentStatCard({ label, value }: AgentStatCardProps) {
  return (
    <div className="min-w-0 rounded-xl border border-[#e2e8f0] bg-white px-4 py-5 sm:px-5">
      <p className="text-[13px] font-semibold text-[#94a3b8]">{label}</p>
      <p className="mt-3 whitespace-nowrap text-[22px] font-bold text-[#111827]">
        {typeof value === "number" ? value.toLocaleString("ko-KR") : value}
      </p>
    </div>
  );
}

