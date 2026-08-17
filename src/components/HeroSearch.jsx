import React, { useState } from 'react';
import { ArrowLeftRight, Calendar, Clock, Users, Search, PlaneTakeoff, PlaneLanding, Sparkles, Check, ChevronRight } from 'lucide-react';
import AirportSelectModal from './AirportSelectModal.jsx';

export default function HeroSearch({
  searchParams,
  setSearchParams,
  filters,
  setFilters,
  onSearch,
  isLoading,
  airports = [],
}) {
  const [modalType, setModalType] = useState(null);

  const originAirport = airports.find(a => a.code === searchParams.origin) || {
    code: searchParams.origin,
    name: searchParams.origin === 'ICN' ? '인천' : searchParams.origin,
    city: '서울/인천'
  };

  const destAirport = airports.find(a => a.code === searchParams.destination) || {
    code: searchParams.destination,
    name: searchParams.destination === 'NRT' ? '나리타(도쿄)' : searchParams.destination,
    city: '도쿄'
  };

  const handleSwapAirports = () => {
    setSearchParams(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  // 여행 기간 (박/일) 프리셋
  const stayDurationOptions = [
    { days: 2, label: '2박 3일' },
    { days: 3, label: '3박 4일' },
    { days: 4, label: '4박 5일' },
    { days: 5, label: '5박 6일' },
  ];

  // 시간대 추천 퀵 프리셋
  const timeSlotPresets = [
    { label: '✨ 아침 출발(09~11시) & 저녁 귀국(18~21시)', depStart: '09:00', depEnd: '11:00', retStart: '18:00', retEnd: '21:00' },
    { label: '🌅 오전(08~12시) & 오후(17~22시)', depStart: '08:00', depEnd: '12:00', retStart: '17:00', retEnd: '22:00' },
    { label: '🌙 퇴근 후 저녁 출발(18~24시)', depStart: '18:00', depEnd: '23:59', retStart: '18:00', retEnd: '23:59' },
    { label: '⏳ 24시간 전체 시간대', depStart: '00:00', depEnd: '23:59', retStart: '00:00', retEnd: '23:59' },
  ];

  return (
    <div className="relative pt-6 pb-10 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl shadow-xl mx-2 sm:mx-6 mt-4 p-5 sm:p-8 border border-slate-700/60">
      {/* 배경 장식 글로우 */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-naver-green/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-blue/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* 헤더 안내 */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-naver-green/10 border border-naver-green/30 text-emerald-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>날짜 픽스 없이 기간 내 원하는 시간대 항공권 혼합 검색</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            네이버 항공권 <span className="text-naver-green">유연 기간 & 시간대 맞춤 최저가</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl mx-auto">
            출발 기간과 원하는 시간대(예: 오전 9~11시 출발, 저녁 6~9시 귀국)만 정하면 그 사이 최저가 항공권을 모아서 비교해 드립니다.
          </p>
        </div>

        {/* 메인 검색 폼 */}
        <form onSubmit={handleSubmit} className="bg-white text-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-100 space-y-5">
          {/* 상단 탭: 검색 모드 선택 (기간 범위 vs 특정 날짜) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setSearchParams(prev => ({ ...prev, searchMode: 'flexible' }))}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                  searchParams.searchMode === 'flexible'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-naver-green" />
                <span>🗓️ 기간 내 최저가 검색 (날짜 유연)</span>
              </button>

              <button
                type="button"
                onClick={() => setSearchParams(prev => ({ ...prev, searchMode: 'fixed' }))}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  searchParams.searchMode === 'fixed'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>📌 특정 날짜 고정 검색</span>
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={searchParams.directOnly || false}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, directOnly: e.target.checked }))}
                  className="rounded text-naver-green focus:ring-naver-green w-4 h-4"
                />
                <span>직항 전용</span>
              </label>

              <div className="flex items-center space-x-1.5 bg-slate-100 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>성인</span>
                <select
                  value={searchParams.adults}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, adults: Number(e.target.value) }))}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n}명</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 1단: 출발지, 도착지, 기간 설정 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* 출발지 */}
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={() => setModalType('origin')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-naver-green bg-slate-50/70 hover:bg-white transition group flex items-center justify-between"
              >
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    출발지
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="font-extrabold text-base text-slate-900">{originAirport.name}</span>
                    <span className="text-xs font-bold text-slate-400 font-mono">[{originAirport.code}]</span>
                  </div>
                </div>
                <PlaneTakeoff className="w-4 h-4 text-slate-400 group-hover:text-naver-green transition" />
              </button>
            </div>

            {/* 스왑 버튼 */}
            <div className="hidden md:flex md:col-span-1 justify-center">
              <button
                type="button"
                onClick={handleSwapAirports}
                className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 transition shadow-sm"
                title="출발지 / 도착지 변경"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 도착지 */}
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={() => setModalType('destination')}
                className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-naver-green bg-slate-50/70 hover:bg-white transition group flex items-center justify-between"
              >
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    도착지 (목적지)
                  </span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="font-extrabold text-base text-slate-900">{destAirport.name}</span>
                    <span className="text-xs font-bold text-slate-400 font-mono">[{destAirport.code}]</span>
                  </div>
                </div>
                <PlaneLanding className="w-4 h-4 text-slate-400 group-hover:text-naver-green transition" />
              </button>
            </div>

            {/* 날짜/기간 선택 */}
            <div className="md:col-span-5">
              {searchParams.searchMode === 'flexible' ? (
                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-extrabold text-emerald-800 flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-naver-green" />
                      <span>여행 가능 기간 (이 기간 내에서 탐색)</span>
                    </span>
                    <div className="flex space-x-1">
                      {stayDurationOptions.map(opt => (
                        <button
                          key={opt.days}
                          type="button"
                          onClick={() => setSearchParams(prev => ({ ...prev, stayDays: opt.days }))}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                            searchParams.stayDays === opt.days
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white text-slate-600 border border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={searchParams.startDate}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full p-2 text-xs font-bold text-slate-900 bg-white rounded-lg border border-slate-200 focus:outline-none"
                    />
                    <input
                      type="date"
                      value={searchParams.endDate}
                      min={searchParams.startDate}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full p-2 text-xs font-bold text-slate-900 bg-white rounded-lg border border-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">가는 날</label>
                    <input
                      type="date"
                      value={searchParams.departureDate}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, departureDate: e.target.value }))}
                      className="w-full mt-1 text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                  <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">오는 날</label>
                    <input
                      type="date"
                      value={searchParams.returnDate}
                      min={searchParams.departureDate}
                      onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                      className="w-full mt-1 text-xs font-bold text-slate-900 bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2단: 🕒 사용자가 요청한 핵심 시간대 지정 영역 (오전 9~11시, 오는날 6~9시 등) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-naver-green" />
                <span className="text-xs font-extrabold text-slate-800">
                  내가 원하는 탑승 시간대 지정 (이 시간대 사이 항공권만 조회)
                </span>
              </div>

              {/* 시간대 빠른 프리셋 */}
              <div className="flex flex-wrap gap-1.5">
                {timeSlotPresets.map((preset, idx) => {
                  const isActive =
                    filters.depTimeStart === preset.depStart &&
                    filters.depTimeEnd === preset.depEnd &&
                    filters.retTimeStart === preset.retStart &&
                    filters.retTimeEnd === preset.retEnd;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        depTimeStart: preset.depStart,
                        depTimeEnd: preset.depEnd,
                        retTimeStart: preset.retStart,
                        retTimeEnd: preset.retEnd,
                      }))}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 시간 직접 기입 인풋 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* 가는 편 시간대 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-700">🛫 가는 편 희망 시간:</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="time"
                    value={filters.depTimeStart}
                    onChange={(e) => setFilters(prev => ({ ...prev, depTimeStart: e.target.value }))}
                    className="px-2 py-1 bg-slate-50 rounded-lg text-xs font-extrabold text-naver-darkgreen border border-slate-200 focus:outline-none focus:ring-1 focus:ring-naver-green"
                  />
                  <span className="text-slate-400 text-xs font-bold">~</span>
                  <input
                    type="time"
                    value={filters.depTimeEnd}
                    onChange={(e) => setFilters(prev => ({ ...prev, depTimeEnd: e.target.value }))}
                    className="px-2 py-1 bg-slate-50 rounded-lg text-xs font-extrabold text-naver-darkgreen border border-slate-200 focus:outline-none focus:ring-1 focus:ring-naver-green"
                  />
                </div>
              </div>

              {/* 오는 편 시간대 */}
              <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-700">🛬 오는 편 희망 시간:</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="time"
                    value={filters.retTimeStart}
                    onChange={(e) => setFilters(prev => ({ ...prev, retTimeStart: e.target.value }))}
                    className="px-2 py-1 bg-slate-50 rounded-lg text-xs font-extrabold text-naver-darkgreen border border-slate-200 focus:outline-none focus:ring-1 focus:ring-naver-green"
                  />
                  <span className="text-slate-400 text-xs font-bold">~</span>
                  <input
                    type="time"
                    value={filters.retTimeEnd}
                    onChange={(e) => setFilters(prev => ({ ...prev, retTimeEnd: e.target.value }))}
                    className="px-2 py-1 bg-slate-50 rounded-lg text-xs font-extrabold text-naver-darkgreen border border-slate-200 focus:outline-none focus:ring-1 focus:ring-naver-green"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 검색 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-4 rounded-xl bg-naver-green hover:bg-naver-darkgreen active:scale-98 text-white font-extrabold text-base flex items-center justify-center space-x-2 shadow-lg shadow-naver-green/30 transition disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>기간 내 맞춤 시간대 최저가 항공권 찾기</span>
              </>
            )}
          </button>
        </form>
      </div>

      <AirportSelectModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={modalType === 'origin' ? '출발 공항 선택' : '도착지 (목적지) 선택'}
        airports={airports}
        currentCode={modalType === 'origin' ? searchParams.origin : searchParams.destination}
        onSelect={(airport) => {
          if (modalType === 'origin') {
            setSearchParams(prev => ({ ...prev, origin: airport.code }));
          } else {
            setSearchParams(prev => ({ ...prev, destination: airport.code }));
          }
        }}
      />
    </div>
  );
}
