import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { COMPANY_STATS } from '../data/courses';
import heroImage from '../assets/images/hero_education_seminar_1793177292719.jpg';

interface HeroProps {
  onSelectConsultation: () => void;
  onSelectCourses: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectConsultation, onSelectCourses }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/70 via-slate-50 to-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed text kicker (Anti-slop: No pill box) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-700 mb-4">
              <span>비트교육컨설팅</span>
              <span aria-hidden="true">·</span>
              <span>실무 중심 IT & AI 교육 전문 기관</span>
              <span aria-hidden="true">·</span>
              <span>1:1 멘토링 케어</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] text-balance mb-6">
              개발자로의 도약,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-amber-700">
                실무의 답을 제안합니다.
              </span>
            </h1>

            {/* Value Proposition Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              단순 암기식 강의가 아닌 현업에서 마주하는 진짜 문제를 해결하는 교육.
              비전공자의 기초 다지기부터 현업 개발자의 AI 워크플로우 혁신까지,
              비트교육컨설팅이 신뢰할 수 있는 실무 로드맵을 제공합니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <button
                onClick={onSelectConsultation}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0 group"
              >
                <span>지금 상담 신청하기</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onSelectCourses}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98] rounded-xl border border-slate-300 shadow-sm transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>교육 과정 보기</span>
              </button>
            </div>

            {/* Quick Guarantees (Clean text, no pill badges) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>국민내일배움카드 지원 가능</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>기업 및 공공기관 맞춤 출강</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>10년 차 이상 시니어 직강</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100">
              <img
                src={heroImage}
                alt="비트교육컨설팅 실무 IT 및 AI 교육 세미나 현장"
                className="w-full h-[340px] sm:h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Subtle natural scrim for photo depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Photo Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
                  비트교육컨설팅 강의 현장
                </div>
                <div className="text-sm font-medium text-slate-100 mt-0.5">
                  실무 중심의 문제 해결형 AI & 프로그래밍 워크숍
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Proof & Statistics Strip (Adjacency Rule) */}
        <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {COMPANY_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-700 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
