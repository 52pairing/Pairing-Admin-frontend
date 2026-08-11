interface UserActivityCardProps {
  label: string;
  value: string | number;
}

export default function UserActivityCard({
  label,
  value,
}: UserActivityCardProps) {
  return (
    <div className="min-w-[120px] rounded-lg bg-[#f7f8fa] px-5 py-4 text-center">
      <p className="whitespace-nowrap text-[12px] font-medium text-[#94a3b8]">
        {label}
      </p>
      <p className="mt-2 whitespace-nowrap text-[20px] font-bold text-[#111827]">
        {value}
      </p>
    </div>
  );
}
