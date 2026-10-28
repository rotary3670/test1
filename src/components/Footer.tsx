import React, { useState } from 'react';
import { ArrowUp, Shield, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-white mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-base border border-amber-500/30">
                B
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                비트교육컨설팅
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              개발자로의 도약, 실무의 답을 제안합니다. 이론을 넘어 현업에서 즉시 쓰이는 실무 AI 및 IT 교육의 신뢰받는 파트너입니다.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <div>상호명: (주)비트교육컨설팅 · 대표이사: 김도현</div>
              <div>사업자등록번호: 214-88-01928 · 통신판매업신고: 제2024-서울서초-0812호</div>
              <div>소재지: 서울특별시 서초구 서초대로 397 (서초동, 비트타워 6층)</div>
              <div>고객센터: 02-555-8930 · 이메일: contact@bitedu.kr</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
              교육과정 바로가기
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  AI활용 교육 (ChatGPT·실무)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  맞춤형 AI 교육 (기업 DX·RAG)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  공공기관 디지털 프로그램
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  컴퓨터활용 1급 (국비지원)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  ITQ 마스터 (한글·엑셀·PPT)
                </a>
              </li>
              <li>
                <a href="#courses" className="hover:text-amber-400 transition-colors">
                  실무 디자인 과정 (포토샵·일러스트)
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate / Support */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                상담 및 문의 안내
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                개인 수강, 단체 위탁, 기업 맞춤 출강 교육 등 문의 사항은 언제든 편하게 접수해 주세요.
              </p>
              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs">
                <div className="text-amber-400 font-bold mb-0.5">상담 센터 운영시간</div>
                <div className="text-slate-300">평일 09:00 - 18:00 (주말 및 공휴일 휴무)</div>
                <div className="text-slate-400 text-[11px] mt-1">온라인 상담 신청은 365일 24시간 접수 가능</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setPrivacyModalOpen(true)}
                className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4 cursor-pointer"
              >
                개인정보처리방침
              </button>
              <span className="text-slate-600">·</span>
              <a
                href="#about"
                className="text-xs text-slate-400 hover:text-slate-200 underline underline-offset-4"
              >
                회사소개서
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} 비트교육컨설팅 (Bit Education Consulting Co., Ltd.) All rights reserved.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <span>맨 위로 가기</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-base">개인정보 처리방침 요약</h4>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <div className="py-4 text-xs text-slate-600 space-y-3 overflow-y-auto leading-relaxed">
              <p>
                <strong>1. 수집하는 개인정보 항목:</strong> 비트교육컨설팅은 상담 신청 및 수강 안내를 위해 성함, 연락처, 이메일 주소, 문의 내용을 수집합니다.
              </p>
              <p>
                <strong>2. 개인정보의 수집 및 이용목적:</strong> 상담 신청에 따른 본인 식별, 문의 사항 확인 및 사실 조사를 위한 연락·통지, 교육과정 안내 및 출강 제안서 제공.
              </p>
              <p>
                <strong>3. 보유 및 이용기간:</strong> 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후(상담 종결 시) 즉시 파기합니다. 단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
              </p>
              <p>
                <strong>4. 거부 권리:</strong> 이용자는 개인정보 수집 동의를 거부할 권리가 있으며, 동의 거부 시 원활한 맞춤 상담 제공이 제한될 수 있습니다.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                확인했습니다
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
