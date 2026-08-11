import type { ReviewRatingItem } from "../types";

interface RatingDistributionProps {
  ratings: ReviewRatingItem[];
}

export default function RatingDistribution({ ratings }: RatingDistributionProps) {
  const totalCount = ratings.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="mt-6 rounded-xl border border-[#e2e8f0] bg-white px-5 py-6 sm:px-7">
      <h2 className="text-[16px] font-bold text-[#111827]">별점 분포</h2>
      <div className="mt-6 flex flex-col gap-4">
        {ratings.map((item) => {
          const percentage = totalCount === 0 ? 0 : (item.count / totalCount) * 100;
          return (
            <div key={item.rating} className="grid grid-cols-[40px_1fr_28px] items-center gap-3 sm:gap-4">
              <span className="text-[13px] font-semibold text-[#64748b]">{item.rating}★</span>
              <div
                className="h-[9px] overflow-hidden rounded-full bg-[#edf2f7]"
                role="progressbar"
                aria-label={`${item.rating}점 리뷰`}
                aria-valuenow={item.count}
                aria-valuemin={0}
                aria-valuemax={totalCount}
              >
                <div className="h-full rounded-full bg-[#f59e0b]" style={{ width: `${percentage}%` }} />
              </div>
              <span className="text-right text-[13px] font-semibold text-[#64748b]">{item.count}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

