import React, { useState } from 'react';
import { X, Bell, CheckCircle2, DollarSign } from 'lucide-react';

export default function PriceAlertModal({ isOpen, onClose, destinationName, currentLowestPrice }) {
  const [targetPrice, setTargetPrice] = useState(
    currentLowestPrice ? Math.round((currentLowestPrice * 0.9) / 10000) * 10000 : 250000
  );
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-slate-800">목표 최저가 가격 변동 알림</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-naver-green mx-auto animate-bounce" />
            <h4 className="font-extrabold text-slate-900 text-base">알림 등록 완료!</h4>
            <p className="text-xs text-slate-500">
              {destinationName} 항공권이 {targetPrice.toLocaleString('ko-KR')}원 이하로 떨어지면 알려드립니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-500">
              네이버 항공권 가격 변동을 모니터링하여, 내가 지정한 목표 가격보다 저렴해지면 즉시 알려드립니다.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">목표 알림 가격 (원)</label>
              <div className="relative">
                <input
                  type="number"
                  step="10000"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full pl-4 pr-12 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">원 이하</span>
              </div>
              {currentLowestPrice && (
                <span className="text-[11px] text-slate-400">
                  * 현재 최저가: {currentLowestPrice.toLocaleString('ko-KR')}원
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">알림 받을 이메일 또는 연락처</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold shadow-md shadow-amber-500/20 transition"
            >
              가격 하락 알림 등록하기
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
