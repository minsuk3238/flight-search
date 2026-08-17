import React from 'react';
import { ArrowUpDown, AlertCircle, Sparkles, RefreshCw, Clock } from 'lucide-react';
import FlightCard from './FlightCard.jsx';

export default function FlightList({
  flights = [],
  sortBy,
  setSortBy,
  adults = 1,
  onResetFilters,
  lastUpdated,
  onRefresh,
  isRefreshing,
}) {
  const sortOptions = [
    { key: 'price_asc', label: '최저가순' },
    { key: 'recommend', label: 'AI 스마트 추천순' },
    { key: 'date_asc', label: '출발 날짜순' },
    { key: 'duration_asc', label: '최단 비행시간순' },
    { key: 'dep_time_asc', label: '출발 빠른순' },
  ];

  const timeAgoText = lastUpdated
    ? `${lastUpdated.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} 기준`
    : '방금 전 기준';

  return (
    <div className="space-y-4">
      {/* 정렬 및 데이터 기준 시점 바 */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-800">
            총 <span className="text-naver-green font-extrabold">{flights.length}</span>개 일정 검색됨
          </span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1 text-[11px] text-slate-500 font-medium">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{timeAgoText}</span>
          </div>
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
            title="실시간 다시 조회"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-naver-green' : ''}`} />
          </button>
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
              설정하신 시간대 조건에 맞는 항공편이 없습니다.
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              현재 설정된 탑승 시간대(가는 편 / 오는 편) 또는 항공사 필터 조건에 해당하는 스케줄이 없습니다. 시간 범위를 넓혀보세요.
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
            <FlightCard
              key={flight.id}
              flight={flight}
              adults={adults}
              lastUpdated={lastUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
