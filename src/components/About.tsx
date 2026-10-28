import React from 'react';
import { CORE_PHILOSOPHY } from '../data/courses';
import { Sparkles, Users, Award, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-2">
            회사 소개
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            사람을 향한 따뜻함과 기술의 깊이로,
            <br />
            실무 역량의 새로운 기준을 만듭니다.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            비트교육컨설팅은 급변하는 IT와 AI의 파도 속에서 수강생과 조직이 실질적인 성과를 낼 수 있도록 돕는 실무 교육 전문 컨설팅 기업입니다.
            단순 수료증 발급에 그치는 주입식 강의를 지양하고, 현업에서 즉시 문제 해결이 가능한 실전 역량을 함께 완성해 나갑니다.
          </p>
        </div>

        {/* 2-Column Story & Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Narrative & Credibility points */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                “왜 비트교육컨설팅이어야 하는가?”
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                기술은 차갑지만, 교육은 따뜻해야 합니다. 새로운 기술을 배우는 과정은 누구에게나 두렵고 막막할 수 있습니다.
                비트교육컨설팅은 비전공자도 주저하지 않고 질문할 수 있는 안전한 학습 환경과, 
                현업에서 검증된 10년 차 이상 시니어 엔지니어들의 1:1 눈높이 피드백을 통해 
                실패 없는 성장을 지원합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-xs">
                <Users className="w-5 h-5 text-amber-700 mb-2" />
                <div className="font-bold text-slate-900 text-sm">소수 정예 밀착 코칭</div>
                <div className="text-xs text-slate-500 mt-1">대규모 주입식 강의가 아닌 개별 진도 맞춤 첨삭</div>
              </div>

              <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-xs">
                <Award className="w-5 h-5 text-amber-700 mb-2" />
                <div className="font-bold text-slate-900 text-sm">고용노동부 국비 인증</div>
                <div className="text-xs text-slate-500 mt-1">국민내일배움카드 과정 및 공공기관 신뢰 파트너</div>
              </div>

              <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-700 mb-2" />
                <div className="font-bold text-slate-900 text-sm">최신 AI 도구 워크플로우</div>
                <div className="text-xs text-slate-500 mt-1">LLM, 프롬프트 엔지니어링, 업무 자동화 접목</div>
              </div>

              <div className="p-5 border border-slate-200 rounded-xl bg-white shadow-xs">
                <ShieldCheck className="w-5 h-5 text-amber-700 mb-2" />
                <div className="font-bold text-slate-900 text-sm">사후 역량 및 취업 지원</div>
                <div className="text-xs text-slate-500 mt-1">수료 후에도 이어지는 커뮤니티 및 자격증 지원</div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Photo of Mentoring */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
              <img
                src="/src/assets/images/about_mentoring_consulting_1793177293520.jpg"
                alt="비트교육컨설팅 1:1 실무 멘토링 및 로드맵 상담"
                className="w-full h-[360px] sm:h-[440px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs sm:text-sm">
                <div className="font-medium text-slate-200">
                  실무자를 위한 1:1 맞춤형 커리어 & 기술 컨설팅
                </div>
                <div className="text-amber-400 font-semibold shrink-0 ml-2">
                  비트 멘토링 시스템
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Editorial Principles */}
        <div className="pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              비트교육컨설팅의 3가지 핵심 약속
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              체계적인 교육 설계와 변함없는 진심으로 수강생과 고객사의 도약을 돕습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_PHILOSOPHY.map((item) => (
              <div
                key={item.number}
                className="p-8 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-bold font-mono text-amber-700/80 mb-4">
                    {item.number}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  <span>비트교육컨설팅 핵심 가치</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
