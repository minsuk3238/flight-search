import React from 'react';
import { Plane, Share2, Bell, Sparkles, ExternalLink } from 'lucide-react';

export default function Navbar({ onOpenShare, onOpenAlert, mainNaverUrl }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 로고 및 브랜딩 */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-naver-green flex items-center justify-center text-white shadow-md shadow-naver-green/20">
              <Plane className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  플라이트<span className="text-naver-green">파인더</span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-naver-lightgreen text-naver-darkgreen border border-naver-green/20">
                  NAVER 연동
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                스마트 시간대 필터 & 최저가 비교 추천
              </p>
            </div>
          </div>

          {/* 우측 액션 버튼들 */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {mainNaverUrl && (
              <a
                href={mainNaverUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center space-x-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                <span>네이버 항공권 원문</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onOpenAlert}
              className="inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">가격 알림</span>
            </button>

            <button
              onClick={onOpenShare}
              className="inline-flex items-center space-x-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-naver-green hover:bg-naver-darkgreen text-white shadow-sm transition"
            >
              <Share2 className="w-4 h-4" />
              <span>친구에게 공유</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
