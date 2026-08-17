import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function PopularDestinations({ destinations = [], onSelectDestination }) {
  if (!destinations || destinations.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-naver-green" />
          <h2 className="text-sm font-bold text-slate-800">지금 가장 많이 찾는 인기 여행지</h2>
        </div>
        <span className="text-xs text-slate-400">클릭 시 바로 목적지로 설정</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {destinations.map(item => (
          <button
            key={item.code}
            onClick={() => onSelectDestination(item.code)}
            className="group p-3 rounded-2xl bg-white hover:bg-slate-900 border border-slate-200/80 hover:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 text-left flex flex-col justify-between"
          >
            <div>
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform origin-left">
                {item.emoji}
              </div>
              <div className="font-bold text-xs text-slate-800 group-hover:text-white transition">
                {item.name}
              </div>
              <div className="text-[10px] text-slate-400 group-hover:text-slate-300 transition font-mono">
                {item.code}
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-100 group-hover:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] font-bold text-naver-green group-hover:text-emerald-400">
                {item.avgPrice}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
