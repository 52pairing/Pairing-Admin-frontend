interface UserCardProps {
  label: string;
  count: number;
}

export default function UserCard({
  label,
  count,
}: UserCardProps) {
  return (
    <div className="h-[96px] min-w-0 rounded-xl border border-[#e2e8f0] bg-white px-4 py-4 sm:px-5">
      <p className="text-[13px] font-medium text-[#94a3b8]">
        {label}
      </p>

      <p className="mt-3 text-[24px] font-bold text-[#111827]">
        {count}
      </p>
    </div>
  );
}
