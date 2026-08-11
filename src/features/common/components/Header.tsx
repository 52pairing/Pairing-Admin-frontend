interface AdminPageHeaderProps {
  title: string;
  description?: string;
  date?: string;
}

export default function AdminPageHeader({
  title,
  description,
  date,
}: AdminPageHeaderProps) {
  return (
    <header className="mb-6 sm:mb-7">
      <h1 className="text-[22px] font-bold text-[#111827] sm:text-[24px]">
        {title}
      </h1>

      {description && (
        <p className="mt-2 text-[14px] font-medium text-[#64748b]">
          {description}
        </p>
      )}
      {date && (
        <p className="mt-1 text-[13px] text-[#94a3b8]">
          {date}
        </p>
      )}
    </header>
  );
}
