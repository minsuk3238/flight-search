import React, { useState } from 'react';
import { Clock, SlidersHorizontal, RotateCcw, Tag, ShieldCheck, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

export default function FilterBar({
  filters,
  setFilters,
  availableAirlines = [],
  tripType = 'round',
  onResetFilters,
  totalFilteredCount = 0,
}) {
  const [isTimeExpanded, setIsTimeExpanded] = useState(true);
  const [isAirlineExpanded, setIsAirlineExpanded] = useState(true);
  const [airlineCategoryTab, setAirlineCategoryTab] = useState('ALL');

  const daysOfWeekList = ['월', '화', '수', '목', '금', '토', '일'];

  // 요일 토글
  const handleToggleDay = (day) => {
    setFilters(prev => {
      const current = prev.selectedDaysOfWeek || [];
      const exists = current.includes(day);
      let updated;
      if (exists) {
        updated = current.filter(d => d !== day);
      } else {
        updated = [...current, day];
      }
      return { ...prev, selectedDaysOfWeek: updated };
    });
  };

  const filteredAirlineList = availableAirlines.filter(item => {
    if (airlineCategoryTab === 'ALL') return true;
    if (airlineCategoryTab === 'FSC') return item.airline.category === 'FSC' || item.airline.category === 'Foreign_FSC';
    if (airlineCategoryTab === 'LCC') return item.airline.category === 'LCC';
    if (airlineCategoryTab === 'FOREIGN') return item.airline.category.startsWith('Foreign');
    return true;
  });

  const handleToggleAirline = (code) => {
    setFilters(prev => {
      const current = prev.selectedAirlines || [];
      const exists = current.includes(code);
      let updated;
      if (exists) {
        updated = current.filter(c => c !== code);
      } else {
        updated = [...current, code];
      }
      return { ...prev, selectedAirlines: updated };
    });
  };

  const handleSelectAllInTab = () => {
    const codesInTab = filteredAirlineList.map(a => a.airline.code);
    setFilters(prev => {
      const current = prev.selectedAirlines || [];
      const combined = Array.from(new Set([...current, ...codesInTab]));
      return { ...prev, selectedAirlines: combined };
    });
  };

  const handleDeselectAllInTab = () => {
    const codesInTab = filteredAirlineList.map(a => a.airline.code);
    setFilters(prev => {
      const current = prev.selectedAirlines || [];
      const updated = current.filter(c => !codesInTab.includes(c));
      return { ...prev, selectedAirlines: updated };
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 space-y-6">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-700" />
          <h3 className="font-bold text-sm text-slate-800">정밀 조건 필터</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-600">
            {totalFilteredCount}개 항공편
          </span>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center space-x-1 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>초기화</span>
        </button>
      </div>

      {/* 1. 요일 선호 필터 (출발 요일 선택) */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
          <Calendar className="w-3.5 h-3.5 text-naver-green" />
          <span>출발 요일 선택</span>
        </span>
        <div className="grid grid-cols-7 gap-1">
          {daysOfWeekList.map(day => {
            const isSelected = filters.selectedDaysOfWeek?.includes(day);
            const isWeekend = day === '토' || day === '일';
            return (
              <button
                key={day}
                type="button"
                onClick={() => handleToggleDay(day)}
                className={`py-1.5 rounded-lg text-xs font-bold transition ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : isWeekend
                    ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. 시간대 정밀 필터 */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <button
          onClick={() => setIsTimeExpanded(!isTimeExpanded)}
          className="w-full flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
        >
          <div className="flex items-center space-x-1.5">
            <Clock className="w-4 h-4 text-naver-green" />
            <span>시간대 실시간 미세조정</span>
          </div>
          {isTimeExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {isTimeExpanded && (
          <div className="space-y-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">가는 편 출발 시간</span>
                <span className="text-naver-darkgreen font-mono">{filters.depTimeStart} ~ {filters.depTimeEnd}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <input
                  type="time"
                  value={filters.depTimeStart}
                  onChange={(e) => setFilters(prev => ({ ...prev, depTimeStart: e.target.value }))}
                  className="flex-1 px-2 py-1 bg-white rounded-lg text-xs font-bold text-slate-800 border border-slate-200 focus:outline-none"
                />
                <span className="text-slate-400 text-xs">~</span>
                <input
                  type="time"
                  value={filters.depTimeEnd}
                  onChange={(e) => setFilters(prev => ({ ...prev, depTimeEnd: e.target.value }))}
                  className="flex-1 px-2 py-1 bg-white rounded-lg text-xs font-bold text-slate-800 border border-slate-200 focus:outline-none"
                />
              </div>
            </div>

            {tripType === 'round' && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">오는 편 출발 시간</span>
                  <span className="text-naver-darkgreen font-mono">{filters.retTimeStart} ~ {filters.retTimeEnd}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <input
                    type="time"
                    value={filters.retTimeStart}
                    onChange={(e) => setFilters(prev => ({ ...prev, retTimeStart: e.target.value }))}
                    className="flex-1 px-2 py-1 bg-white rounded-lg text-xs font-bold text-slate-800 border border-slate-200 focus:outline-none"
                  />
                  <span className="text-slate-400 text-xs">~</span>
                  <input
                    type="time"
                    value={filters.retTimeEnd}
                    onChange={(e) => setFilters(prev => ({ ...prev, retTimeEnd: e.target.value }))}
                    className="flex-1 px-2 py-1 bg-white rounded-lg text-xs font-bold text-slate-800 border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. 항공사 구분 & 목록화 */}
      <div className="space-y-3 pt-2 border-t border-slate-100">
        <button
          onClick={() => setIsAirlineExpanded(!isAirlineExpanded)}
          className="w-full flex items-center justify-between font-bold text-xs text-slate-800 uppercase tracking-wider text-left"
        >
          <div className="flex items-center space-x-1.5">
            <Tag className="w-4 h-4 text-accent-blue" />
            <span>항공사 구분 & 최저가 목록</span>
          </div>
          {isAirlineExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {isAirlineExpanded && (
          <div className="space-y-3 pt-1">
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
              {[
                { key: 'ALL', label: '전체' },
                { key: 'FSC', label: '대형사' },
                { key: 'LCC', label: '저비용' },
                { key: 'FOREIGN', label: '외항사' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setAirlineCategoryTab(tab.key)}
                  className={`flex-1 py-1 text-[11px] font-bold rounded-lg transition ${
                    airlineCategoryTab === tab.key
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] px-1 text-slate-500">
              <span>{filteredAirlineList.length}개 항공사</span>
              <div className="space-x-1.5">
                <button onClick={handleSelectAllInTab} className="font-semibold text-naver-green hover:underline">
                  모두 선택
                </button>
                <span>·</span>
                <button onClick={handleDeselectAllInTab} className="font-semibold text-slate-400 hover:underline">
                  모두 해제
                </button>
              </div>
            </div>

            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {filteredAirlineList.map(item => {
                const isChecked = filters.selectedAirlines.length === 0 || filters.selectedAirlines.includes(item.airline.code);
                return (
                  <label
                    key={item.airline.code}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer ${
                      isChecked
                        ? 'bg-slate-50/80 border-slate-200'
                        : 'bg-white border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleAirline(item.airline.code)}
                        className="rounded text-naver-green focus:ring-naver-green w-4 h-4"
                      />
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.airline.color }}
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center space-x-1">
                          <span>{item.airline.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({item.airline.code})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-extrabold text-slate-900 font-mono block">
                        {item.minPrice.toLocaleString('ko-KR')}원~
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. 기타 빠른 필터 */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">무료 위탁수하물 포함만</span>
          </div>
          <input
            type="checkbox"
            checked={filters.baggageOnly || false}
            onChange={(e) => setFilters(prev => ({ ...prev, baggageOnly: e.target.checked }))}
            className="rounded text-naver-green focus:ring-naver-green w-4 h-4"
          />
        </label>
      </div>
    </div>
  );
}
