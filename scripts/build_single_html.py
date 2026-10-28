import base64

with open('dist_standalone/hero.txt', 'r') as f: hero_b64 = f.read()
with open('dist_standalone/about.txt', 'r') as f: about_b64 = f.read()
with open('dist_standalone/course.txt', 'r') as f: course_b64 = f.read()

template = """<!DOCTYPE html>
<html lang="ko" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>비트교육컨설팅 | 개발자로의 도약, 실무의 답을 제안합니다</title>
  <meta name="description" content="개발자로의 도약과 실무의 답을 제안하는 실무 중심 IT 및 AI 교육 컨설팅 비트교육컨설팅" />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;700;800&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: 'Noto Sans KR', 'Plus Jakarta Sans', system-ui, sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 antialiased selection:bg-amber-100 selection:text-amber-900">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    const HERO_IMG = "__HERO_IMG__";
    const ABOUT_IMG = "__ABOUT_IMG__";
    const COURSE_IMG = "__COURSE_IMG__";

    const COURSES = [
      {
        id: 'ai-practical',
        category: 'regular',
        categoryLabel: '일반과정 · 직무 혁신',
        title: 'AI활용 교육',
        shortDesc: 'ChatGPT, Claude, 생성형 AI 도구를 실무 업무 및 개발 워크플로우에 즉시 접목하는 실전 과정',
        targetAudience: '업무 효율성을 극대화하려는 직장인, 개발 생산성을 높이고자 하는 주니어 개발자',
        duration: '4주 (총 24시간)',
        format: '온·오프라인 하이브리드',
        highlights: ['업무 시간 70% 단축 실전 프롬프트 템플릿 50종', '사내 업무 자동화 파이프라인 실습', '문서·기획서 AI 초안 검증'],
        curriculum: ['1주차: 생성형 AI 최신 패러다임과 프롬프트 핵심', '2주차: 직무별 실무 워크플로우 자동화', '3주차: 개발 생산성 향상(코드 어시스턴트)', '4주차: 나만의 맞춤형 GPTs 및 워크플로우']
      },
      {
        id: 'ai-customized',
        category: 'regular',
        categoryLabel: '일반과정 · 기업 맞춤',
        title: '맞춤형 AI 교육',
        shortDesc: '기업 및 조직의 실제 비즈니스 도메인 데이터와 과제에 맞춘 특화 AI 솔루션 교육',
        targetAudience: '기업 R&D팀, IT 기획팀, 사내 DX 전환 추진 부서, 전사 AI 도입 기업',
        duration: '기업 맞춤 설계 (1일~8주)',
        format: '사내 방문 출강 / 온라인 라이브',
        highlights: ['사전 기술 진단 및 맞춤형 커리큘럼 설계', '사내 데이터 기반 RAG 시스템 구축 실습', '1:1 테크 멘토링 지원'],
        curriculum: ['진단: 사내 업무 프로세스 분석 및 AI 도입 영역 도출', '기초: 특화 데이터 전처리 및 LLM API 연동', '심화: 사내 지식베이스 연계 사내 챗봇 구축', '실전: 팀별 실무 과제 파일럿 구현']
      },
      {
        id: 'public-institution',
        category: 'regular',
        categoryLabel: '일반과정 · 공공/기관',
        title: '공공기관 프로그램',
        shortDesc: '공무원, 공기업 및 공공기관 재직자를 위한 정부 가이드라인 준수 디지털 역량 강화 과정',
        targetAudience: '중앙부처, 지자체, 공기업 재직자 및 디지털 전담 부서',
        duration: '단기 특강 (1~3일) 또는 장기 위탁',
        format: '공공기관 전용 교육장 출강',
        highlights: ['공공부문 AI 활용 보안 가이드라인 철저 반영', '공공데이터 포털 API 활용 및 통계 시각화', '스마트 행정 보고서 효율적 작성'],
        curriculum: ['모듈 1: 디지털 정부 혁신 트렌드와 보안 윤리', '모듈 2: 공공 행정 보고서 작성과 AI 협업', '모듈 3: 공공데이터 분석 및 시각화 대시보드', '모듈 4: 우수 행정 사례 벤치마킹 워크숍']
      },
      {
        id: 'com-specialist',
        category: 'national_subsidy',
        categoryLabel: '국비과정 · 국가기술자격',
        title: '컴퓨터활용 1급',
        shortDesc: '공기업·대기업 채용 가산점 1순위! 고급 엑셀 함수·매크로와 액세스 데이터베이스 완벽 대비',
        targetAudience: '취업 준비생, 이직 희망자, 공기업/공무원 가산점 수험생',
        duration: '6주 (총 90시간)',
        format: '오프라인 전산 실습실',
        highlights: ['최신 출제 기준 반영 실기 집중 실습', '자주 틀리는 함수(LOOKUP, 배열수식) 집중 공략', '기출 모의고사 무제한 채점 및 1:1 첨삭'],
        curriculum: ['1단계: 컴퓨터 일반 & 스프레드시트 필기 핵심 정리', '2단계: 엑셀 고급 필터, 조건부 서식, 계산작업 함수', '3단계: 피벗테이블, 매크로 및 차트 작성 실무', '4단계: 액세스 쿼리, 폼, 보고서 완벽 구축']
      },
      {
        id: 'itq-master',
        category: 'national_subsidy',
        categoryLabel: '국비과정 · 국가공인자격',
        title: 'ITQ 마스터',
        shortDesc: '한글, 엑셀, 파워포인트 3과목 모두 A등급(OA 마스터) 취득을 목표로 하는 기초 탄탄 사무 실무 과정',
        targetAudience: '컴퓨터 기초가 부족한 취업 준비생, 사무직 입문자',
        duration: '4주 (총 60시간)',
        format: '오프라인 전산 실습실',
        highlights: ['타자부터 문서 서식까지 비전공자 맞춤 눈높이 지도', '실제 기업 사무 행정 양식 템플릿 실습', 'OA Master 3과목 합격률 95% 이상'],
        curriculum: ['1주차: 아래한글(HWP) 표, 차트, 수식 공문서 작성', '2주차: MS 엑셀 데이터 입력, 함수 및 피벗테이블', '3주차: 파워포인트 마스터 슬라이드, 다이어그램', '4주차: 기출문제 시간 내 풀이 훈련 및 A등급 완성']
      },
      {
        id: 'practical-design',
        category: 'national_subsidy',
        categoryLabel: '국비과정 · 실무 그래픽',
        title: '디자인 과정',
        shortDesc: '포토샵, 일러스트레이터 기초부터 실무 카드뉴스, 상세페이지 제작 및 포트폴리오 완성',
        targetAudience: '예비 디자이너, 마케팅/MD 희망자, SNS 콘텐츠 제작자',
        duration: '8주 (총 120시간)',
        format: '오프라인 실습 & 온라인 크리틱',
        highlights: ['Adobe Photoshop & Illustrator 최신 버전 실습', '상세페이지 기획 및 타이포그래피 배색 이론', '개인 포트폴리오 완성 및 1:1 멘토링'],
        curriculum: ['1~2주차: 포토샵 기초 툴, 사진 보정 및 합성', '3~4주차: 일러스트레이터 벡터 드로잉 및 아이콘 디자인', '5~6주차: 카드뉴스, 웹 배너 실무 콘텐츠 제작', '7~8주차: 이커머스 상세페이지 기획 및 포트폴리오 감수']
      }
    ];

    const STATS = [
      { val: '98.4%', label: '수강생 만족도', desc: '자체 강의 평가 기준' },
      { val: '15년+', label: '실무 교육 노하우', desc: 'IT·AI 전문 커리큘럼' },
      { val: '500+회', label: '기업·공공기관 출강', desc: '맞춤형 솔루션 제공' },
      { val: '94.2%', label: '국비 자격증 합격률', desc: '1급 및 마스터 기준' }
    ];

    function App() {
      const [category, setCategory] = useState('all');
      const [expandedId, setExpandedId] = useState(null);
      const [formData, setFormData] = useState({
        name: '', phone: '', email: '', courseName: 'AI활용 교육',
        inquiryType: 'individual', preferredTime: '오후 (14:00~17:00)',
        message: '', agreed: true
      });
      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(null);
      const [isHistoryOpen, setIsHistoryOpen] = useState(false);
      const [consultations, setConsultations] = useState([]);

      useEffect(() => {
        try {
          const raw = localStorage.getItem('bit_consultation_inquiries_v1');
          if (raw) setConsultations(JSON.parse(raw));
        } catch(e) {}
      }, []);

      const filteredCourses = COURSES.filter(c => category === 'all' || c.category === category);

      const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      };

      const selectCourseForForm = (courseName) => {
        setFormData(prev => ({ ...prev, courseName }));
        scrollTo('consultation');
      };

      const handlePhone = (e) => {
        let v = e.target.value.replace(/[^0-9]/g, '');
        if (v.length > 11) v = v.slice(0, 11);
        if (v.length > 7) v = v.slice(0,3) + '-' + v.slice(3,7) + '-' + v.slice(7);
        else if (v.length > 3) v = v.slice(0,3) + '-' + v.slice(3);
        setFormData({ ...formData, phone: v });
      };

      const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = '성함을 입력해 주세요.';
        if (!formData.phone.trim() || formData.phone.length < 12) errs.phone = '올바른 휴대폰 번호를 입력해 주세요.';
        if (!formData.email.trim() || !formData.email.includes('@')) errs.email = '유효한 이메일을 입력해 주세요.';
        if (!formData.message.trim() || formData.message.trim().length < 5) errs.message = '문의 내용은 5자 이상 작성해 주세요.';
        if (!formData.agreed) errs.agreed = '개인정보 수집 동의가 필요합니다.';
        setErrors(errs);
        return Object.keys(errs).length === 0;
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const now = new Date();
        const dateStr = now.getFullYear() + '. ' + String(now.getMonth()+1).padStart(2,'0') + '. ' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
        const record = {
          id: 'inquiry-' + Date.now().toString(36),
          ...formData,
          createdAtFormatted: dateStr,
          status: 'pending'
        };
        const updated = [record, ...consultations];
        setConsultations(updated);
        try { localStorage.setItem('bit_consultation_inquiries_v1', JSON.stringify(updated)); } catch(e) {}
        setSubmitted(record);
      };

      return (
        <div className="min-h-screen flex flex-col font-sans">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between gap-6">
              <a href="#" className="flex items-center gap-2.5 font-bold text-xl text-slate-900 tracking-tight">
                <span className="w-9 h-9 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg">B</span>
                <span>비트교육컨설팅</span>
              </a>
              <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                <button onClick={() => scrollTo('about')} className="hover:text-slate-900 transition-colors">회사소개</button>
                <button onClick={() => scrollTo('courses')} className="hover:text-slate-900 transition-colors">교육과정</button>
                <button onClick={() => scrollTo('testimonials')} className="hover:text-slate-900 transition-colors">수강후기</button>
                <button onClick={() => scrollTo('consultation')} className="hover:text-slate-900 transition-colors">상담신청</button>
              </nav>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsHistoryOpen(true)} className="px-3 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                  신청내역 ({consultations.length})
                </button>
                <button onClick={() => scrollTo('consultation')} className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm transition-all">
                  상담 신청하기
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1">
            {/* Hero */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-100/80 via-slate-50 to-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7">
                    <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-4">
                      비트교육컨설팅 · 실무 중심 IT & AI 교육 전문 기관
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-6">
                      개발자로의 도약,<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-amber-700">
                        실무의 답을 제안합니다.
                      </span>
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                      단순 암기식 강의가 아닌 현업에서 마주하는 진짜 문제를 해결하는 교육.
                      비전공자의 기초 다지기부터 현업 개발자의 AI 워크플로우 혁신까지,
                      비트교육컨설팅이 신뢰할 수 있는 실무 로드맵을 제공합니다.
                    </p>
                    <div className="flex flex-wrap gap-3.5 mb-8">
                      <button onClick={() => scrollTo('consultation')} className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-md transition-all">
                        지금 상담 신청하기 →
                      </button>
                      <button onClick={() => scrollTo('courses')} className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-300 rounded-xl transition-all">
                        교육 과정 보기
                      </button>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
                      <img src={HERO_IMG} alt="비트교육컨설팅 워크숍" className="w-full h-80 sm:h-96 object-cover" />
                    </div>
                  </div>
                </div>
                {/* 4 Stats */}
                <div className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {STATS.map(s => (
                    <div key={s.label}>
                      <div className="text-3xl font-extrabold text-slate-900">{s.val}</div>
                      <div className="text-sm font-semibold text-slate-700 mt-1">{s.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About */}
            <section id="about" className="py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4">
                <div className="max-w-3xl mb-14">
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">회사 소개</div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    사람을 향한 따뜻함과 기술의 깊이로,<br />실무 역량의 새로운 기준을 만듭니다.
                  </h2>
                  <p className="mt-4 text-slate-600 leading-relaxed text-sm sm:text-base">
                    비트교육컨설팅은 변화가 빠른 IT 기술 생태계 속에서 길을 잃지 않도록, 
                    비전공자의 첫 코딩부터 기업의 생성형 AI 도입까지 단계별 맞춤형 교육 솔루션을 제공합니다.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">“왜 비트교육컨설팅인가?”</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        기술은 차갑지만 교육은 따뜻해야 합니다. 누구에게나 배움은 막막할 수 있습니다.
                        비트교육컨설팅은 10년 차 이상 시니어 엔지니어들의 1:1 눈높이 피드백과 함께 실패 없는 성장을 약속합니다.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-900 mb-1">소수 정예 밀착 코칭</div>
                        <div className="text-slate-500">개별 진도 맞춤 첨삭</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="font-bold text-slate-900 mb-1">국비지원 인증 과정</div>
                        <div className="text-slate-500">내일배움카드 지원</div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-6">
                    <img src={ABOUT_IMG} alt="멘토링 현장" className="rounded-2xl border border-slate-200 shadow-md w-full h-80 object-cover" />
                  </div>
                </div>
              </div>
            </section>

            {/* Courses */}
            <section id="courses" className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div>
                    <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">교육과정</div>
                    <h2 className="text-3xl font-extrabold text-slate-900">실무 역량과 자격을 완성하는 교육과정</h2>
                  </div>
                  <div className="flex gap-1 bg-slate-200 p-1.5 rounded-xl">
                    {['all', 'regular', 'national_subsidy'].map(cat => (
                      <button key={cat} onClick={() => setCategory(cat)} className={'px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ' + (category === cat ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600')}>
                        {cat === 'all' ? '전체' : cat === 'regular' ? '일반과정 (AI·공공)' : '국비과정 (컴활·디자인)'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map(c => {
                    const isExp = expandedId === c.id;
                    return (
                      <div key={c.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div>
                          <div className="text-xs font-bold text-amber-700 mb-2">{c.categoryLabel} · {c.format}</div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{c.title}</h3>
                          <p className="text-xs text-slate-600 mb-4 leading-relaxed">{c.shortDesc}</p>
                          <div className="space-y-1.5 mb-4 text-xs text-slate-700">
                            {c.highlights.map((h, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <span className="text-emerald-600 font-bold">✓</span> <span>{h}</span>
                              </div>
                            ))}
                          </div>
                          {isExp && (
                            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1 animate-in fade-in">
                              <div className="font-bold text-slate-800 mb-1">세부 커리큘럼</div>
                              {c.curriculum.map((item, idx) => <div key={idx}>• {item}</div>)}
                            </div>
                          )}
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                          <button onClick={() => setExpandedId(isExp ? null : c.id)} className="text-xs text-slate-500 font-semibold hover:text-slate-800">
                            {isExp ? '커리큘럼 닫기' : '커리큘럼 보기'}
                          </button>
                          <button onClick={() => selectCourseForForm(c.title)} className="px-3.5 py-2 text-xs font-bold bg-slate-900 hover:bg-amber-600 text-white rounded-lg transition-colors">
                            상담 신청
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">수강 후기</div>
                  <h2 className="text-3xl font-extrabold text-slate-900">함께 성장한 분들의 생생한 이야기</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">“비전공자로 개발 공부를 시작했는데, 실무 맞춤 AI 교육으로 코드 작성 속도가 두 배 빨라졌습니다.”</p>
                    <div className="font-bold text-sm text-slate-900">김태윤 님 (주니어 개발자)</div>
                    <div className="text-xs text-amber-700 mt-0.5">AI활용 교육 수강</div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">“공공데이터와 AI 행정 교육을 의뢰했습니다. 보안 가이드라인을 완벽히 지킨 명쾌한 실습 덕분에 만족도가 최고였습니다.”</p>
                    <div className="font-bold text-sm text-slate-900">박서현 팀장 (공공기관 교육담당관)</div>
                    <div className="text-xs text-amber-700 mt-0.5">공공기관 프로그램 수강</div>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-sm text-slate-700 leading-relaxed mb-4">“국비지원으로 비용 부담 없이 컴활 1급을 4주 만에 취득했습니다. 기출 첨삭이 취업 가산점에 큰 무기가 되었습니다.”</p>
                    <div className="font-bold text-sm text-slate-900">이준호 님 (공기업 취업)</div>
                    <div className="text-xs text-amber-700 mt-0.5">컴퓨터활용 1급 수강</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Consultation Form */}
            <section id="consultation" className="py-20 bg-slate-50 border-b border-slate-200">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">상담 신청</div>
                  <h2 className="text-3xl font-extrabold text-slate-900">내게 꼭 맞는 교육 로드맵 상담</h2>
                  <p className="text-xs text-slate-500 mt-2">직통 전화: 02-555-8930 (평일 09:00 ~ 18:00)</p>
                </div>

                {submitted ? (
                  <div className="bg-white border-2 border-emerald-400 rounded-2xl p-8 text-center">
                    <div className="text-emerald-600 text-3xl font-bold mb-2">✓</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{submitted.name} 님의 상담 신청이 접수되었습니다!</h3>
                    <p className="text-sm text-slate-600 mb-6">입력하신 연락처({submitted.phone})로 24시간 이내에 전문 컨설턴트가 연락드립니다.</p>
                    <button onClick={() => setSubmitted(null)} className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold">
                      추가 상담 신청하기
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">성함 / 담당자명 *</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm" placeholder="예: 홍길동" />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">연락처 (휴대폰) *</label>
                        <input type="tel" value={formData.phone} onChange={handlePhone} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-mono" placeholder="010-0000-0000" />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">이메일 주소 *</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm" placeholder="name@example.com" />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">관심 교육 과정</label>
                        <select value={formData.courseName} onChange={e => setFormData({...formData, courseName: e.target.value})} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm">
                          <option value="AI활용 교육">AI활용 교육 (ChatGPT·실무)</option>
                          <option value="맞춤형 AI 교육">맞춤형 AI 교육 (기업 DX·RAG)</option>
                          <option value="공공기관 프로그램">공공기관 프로그램</option>
                          <option value="컴퓨터활용 1급">컴퓨터활용 1급 (국비지원)</option>
                          <option value="ITQ 마스터">ITQ 마스터</option>
                          <option value="디자인 과정">디자인 과정 (포토샵·일러스트)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">문의 내용 *</label>
                      <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm" placeholder="궁금하신 점을 남겨주세요." />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>
                    <div className="pt-2">
                      <label className="flex items-center gap-2 text-xs text-slate-600">
                        <input type="checkbox" checked={formData.agreed} onChange={e => setFormData({...formData, agreed: e.target.checked})} />
                        <span>개인정보 수집 및 이용에 동의합니다.</span>
                      </label>
                      {errors.agreed && <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>}
                    </div>
                    <button type="submit" className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm shadow-md transition-all">
                      상담 신청서 제출하기
                    </button>
                  </form>
                )}
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6">
              <div>
                <div className="text-white font-bold text-base mb-2">비트교육컨설팅</div>
                <div>대표이사: 김도현 · 사업자등록번호: 214-88-01928</div>
                <div>주소: 서울시 서초구 서초대로 397 (비트타워 6층) · 직통전화: 02-555-8930</div>
              </div>
              <div className="text-slate-500 self-end md:self-auto">
                © 2026 비트교육컨설팅 All rights reserved.
              </div>
            </div>
          </footer>

          {/* History Modal */}
          {isHistoryOpen && (
            <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[80vh] flex flex-col shadow-2xl">
                <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
                  <div className="font-bold text-base text-slate-900">상담 신청 내역 ({consultations.length}건)</div>
                  <button onClick={() => setIsHistoryOpen(false)} className="font-bold text-slate-400 hover:text-slate-700">✕</button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3">
                  {consultations.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400">저장된 상담 내역이 없습니다.</div>
                  ) : (
                    consultations.map(c => (
                      <div key={c.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{c.name}</span>
                          <span className="text-amber-700">{c.courseName}</span>
                        </div>
                        <div className="text-slate-500">연락처: {c.phone} | 이메일: {c.email}</div>
                        <div className="text-slate-700 bg-white p-2 rounded border border-slate-100">{c.message}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{c.createdAtFormatted}</div>
                      </div>
                    ))
                  )}
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button onClick={() => setIsHistoryOpen(false)} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold">
                    닫기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
  </script>
</body>
</html>
"""

output = template.replace('__HERO_IMG__', hero_b64).replace('__ABOUT_IMG__', about_b64).replace('__COURSE_IMG__', course_b64)

with open('dist_standalone/index.html', 'w', encoding='utf-8') as f:
    f.write(output)

print('Generated dist_standalone/index.html successfully!')
