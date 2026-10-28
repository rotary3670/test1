import { ConsultationRecord, ConsultationFormData } from '../types';

const STORAGE_KEY = 'bit_consultation_inquiries_v1';

const INITIAL_SAMPLE_RECORDS: ConsultationRecord[] = [
  {
    id: 'sample-1',
    name: '김민준',
    phone: '010-3841-9281',
    email: 'minjun.kim@example.com',
    courseCategory: '일반과정',
    courseName: 'AI활용 교육',
    inquiryType: 'individual',
    preferredTime: '오후 (14:00~17:00)',
    message: '비전공자인데 사내 마케팅 업무 자동화와 ChatGPT 프롬프트 작성 역량을 키우고 싶습니다. 주말반 개설 일정이 궁금합니다.',
    agreedPrivacy: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    createdAtFormatted: '2026. 10. 27 11:30',
    status: 'in_progress',
    adminNotes: '10/27 유선 상담 완료, 11월 개강 안내서 이메일 발송'
  },
  {
    id: 'sample-2',
    name: '최영수 (인사교육팀)',
    phone: '010-8291-1049',
    email: 'ys.choi@techcorp.co.kr',
    courseCategory: '일반과정',
    courseName: '맞춤형 AI 교육',
    inquiryType: 'corporate',
    preferredTime: '오전 (10:00~12:00)',
    message: '사내 개발자 25명 대상 맞춤형 AI 및 사내 문서 검색(RAG) 파이프라인 출강 견적 문의드립니다.',
    agreedPrivacy: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    createdAtFormatted: '2026. 10. 28 08:45',
    status: 'pending'
  }
];

export const getStoredConsultations = (): ConsultationRecord[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_RECORDS));
      return INITIAL_SAMPLE_RECORDS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load consultation records from localStorage:', error);
    return [];
  }
};

export const saveConsultation = (formData: ConsultationFormData): ConsultationRecord => {
  const existing = getStoredConsultations();
  const now = new Date();
  
  const formattedDate = `${now.getFullYear()}. ${String(now.getMonth() + 1).padStart(2, '0')}. ${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newRecord: ConsultationRecord = {
    id: 'inquiry-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    ...formData,
    createdAt: now.toISOString(),
    createdAtFormatted: formattedDate,
    status: 'pending'
  };

  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save consultation to localStorage:', err);
  }

  return newRecord;
};

export const deleteConsultationRecord = (id: string): ConsultationRecord[] => {
  const existing = getStoredConsultations();
  const updated = existing.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to delete consultation record:', err);
  }
  return updated;
};

export const updateConsultationStatus = (
  id: string,
  newStatus: ConsultationRecord['status'],
  note?: string
): ConsultationRecord[] => {
  const existing = getStoredConsultations();
  const updated = existing.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: newStatus,
        ...(note !== undefined ? { adminNotes: note } : {})
      };
    }
    return item;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update consultation record:', err);
  }
  return updated;
};

export const clearAllConsultations = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear consultations:', err);
  }
};
