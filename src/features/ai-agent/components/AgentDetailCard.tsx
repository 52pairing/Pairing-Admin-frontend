import type { ReactNode } from "react";

export default function AgentDetailCard({ title, items }: { title: string; items: Array<{ label: string; value: ReactNode }> }) {
  return (
    <section className="rounded-xl border border-[#e2e8f0] bg-white p-5 sm:p-6">
      <h2 className="text-[15px] font-bold text-[#111827]">{title}</h2>
      <dl className="mt-5 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
        {items.map((item) => <div key={item.label} className="grid grid-cols-[90px_1fr] gap-3 text-[13px] sm:grid-cols-[110px_1fr]"><dt className="text-[#94a3b8]">{item.label}</dt><dd className="min-w-0 break-words font-semibold text-[#111827]">{item.value}</dd></div>)}
      </dl>
    </section>
  );
}
