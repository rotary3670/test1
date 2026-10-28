import React, { useState } from 'react';
import { COURSES } from '../data/courses';
import { CourseCategory, CourseItem } from '../types';
import { Clock, Users, ArrowUpRight, ChevronDown, ChevronUp, Check, BookOpen } from 'lucide-react';

interface CoursesProps {
  onSelectCourseForConsultation: (courseName: string, category: '일반과정' | '국비과정') => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourseForConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('all');
  const [expandedCurriculumId, setExpandedCurriculumId] = useState<string | null>(null);

  const filteredCourses = COURSES.filter((course) => {
    if (selectedCategory === 'all') return true;
    return course.category === selectedCategory;
  });

  const toggleCurriculum = (id: string) => {
    setExpandedCurriculumId(expandedCurriculumId === id ? null : id);
  };

  const handleApplyClick = (course: CourseItem) => {
    const catLabel = course.category === 'regular' ? '일반과정' : '국비과정';
    onSelectCourseForConsultation(course.title, catLabel);
  };

  return (
    <section id="courses" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-semibold tracking-wider text-amber-700 uppercase mb-2">
              체계적인 커리큘럼
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              실무 역량과 자격을 완성하는 교육과정
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-2xl">
              실무 혁신을 위한 최신 생성형 AI 일반과정부터 국비지원으로 수강하는 국가공인 자격증 및 디자인 과정까지 맞춤 설계되어 있습니다.
            </p>
          </div>

          {/* Segmented Filter Control (Functional Buttons) */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl self-start md:self-auto shrink-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 과정 ({COURSES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('regular')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'regular'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              일반과정 (AI·기업·공공)
            </button>
            <button
              onClick={() => setSelectedCategory('national_subsidy')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'national_subsidy'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              국비과정 (컴활·ITQ·디자인)
            </button>
          </div>
        </div>

        {/* Featured Workshop Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-12 shadow-md bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-6 sm:p-10">
              <div className="text-xs font-semibold text-amber-700 tracking-wide mb-2 flex items-center gap-2">
                <span>실무 중심 실습 환경</span>
                <span aria-hidden="true">·</span>
                <span>최신 AI 랩실 운영</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance mb-4">
                이론은 짧게, 실습은 깊게.
                <br />
                직무에 바로 쓰는 실습 워크숍
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                비트교육컨설팅의 모든 커리큘럼은 수강생이 직접 키보드를 잡고 결과물을 만들어내는 프로젝트형 실습으로 운영됩니다.
                현업에서 마주하는 에러와 문제를 강사와 함께 1:1로 해결해 보세요.
              </p>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-slate-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  전 좌석 듀얼 모니터 실습실
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  실무 템플릿 및 예제 코드 전원 제공
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  종강 후 질문 지원 Q&A 채널 운영
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 h-64 lg:h-full min-h-[260px] relative">
              <img
                src="/src/assets/images/course_ai_practical_1793177293490.jpg"
                alt="실무 AI 및 IT 실습 워크숍 전경"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isExpanded = expandedCurriculumId === course.id;
            return (
              <div
                key={course.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6 sm:p-7">
                  {/* Category & Badge (Unboxed text with quiet typographic separators) */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className={course.category === 'regular' ? 'text-amber-700' : 'text-blue-700'}>
                        {course.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{course.format}</span>
                    </div>
                    {course.badgeText && (
                      <span className="text-[11px] font-semibold text-slate-600">
                        {course.badgeText}
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-amber-700 transition-colors mb-2">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {course.shortDesc}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-6">
                    {course.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metadata: Duration & Target */}
                  <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{course.targetAudience}</span>
                    </div>
                  </div>

                  {/* Collapsible Curriculum Details */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in duration-200">
                      <div className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span>상세 커리큘럼</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {course.curriculum.map((curr, idx) => (
                          <li key={idx} className="pl-3 relative before:content-[''] before:w-1 before:h-1 before:bg-slate-400 before:rounded-full before:absolute before:left-0 before:top-1.5">
                            {curr}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-500">
                        * 수강 대상 및 기업 요구에 따라 상세 목차는 맞춤 조율 가능합니다.
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleCurriculum(course.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer py-1.5 px-2 rounded-md hover:bg-slate-200/60 transition-colors"
                  >
                    <span>{isExpanded ? '커리큘럼 접기' : '커리큘럼 보기'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleApplyClick(course)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-amber-600 active:scale-[0.98] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                  >
                    <span>상담 신청</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
