export type CourseCategory = 'all' | 'regular' | 'national_subsidy';

export interface CourseItem {
  id: string;
  category: 'regular' | 'national_subsidy';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string;
  duration: string;
  format: string; // e.g., '온·오프라인 병행' or '오프라인 실습'
  highlights: string[];
  curriculum: string[];
  recommendedFor: string[];
  badgeText?: string;
}

export interface ConsultationRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  courseCategory: string;
  courseName: string;
  inquiryType: 'individual' | 'corporate' | 'institution';
  preferredTime: string;
  message: string;
  agreedPrivacy: boolean;
  createdAt: string;
  createdAtFormatted: string;
  status: 'pending' | 'in_progress' | 'completed';
  adminNotes?: string;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  email: string;
  courseCategory: string;
  courseName: string;
  inquiryType: 'individual' | 'corporate' | 'institution';
  preferredTime: string;
  message: string;
  agreedPrivacy: boolean;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  courseName?: string;
  message?: string;
  agreedPrivacy?: string;
}
