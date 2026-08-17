import React from 'react';
import { Sparkles, DollarSign, Clock, Calendar, ExternalLink } from 'lucide-react';

export default function SmartRecommendations({ recommendations }) {
  if (!recommendations) return null;
  const { bestPrice, bestSchedule, bestValue } = recommendations;

  if (!bestPrice && !bestSchedule && !bestValue) return null;

  const picks = [
    {
      type: 'bestPrice',
      title: '기간 내 1위 최저가 픽',
      badge: '💰 기간 내 최저가',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      borderClass: 'border-emerald-300/80 hover:border-emerald-500 bg-gradient-to-br from-emerald-50/40 via-white to-white',
      flight: bestPrice,
      description: '설정하신 기간 및 시간대 중 가장 가격이 저렴한 최저가 일정입니다.',
    },
    {
      type: 'bestValue',
      title: 'AI 종합 가성비 최고 픽',
      badge: '🌟 최고 만족도',
      badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      borderClass: 'border-indigo-300/80 hover:border-indigo-500 bg-gradient-to-br from-indigo-50/40 via-white to-white ring-1 ring-indigo-200/50',
      flight: bestValue,
      description: '가격, 비행시간, 수하물, 탑승 시간대 편의성을 종합한 만족도 1위 일정입니다.',
    },
    {
      type: 'bestSchedule',
      title: '황금 시간대 직항 픽',
      badge: '⚡ 완벽한 일정',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      borderClass: 'border-amber-300/80 hover:border-amber-500 bg-gradient-to-br from-amber-50/40 via-white to-white',
      flight: bestSchedule,
      description: '오전 9~11시 출발 & 저녁 꽉 찬 귀국 시간대의 가장 빠른 직항 일정입니다.',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-5 h-5 text-naver-green animate-pulse" />
        <h2 className="text-lg font-extrabold text-slate-900">
          설정 기간 & 시간대 맞춤 3대 핵심 픽
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {picks.map(({ type, title, badge, badgeClass, borderClass, flight, description }) => {
          if (!flight) return null;
          return (
            <div
              key={type}
              className={`rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${borderClass}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                    {badge}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    스코어 <strong className="text-slate-800">{flight.score}점</strong>
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 mb-1">{title}</h3>
                <p className="text-xs text-slate-500 mb-3">{description}</p>

                {/* 추천 일정 및 항공사 */}
                <div className="p-3 bg-white/90 rounded-xl border border-slate-100 space-y-2 mb-3">
                  {/* 날짜 박스 */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-1.5 border-b border-slate-100 font-mono">
                    <span className="flex items-center space-x-1 text-slate-900">
                      <Calendar className="w-3.5 h-3.5 text-naver-green" />
                      <span>{flight.scheduleLabel}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {flight.airline.name}
                    </span>
                  </div>

                  {/* 시간 */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900 pt-0.5">
                    <div>
                      <span className="text-slate-400 font-normal text-[10px] block">가는 편</span>
                      <span>{flight.outbound.departureTime}</span>
                      <span className="text-slate-400 font-normal mx-1">→</span>
                      <span>{flight.outbound.arrivalTime}</span>
                    </div>
                    {flight.inbound && (
                      <div className="text-right">
                        <span className="text-slate-400 font-normal text-[10px] block">오는 편</span>
                        <span>{flight.inbound.departureTime}</span>
                        <span className="text-slate-400 font-normal mx-1">→</span>
                        <span>{flight.inbound.arrivalTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 가격 및 네이버 예약 링크 */}
              <div className="pt-1 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">1인 총 요금</span>
                  <span className="text-lg font-black text-slate-900 font-mono">
                    {flight.pricing.formattedPrice}
                  </span>
                </div>

                <a
                  href={flight.naverUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-naver-green hover:bg-naver-darkgreen text-white font-bold text-xs shadow-sm transition active:scale-95"
                >
                  <span>네이버 예약</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
