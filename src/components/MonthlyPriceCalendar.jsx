import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Sparkles, TrendingDown, Check } from 'lucide-react';

export default function MonthlyPriceCalendar({
  selectedDepartureDate,
  onSelectDate,
  stayDays = 3,
  calendarData = [], // [{ date: '2026-09-01', price: 245000, isCheapest: true, airlineName: '제주항공' }]
  currentMonth, // Date object
  onPrevMonth,
  onNextMonth,
}) {
  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-indexed

  // 이번 달 1일의 요일 (0: 일요일, 1: 월요일 ...)
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  // 이번 달의 총 일수
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 캘린더 데이터 맵
  const priceMap = {};
  calendarData.forEach(item => {
    priceMap[item.date] = item;
  });

  // 가격 최솟값/최댓값
  const prices = calendarData.map(d => d.price).filter(Boolean);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1;

  // 빈 칸(이전 달 날짜) 생성
  const blanks = Array.from({ length: firstDayOfWeek });
  // 이번 달 날짜 생성
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-4 sm:p-6 mb-8">
      {/* 캘린더 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-naver-green flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 flex items-center space-x-2">
              <span>월별 최저가 캘린더</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-naver-lightgreen text-naver-darkgreen">
                {stayDays}박 {stayDays + 1}일 기준
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              달력에서 가장 저렴한 날짜를 클릭하면 해당 일정의 상세 항공권이 즉시 열립니다.
            </p>
          </div>
        </div>

        {/* 월 이동 네비게이션 & 범례 */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-3 text-xs font-medium">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-naver-green" />
              <span className="text-slate-600">초특가</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-600">보통</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="text-slate-600">주말/높음</span>
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={onPrevMonth}
              className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition shadow-none hover:shadow-sm"
              title="이전 달"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-extrabold text-slate-800 px-2 font-mono">
              {year}년 {month + 1}월
            </span>
            <button
              onClick={onNextMonth}
              className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition shadow-none hover:shadow-sm"
              title="다음 달"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-xs font-bold">
        {dayLabels.map((day, idx) => (
          <div
            key={day}
            className={`py-2 rounded-lg ${
              idx === 0 ? 'text-rose-500 bg-rose-50/50' : idx === 6 ? 'text-blue-500 bg-blue-50/50' : 'text-slate-500 bg-slate-50/50'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 달력 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {/* 이전 달 빈 칸 */}
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} className="min-h-[64px] sm:min-h-[76px] rounded-xl bg-slate-50/30 opacity-30" />
        ))}

        {/* 이번 달 날짜 셀 */}
        {monthDays.map(day => {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDepartureDate === dateStr;
          const dayInfo = priceMap[dateStr];
          const price = dayInfo?.price;
          const isCheapest = dayInfo?.isCheapest || (price && price === minPrice);

          const dayOfWeek = new Date(year, month, day).getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          // 가격 레벨별 색상 (최저가: 초록, 보통: 기본, 높음: 주황/빨강)
          let priceColorClass = 'text-slate-700';
          let bgClass = 'bg-white hover:bg-slate-50 border-slate-200/70';

          if (isCheapest) {
            priceColorClass = 'text-naver-darkgreen font-black';
            bgClass = 'bg-emerald-50/70 hover:bg-emerald-100/60 border-emerald-300';
          } else if (price && price > minPrice * 1.25) {
            priceColorClass = 'text-rose-600 font-bold';
          }

          if (isSelected) {
            bgClass = 'bg-slate-900 text-white ring-2 ring-naver-green border-transparent shadow-lg scale-[1.02] z-10';
            priceColorClass = 'text-emerald-400 font-black';
          }

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              className={`relative min-h-[64px] sm:min-h-[76px] p-2 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 group ${bgClass}`}
            >
              {/* 상단 날짜 및 최저가 뱃지 */}
              <div className="flex items-center justify-between w-full">
                <span className={`text-xs sm:text-sm font-black ${
                  isSelected
                    ? 'text-white'
                    : dayOfWeek === 0
                    ? 'text-rose-500'
                    : dayOfWeek === 6
                    ? 'text-blue-500'
                    : 'text-slate-800'
                }`}>
                  {day}
                </span>

                {isCheapest && !isSelected && (
                  <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-naver-green text-white">
                    최저
                  </span>
                )}

                {isSelected && (
                  <div className="w-4 h-4 rounded-full bg-naver-green text-white flex items-center justify-center">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>

              {/* 하단 가격 표기 */}
              <div className="mt-1">
                {price ? (
                  <>
                    <span className={`text-[11px] sm:text-xs font-mono block tracking-tight ${priceColorClass}`}>
                      {Math.round(price / 10000)}만~
                    </span>
                    <span className={`text-[9px] truncate block ${
                      isSelected ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {dayInfo?.airlineName || '직항/경유'}
                    </span>
                  </>
                ) : (
                  <span className="text-[10px] text-slate-300 block">-</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 캘린더 푸터 안내 */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <span className="flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-naver-green" />
          <span>설정하신 <strong>희망 시간대</strong> 기준 각 일자의 최저가 운임입니다.</span>
        </span>
        <span className="text-slate-400 font-mono text-[11px]">
          선택된 출발일: <strong>{selectedDepartureDate}</strong>
        </span>
      </div>
    </div>
  );
}
