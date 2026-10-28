import React, { useState } from 'react';
import { Menu, X, PhoneCall, History } from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenHistory, savedCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '회사소개', href: '#about' },
    { label: '교육과정', href: '#courses' },
    { label: '수강생 후기', href: '#testimonials' },
    { label: '자주 묻는 질문', href: '#faq' },
    { label: '상담신청', href: '#consultation' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-amber-400 font-bold text-lg shadow-sm">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
              비트교육컨설팅
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action + History trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenHistory}
            title="상담 내역 확인 (LocalStorage)"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <History className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">신청내역</span>
            <span className="text-amber-800 font-semibold tabular-nums ml-0.5">({savedCount})</span>
          </button>

          <button
            onClick={() => handleNavClick('#consultation')}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span>상담 신청하기</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-100"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2.5 px-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHistory();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg"
              >
                <History className="w-4 h-4 text-slate-600" />
                <span>상담 신청 내역 조회 ({savedCount}건)</span>
              </button>
              <button
                onClick={() => handleNavClick('#consultation')}
                className="w-full py-3 text-center text-sm font-bold text-white bg-slate-900 rounded-lg"
              >
                지금 무료 상담 신청하기
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
