import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles, MessageCircle } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, searchParams, filters, lowestPrice }) {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  // 현재 브라우저 URL 기반 공유 링크 생성
  const shareUrl = window.location.href;

  const shareSummaryText = `✈️ [네이버 항공권 최저가 추천]\n📍 ${searchParams.origin} ➔ ${searchParams.destination}\n📅 일정: ${searchParams.departureDate} ~ ${searchParams.returnDate || ''}\n⏰ 출발 시간대: ${filters.depTimeStart}~${filters.depTimeEnd}\n💰 최저가: ${lowestPrice ? lowestPrice.toLocaleString('ko-KR') + '원' : '조회 중'}\n\n👉 링크로 항공권 확인하기:\n${shareUrl}`;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareSummaryText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-naver-lightgreen text-naver-darkgreen flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800">친구에게 검색 조건 공유</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          내가 설정한 출발/도착지, 날짜, 원하는 탑승 시간대 및 항공사 필터 조건이 그대로 담긴 링크입니다. 친구에게 바로 보내보세요!
        </p>

        {/* 요약 박스 */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-1.5 font-medium text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-400">여정</span>
            <span className="font-bold text-slate-900">{searchParams.origin} ➔ {searchParams.destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">일정</span>
            <span>{searchParams.departureDate} {searchParams.returnDate ? `~ ${searchParams.returnDate}` : ''}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">선택 시간대</span>
            <span className="text-naver-darkgreen font-bold">{filters.depTimeStart} ~ {filters.depTimeEnd}</span>
          </div>
        </div>

        {/* 링크 복사 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">웹 URL 링크 복사</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-slate-100 px-3 py-2.5 rounded-xl text-xs text-slate-600 border border-slate-200 select-all focus:outline-none"
            />
            <button
              onClick={handleCopyUrl}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 ${
                copied
                  ? 'bg-naver-green text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>복사됨!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>링크 복사</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 카카오톡 메시지 스타일 텍스트 복사 */}
        <button
          onClick={handleCopyText}
          className="w-full py-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold flex items-center justify-center space-x-2 transition"
        >
          <MessageCircle className="w-4 h-4 text-amber-700" />
          <span>{copiedText ? '메신저용 요약 복사 완료!' : '카톡/메신저용 요약 텍스트 복사'}</span>
        </button>
      </div>
    </div>
  );
}
