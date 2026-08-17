import React, { useState, useMemo } from 'react';
import { X, Search, MapPin, Check } from 'lucide-react';

export default function AirportSelectModal({ isOpen, onClose, onSelect, currentCode, title = '공항 선택', airports = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeGroup, setActiveGroup] = useState('ALL');

  const groups = [
    { key: 'ALL', label: '전체' },
    { key: '국내', label: '국내' },
    { key: '일본', label: '일본' },
    { key: '동남아', label: '동남아' },
    { key: '미주/휴양', label: '미주/휴양' },
    { key: '유럽', label: '유럽' },
  ];

  const filteredAirports = useMemo(() => {
    return airports.filter(a => {
      const matchSearch =
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.englishName && a.englishName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (a.country && a.country.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchGroup = activeGroup === 'ALL' || a.group === activeGroup || (activeGroup === '동남아' && a.group?.includes('동남아'));

      return matchSearch && matchGroup;
    });
  }, [airports, searchTerm, activeGroup]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-100">
        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-naver-green" />
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 검색 인풋 */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="도시명, 공항명 또는 공항 코드 (예: 도쿄, NRT, 오사카, 다낭)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-naver-green focus:border-transparent"
              autoFocus
            />
          </div>

          {/* 지역 필터 탭 */}
          <div className="flex space-x-1 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {groups.map(g => (
              <button
                key={g.key}
                onClick={() => setActiveGroup(g.key)}
                className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition ${
                  activeGroup === g.key
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 공항 리스트 */}
        <div className="overflow-y-auto p-4 space-y-1.5 flex-1 max-h-96">
          {filteredAirports.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              일치하는 공항이나 도시를 찾을 수 없습니다.
            </div>
          ) : (
            filteredAirports.map(airport => {
              const isSelected = airport.code === currentCode;
              return (
                <button
                  key={airport.code}
                  onClick={() => {
                    onSelect(airport);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-naver-lightgreen/70 border border-naver-green/40'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-12 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 font-mono">
                      {airport.code}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm flex items-center space-x-1.5">
                        <span>{airport.name}</span>
                        {airport.popular && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">
                            인기
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        {airport.country} · {airport.city} ({airport.englishName})
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-naver-green text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
