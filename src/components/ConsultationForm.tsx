import React, { useState, useEffect } from 'react';
import { ConsultationFormData, FormErrors, ConsultationRecord } from '../types';
import { saveConsultation } from '../services/consultationStorage';
import { Send, CheckCircle2, AlertCircle, Sparkles, Phone, Mail, User, BookOpen, Clock, FileText } from 'lucide-react';

interface ConsultationFormProps {
  initialCourseName?: string;
  initialCategory?: string;
  onConsultationSaved: (newRecord: ConsultationRecord) => void;
  onOpenHistory: () => void;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialCourseName = '',
  initialCategory = '',
  onConsultationSaved,
  onOpenHistory,
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    phone: '',
    email: '',
    courseCategory: initialCategory || '일반과정',
    courseName: initialCourseName || 'AI활용 교육',
    inquiryType: 'individual',
    preferredTime: '오후 (14:00~17:00)',
    message: '',
    agreedPrivacy: true,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<ConsultationRecord | null>(null);

  // Sync when parent updates initial course from course card click
  useEffect(() => {
    if (initialCourseName) {
      setFormData((prev) => ({
        ...prev,
        courseName: initialCourseName,
        courseCategory: initialCategory || prev.courseCategory,
      }));
    }
  }, [initialCourseName, initialCategory]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '성함(이름)을 입력해 주세요.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = '성함은 최소 2자 이상 입력해 주세요.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '연락처(휴대폰 번호)를 입력해 주세요.';
    } else {
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        newErrors.phone = '올바른 휴대폰 번호(10~11자리)를 입력해 주세요.';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일 주소를 입력해 주세요.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = '올바른 이메일 형식(예: name@example.com)을 입력해 주세요.';
      }
    }

    if (!formData.courseName.trim()) {
      newErrors.courseName = '관심 교육 과정을 선택해 주세요.';
    }

    if (!formData.message.trim()) {
      newErrors.message = '문의 내용 및 요청사항을 입력해 주세요.';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = '문의 내용은 최소 5자 이상 작성해 주세요.';
    }

    if (!formData.agreedPrivacy) {
      newErrors.agreedPrivacy = '개인정보 수집 및 이용에 동의해야 상담 신청이 가능합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Realistic brief latency
    setTimeout(() => {
      const saved = saveConsultation(formData);
      setIsSubmitting(false);
      setSubmittedRecord(saved);
      onConsultationSaved(saved);
    }, 400);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      courseCategory: '일반과정',
      courseName: 'AI활용 교육',
      inquiryType: 'individual',
      preferredTime: '오후 (14:00~17:00)',
      message: '',
      agreedPrivacy: true,
    });
    setErrors({});
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    
    // Auto-hyphenate for standard Korean numbers
    let formatted = val;
    if (val.length > 3 && val.length <= 7) {
      formatted = `${val.slice(0, 3)}-${val.slice(3)}`;
    } else if (val.length > 7) {
      formatted = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
    }
    
    setFormData({ ...formData, phone: formatted });
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  return (
    <section id="consultation" className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form Info & Contact Guarantee */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-2">
              상담 신청
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance mb-4">
              내게 꼭 맞는 교육 로드맵,
              <br />
              전문 컨설턴트와 상의하세요
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              수강료 지원 자격 확인, 기업 출강 견적, 교육과정 상세 커리큘럼 문의까지 
              전문 교육 컨설턴트가 꼼꼼히 검토 후 맞춤 답변을 드립니다.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">유선 상담 직통</div>
                  <div className="text-base font-bold text-slate-900">02-555-8930</div>
                  <div className="text-[11px] text-slate-500">평일 09:00 ~ 18:00 (점심시간 12:00~13:00)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">이메일 문의 및 제안서 접수</div>
                  <div className="text-base font-bold text-slate-900">contact@bitedu.kr</div>
                  <div className="text-[11px] text-slate-500">24시간 상시 접수, 영업일 1일 내 회신</div>
                </div>
              </div>
            </div>

            {/* LocalStorage Assurance Notice */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">신청 내역 안전 보관:</span> 접수된 상담 내역은 브라우저(LocalStorage)에 실시간 안전 저장되며, 상단 ‘신청내역’ 버튼을 통해 언제든 직접 확인하고 관리하실 수 있습니다.
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form or Success Message */}
          <div className="lg:col-span-7">
            {submittedRecord ? (
              /* Success Confirmation Card */
              <div className="bg-slate-50 border border-emerald-200 rounded-2xl p-8 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="text-xs font-semibold text-emerald-700 mb-1">
                  상담 신청 접수 완료 (Local Storage 저장됨)
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {submittedRecord.name} 님의 상담 신청이 정상 접수되었습니다.
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  비트교육컨설팅 담당자가 입력해 주신 연락처(<strong>{submittedRecord.phone}</strong>)와 이메일(<strong>{submittedRecord.email}</strong>)로 빠른 시일 내 맞춤 상담을 안내해 드리겠습니다.
                </p>

                {/* Summary Box */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 text-xs sm:text-sm space-y-2.5">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">접수 번호</span>
                    <span className="font-mono font-bold text-slate-800">{submittedRecord.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">희망 교육과정</span>
                    <span className="font-bold text-amber-700">{submittedRecord.courseName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">문의 구분</span>
                    <span className="text-slate-800">
                      {submittedRecord.inquiryType === 'individual' ? '개인 수강 상담' : submittedRecord.inquiryType === 'corporate' ? '기업 출강 문의' : '공공기관 위탁'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">희망 상담 시간</span>
                    <span className="text-slate-800">{submittedRecord.preferredTime}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-slate-500 block mb-1">문의 내용</span>
                    <p className="text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap">
                      {submittedRecord.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={onOpenHistory}
                    className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    상담 신청 내역함 열기
                  </button>
                  <button
                    onClick={handleReset}
                    className="py-3 px-5 border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    추가 문의 작성하기
                  </button>
                </div>
              </div>
            ) : (
              /* Consultation Inquiry Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm"
              >
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">
                    교육 및 출강 상담 신청서
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    * 표시는 원활한 맞춤 상담을 위한 필수 입력 항목입니다.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Inquiry Type Radio / Segment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      신청 대상 구분 *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'individual', label: '개인 수강생' },
                        { value: 'corporate', label: '기업 맞춤 출강' },
                        { value: 'institution', label: '공공기관 위탁' },
                      ].map((item) => (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: item.value as any })}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 text-center ${
                            formData.inquiryType === item.value
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>성함 / 담당자명 *</span>
                    </label>
                    <input
                      type="text"
                      placeholder="예: 홍길동"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.name
                          ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-slate-900 focus:ring-slate-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone & Email Dual Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>연락처 (휴대폰) *</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all font-mono tabular-nums ${
                          errors.phone
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-300 focus:border-slate-900 focus:ring-slate-200'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span>이메일 주소 *</span>
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                            : 'border-slate-300 focus:border-slate-900 focus:ring-slate-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Course Selection & Preferred Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                        <span>관심 교육 과정 *</span>
                      </label>
                      <select
                        value={formData.courseName}
                        onChange={(e) => {
                          const val = e.target.value;
                          const isNational = ['컴퓨터활용 1급', 'ITQ 마스터', '디자인 과정'].includes(val);
                          setFormData({
                            ...formData,
                            courseName: val,
                            courseCategory: isNational ? '국비과정' : '일반과정',
                          });
                          if (errors.courseName) setErrors({ ...errors, courseName: undefined });
                        }}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:border-slate-900 focus:ring-slate-200 transition-all cursor-pointer"
                      >
                        <optgroup label="일반과정 (AI & 공공)">
                          <option value="AI활용 교육">AI활용 교육 (ChatGPT·실무 자동화)</option>
                          <option value="맞춤형 AI 교육">맞춤형 AI 교육 (기업 DX·사내 RAG)</option>
                          <option value="공공기관 프로그램">공공기관 프로그램 (공무원·공기업 행정 혁신)</option>
                        </optgroup>
                        <optgroup label="국비과정 (국민내일배움카드 지원)">
                          <option value="컴퓨터활용 1급">컴퓨터활용 1급 (단기 실기·필기 마스터)</option>
                          <option value="ITQ 마스터">ITQ 마스터 (한글·엑셀·PPT 3개 부문)</option>
                          <option value="디자인 과정">디자인 과정 (포토샵·일러스트·상세페이지)</option>
                        </optgroup>
                        <optgroup label="기타">
                          <option value="종합 커리어 로드맵 상담">종합 커리어 로드맵 상담</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>상담 희망 시간</span>
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:border-slate-900 focus:ring-slate-200 transition-all cursor-pointer"
                      >
                        <option value="오전 (10:00~12:00)">오전 (10:00 ~ 12:00)</option>
                        <option value="오후 (14:00~17:00)">오후 (14:00 ~ 17:00)</option>
                        <option value="저녁 (18:00~19:30)">저녁 (18:00 ~ 19:30)</option>
                        <option value="언제든 상관없음">언제든 연락 가능</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>문의 내용 및 요청사항 *</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="수강 희망 시기, 현재 개발/컴퓨터 역량 수준, 출강 인원 등 궁금하신 점을 편하게 남겨주세요."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-200 bg-red-50/20'
                          : 'border-slate-300 focus:border-slate-900 focus:ring-slate-200'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Privacy Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                      <input
                        type="checkbox"
                        checked={formData.agreedPrivacy}
                        onChange={(e) => {
                          setFormData({ ...formData, agreedPrivacy: e.target.checked });
                          if (errors.agreedPrivacy) setErrors({ ...errors, agreedPrivacy: undefined });
                        }}
                        className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span>
                        [필수] 교육 상담 안내 및 일정 조율을 위한 개인정보(이름, 연락처, 이메일) 수집 및 이용에 동의합니다.
                      </span>
                    </label>
                    {errors.agreedPrivacy && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.agreedPrivacy}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-base font-bold rounded-xl shadow-md active:scale-[0.99] transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>상담 신청서 저장 중...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-amber-400" />
                          <span>상담 신청서 제출하기</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2.5">
                      제출된 상담 내용은 안전하게 암호화되어 브라우저 로컬 저장소에 보관됩니다.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
