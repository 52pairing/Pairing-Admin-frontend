interface InquiryStatCardProps {
  label: string;
  value: number;
  tone: "default" | "waiting" | "answered" | "today";
}

const toneStyle = {
  default: "border-[#d6dee8] text-[#102947]",
  waiting: "border-[#f3d58a] text-[#b45309]",
  answered: "border-[#b9ebcc] text-[#15803d]",
  today: "border-[#c7d8ff] text-[#1d4ed8]",
} as const;

export default function InquiryStatCard({ label, value, tone }: InquiryStatCardProps) {
  return (
    <div className={`rounded-xl border bg-white px-5 py-5 ${toneStyle[tone]}`}>
      <p className="text-[13px] font-medium text-[#64748b]">{label}</p>
      <p className="mt-2 text-[28px] font-bold leading-none">{value}</p>
    </div>
  );
}

