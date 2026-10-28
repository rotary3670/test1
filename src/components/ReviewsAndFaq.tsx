import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data/courses';
import { Quote, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const ReviewsAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-2">
              수강생 & 고객사 후기
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              함께 성장한 분들의 생생한 이야기
            </h2>
            <p className="mt-3 text-base text-slate-600">
              취업 가산점부터 기업 DX 혁신까지, 비트교육컨설팅과 함께 만든 실무 성과입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-300 transition-all shadow-xs"
              >
                <div>
                  <Quote className="w-8 h-8 text-amber-700/30 mb-4" />
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-normal">
                    “{review.content}”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <div className="text-sm font-bold text-slate-900">{review.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{review.role}</div>
                  <div className="text-[11px] font-semibold text-amber-700 mt-1">
                    {review.course}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-2">
              자주 묻는 질문
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              궁금하신 점을 빠르게 해결해 드립니다
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              국비지원 신청 방법, 수강 자격 등 가장 자주 묻는 질문들을 모았습니다.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {faq.q}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-5 bg-white border border-slate-200 rounded-xl text-center flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="text-sm font-bold text-slate-900">찾으시는 질문이 없으신가요?</div>
              <div className="text-xs text-slate-500 mt-0.5">상담 폼을 남겨주시면 담당 컨설턴트가 직접 상세히 답변드립니다.</div>
            </div>
            <a
              href="#consultation"
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              1:1 맞춤 상담 신청하기
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
