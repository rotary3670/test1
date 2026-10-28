/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { ConsultationForm } from './components/ConsultationForm';
import { ReviewsAndFaq } from './components/ReviewsAndFaq';
import { Footer } from './components/Footer';
import { ConsultationHistoryModal } from './components/ConsultationHistoryModal';
import { getStoredConsultations } from './services/consultationStorage';
import { ConsultationRecord } from './types';
import { PhoneCall, MessageSquareQuote } from 'lucide-react';

export default function App() {
  const [consultations, setConsultations] = useState<ConsultationRecord[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedCourseForForm, setSelectedCourseForForm] = useState<{
    name: string;
    category: string;
  }>({
    name: 'AI활용 교육',
    category: '일반과정',
  });

  // Load consultations from LocalStorage on mount
  useEffect(() => {
    const records = getStoredConsultations();
    setConsultations(records);
  }, []);

  const handleConsultationSaved = (newRecord: ConsultationRecord) => {
    setConsultations((prev) => [newRecord, ...prev]);
  };

  const handleRecordsUpdated = (updated: ConsultationRecord[]) => {
    setConsultations(updated);
  };

  const scrollToConsultation = (courseName?: string, category?: string) => {
    if (courseName && category) {
      setSelectedCourseForForm({ name: courseName, category });
    }
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Header */}
      <Header
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        savedCount={consultations.length}
      />

      <main className="flex-1">
        {/* 2. Hero */}
        <Hero
          onSelectConsultation={() => scrollToConsultation()}
          onSelectCourses={scrollToCourses}
        />

        {/* 3. About (회사소개) */}
        <About />

        {/* 4. 교육과정 (일반과정 & 국비과정) */}
        <Courses
          onSelectCourseForConsultation={(courseName, category) =>
            scrollToConsultation(courseName, category)
          }
        />

        {/* 5. 수강생 후기 & FAQ */}
        <ReviewsAndFaq />

        {/* 6. 상담 신청 폼 (LocalStorage 연동 & 검증) */}
        <ConsultationForm
          initialCourseName={selectedCourseForForm.name}
          initialCategory={selectedCourseForForm.category}
          onConsultationSaved={handleConsultationSaved}
          onOpenHistory={() => setIsHistoryModalOpen(true)}
        />
      </main>

      {/* 7. Footer */}
      <Footer />

      {/* LocalStorage Consultation History Inspector Modal */}
      <ConsultationHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        records={consultations}
        onRecordsUpdated={handleRecordsUpdated}
      />

      {/* Floating Quick Consultation Action for High Conversion */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        <button
          onClick={() => scrollToConsultation()}
          className="flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-full shadow-xl hover:shadow-2xl active:scale-95 transition-all cursor-pointer border border-slate-700/60"
          aria-label="빠른 상담 신청"
        >
          <PhoneCall className="w-4 h-4 text-amber-400 animate-bounce" />
          <span className="hidden sm:inline">빠른 상담 신청</span>
          <span className="sm:hidden">상담 신청</span>
        </button>
      </div>
    </div>
  );
}
