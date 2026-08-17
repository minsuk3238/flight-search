import React, { useState } from 'react';
import { Plane, Luggage, Clock, ArrowRight, ExternalLink, ChevronDown, ChevronUp, AlertCircle, Calendar, Sparkles } from 'lucide-react';

export default function FlightCard({ flight, adults = 1 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    airline,
    outbound,
    inbound,
    pricing,
    baggage,
    isDirect,
    score,
    isCheapest,
    remainingSeats,
    naverUrl,
    scheduleLabel,
    departureDateFormatted,
    returnDateFormatted,
    stayDaysFormatted
  } = flight;

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-card-hover overflow-hidden ${
      isCheapest ? 'border-naver-green ring-2 ring-naver-green/40 shadow-sm' : 'border-slate-200/80 hover:border-slate-300'
    }`}>
      {/* 카드 상단: 🗓️ 일정 날짜 배지 & 핵심 태그 */}
      <div className="bg-slate-50/90 px-4 py-2 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
        <div className="flex items-center space-x-2">
          {/* 일정 날짜 강조 뱃지 */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono">
            <Calendar className="w-3.5 h-3.5 text-naver-green" />
            <span>{scheduleLabel || `${departureDateFormatted} ~ ${returnDateFormatted} (${stayDaysFormatted})`}</span>
          </div>

          {isCheapest && (
            <span className="px-2 py-0.5 rounded-md bg-naver-green text-white text-[11px]">
              🏆 기간 내 최저가
            </span>
          )}
          {score >= 90 && (
            <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 text-[11px]">
              AI 추천 {score}점
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3 text-slate-500 text-[11px]">
          {remainingSeats <= 4 && (
            <span className="text-rose-500 flex items-center space-x-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>잔여 {remainingSeats}석</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* 항공편 여정 */}
          <div className="flex-1 space-y-3.5">
            {/* 가는 편 */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-24 sm:w-28 flex-shrink-0">
                <div className="flex items-center space-x-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: airline.color }}
                  />
                  <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {airline.name}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {outbound.flightNumber} · <span className="text-emerald-700 font-semibold">{outbound.departureDateFormatted}</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-between sm:justify-start sm:space-x-5">
                <div>
                  <div className="text-base sm:text-lg font-black text-slate-900 font-mono">
                    {outbound.departureTime}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {outbound.origin.code} ({outbound.origin.name})
                  </div>
                </div>

                <div className="flex flex-col items-center px-1 sm:px-3">
                  <div className="text-[10px] text-slate-400 font-semibold mb-0.5 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{outbound.durationFormatted}</span>
                  </div>
                  <div className="relative flex items-center w-16 sm:w-24">
                    <div className="h-[2px] w-full bg-slate-200" />
                    <Plane className="w-3 h-3 text-slate-400 absolute right-0 transform rotate-90" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                    {outbound.isDirect ? '직항' : '경유'}
                  </span>
                </div>

                <div>
                  <div className="text-base sm:text-lg font-black text-slate-900 font-mono">
                    {outbound.arrivalTime}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {outbound.destination.code} ({outbound.destination.name})
                  </div>
                </div>
              </div>
            </div>

            {/* 오는 편 */}
            {inbound && (
              <div className="flex items-center space-x-3 sm:space-x-4 pt-2.5 border-t border-slate-100">
                <div className="w-24 sm:w-28 flex-shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: airline.color }}
                    />
                    <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {airline.name}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {inbound.flightNumber} · <span className="text-emerald-700 font-semibold">{inbound.departureDateFormatted}</span>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-between sm:justify-start sm:space-x-5">
                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-900 font-mono">
                      {inbound.departureTime}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {inbound.origin.code} ({inbound.origin.name})
                    </div>
                  </div>

                  <div className="flex flex-col items-center px-1 sm:px-3">
                    <div className="text-[10px] text-slate-400 font-semibold mb-0.5 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{inbound.durationFormatted}</span>
                    </div>
                    <div className="relative flex items-center w-16 sm:w-24">
                      <div className="h-[2px] w-full bg-slate-200" />
                      <Plane className="w-3 h-3 text-slate-400 absolute right-0 transform rotate-90" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                      {inbound.isDirect ? '직항' : '경유'}
                    </span>
                  </div>

                  <div>
                    <div className="text-base sm:text-lg font-black text-slate-900 font-mono">
                      {inbound.arrivalTime}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {inbound.destination.code} ({inbound.destination.name})
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 우측 가격 및 네이버 예약 버튼 */}
          <div className="lg:pl-5 lg:border-l lg:border-slate-100 flex lg:flex-col items-center lg:items-end justify-between gap-2 pt-2.5 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <div className="text-left lg:text-right">
              <div className="flex items-center lg:justify-end space-x-1 text-[11px] text-slate-500 font-medium">
                <Luggage className="w-3 h-3 text-slate-400" />
                <span>{baggage.allowance}</span>
              </div>
              <div className="mt-0.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono tracking-tight">
                  {pricing.formattedPrice}
                </span>
                {adults > 1 && (
                  <span className="block text-[10px] text-slate-400">
                    총 {pricing.formattedTotalPrice} (성인 {adults}명)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 transition text-xs"
                title="상세 운임"
              >
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              <a
                href={naverUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-naver-green hover:bg-naver-darkgreen active:scale-95 text-white font-bold text-xs shadow-md shadow-naver-green/20 transition"
              >
                <span>네이버 예약</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 상세 펼침 */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl space-y-2 animate-fadeIn">
            <div className="font-bold text-slate-800 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-naver-green" />
              <span>{scheduleLabel} 항공권 상세 정보</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">기본 항공 운임</span>
                <span className="font-bold text-slate-800">{pricing.baseFare.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">세금 및 유류할증료</span>
                <span className="font-bold text-slate-800">{(pricing.taxes + pricing.fuelSurcharge).toLocaleString('ko-KR')}원</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">무료 위탁 수하물</span>
                <span className="font-bold text-emerald-700">{baggage.allowance}</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">기내 수하물</span>
                <span className="font-bold text-slate-700">{baggage.cabinBaggage}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
