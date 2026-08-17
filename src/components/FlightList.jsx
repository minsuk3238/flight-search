import React from 'react';
import { ArrowUpDown, AlertCircle, Sparkles, Filter } from 'lucide-react';
import FlightCard from './FlightCard.jsx';

export default function FlightList({
  flights = [],
  sortBy,
  setSortBy,
  adults = 1,
  onResetFilters,
}) {
  const sortOptions = [
    { key: 'recommend', label: 'AI 스마트 추천순' },
    { key: 'price_asc', label: '최저가순' },
    { key: 'duration_asc', label: '최단 비행시간순' },
    { key: 'dep_time_asc', label: '출발 빠른순' },
    { key: 'dep_time_desc', label: '출발 늦은순' },
  ];

  return (
    <div className="space-y-4">
      {/* 정렬 바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-700">
            총 <span className="text-naver-green font-extrabold">{flights.length}</span>개 일정 검색됨
          </span>
        </div>

        {/* 정렬 탭 */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {sortOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                sortBy === opt.key
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 항공권 목록 */}
      {flights.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800">
              설정하신 조건에 맞는 항공편이 없습니다.
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              지정하신 탑승 시간대(출발/귀국) 또는 선택된 항공사 필터 조건이 너무 엄격할 수 있습니다. 시간 범위를 넓히거나 필터를 초기화해보세요.
            </p>
          </div>
          <button
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
          >
            필터 조건 초기화하기
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {flights.map(flight => (
            <FlightCard key={flight.id} flight={flight} adults={adults} />
          ))}
        </div>
      )}
    </div>
  );
}
