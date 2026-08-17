import React from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, TrendingDown } from 'lucide-react';

export default function PriceTrendChart({ trends = [], currentDepartureDate, onSelectDate }) {
  if (!trends || trends.length === 0) return null;

  // 최대/최소 가격 계산 (바 높이 정규화용)
  const prices = trends.map(t => t.lowestPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-naver-green" />
          <h3 className="font-extrabold text-base text-slate-900">
            기간별 최저가 비교 캘린더
          </h3>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            (선택 날짜 앞뒤 ±6일 최저가 비교)
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="flex items-center space-x-1 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-naver-green inline-block" />
            <span>최저가 날짜</span>
          </span>
          <span className="flex items-center space-x-1 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
            <span>일반 날짜</span>
          </span>
        </div>
      </div>

      {/* 바 차트 슬라이더 */}
      <div className="flex items-end justify-between space-x-1.5 sm:space-x-2 overflow-x-auto pb-2 pt-6 scrollbar-none">
        {trends.map((item) => {
          const isSelected = item.departureDate === currentDepartureDate;
          // 높이 비율 (40% ~ 100%)
          const heightPercent = 40 + ((item.lowestPrice - minPrice) / priceRange) * 60;

          return (
            <button
              key={item.departureDate}
              onClick={() => onSelectDate(item.departureDate, item.returnDate)}
              className={`group flex-1 min-w-[70px] sm:min-w-[85px] flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                isSelected
                  ? 'bg-slate-900 text-white ring-2 ring-naver-green shadow-md'
                  : item.isCheapestInPeriod
                  ? 'bg-emerald-50 text-slate-800 hover:bg-emerald-100/70 border border-emerald-200'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              {/* 최저가 뱃지 */}
              <div className="h-5 flex items-center justify-center mb-1">
                {item.isCheapestInPeriod ? (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-naver-green text-white animate-bounce">
                    최저
                  </span>
                ) : isSelected ? (
                  <span className="text-[10px] font-bold text-emerald-400">선택됨</span>
                ) : null}
              </div>

              {/* 바 막대 그래픽 */}
              <div className="w-full h-20 flex items-end justify-center px-1 mb-2">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isSelected
                      ? 'bg-naver-green'
                      : item.isCheapestInPeriod
                      ? 'bg-emerald-400 group-hover:bg-naver-green'
                      : 'bg-slate-300 group-hover:bg-slate-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* 가격 */}
              <span className={`text-[11px] font-extrabold font-mono tracking-tight ${
                isSelected ? 'text-white' : item.isCheapestInPeriod ? 'text-naver-darkgreen' : 'text-slate-900'
              }`}>
                {item.lowestPrice ? `${Math.round(item.lowestPrice / 10000)}만` : '-'}
              </span>

              {/* 날짜 */}
              <span className={`text-[10px] mt-0.5 font-medium ${
                isSelected
                  ? 'text-slate-300'
                  : item.isWeekend
                  ? 'text-rose-500 font-bold'
                  : 'text-slate-500'
              }`}>
                {item.displayDate}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>💡 원하는 날짜 막대를 클릭하면 해당 일정의 최저가 항공편으로 즉시 전환됩니다.</span>
      </div>
    </div>
  );
}
