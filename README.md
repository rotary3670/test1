# 비트교육컨설팅 (Bit Education Consulting) 랜딩 페이지

> **"개발자로의 도약, 실무의 답을 제안합니다."**  
> 실무 중심 IT 및 생성형 AI 교육 컨설팅 전문 기업 **비트교육컨설팅**의 공식 랜딩 페이지 웹 애플리케이션입니다.

---

## 📌 주요 기능 및 특징

### 1. 헤더 (Header)
- **브랜드 워드마크**: 비트교육컨설팅 시그니처 로고
- **내비게이션 링크**: 회사소개, 교육과정, 수강생 후기, FAQ, 상담신청 부드러운 스크롤 이동
- **상담 신청내역 뱃지**: 브라우저에 저장된 상담 신청 건수를 실시간 표시
- **반응형 모바일 드로어**: 모바일 화면에서도 원활한 탐색 지원

### 2. 히어로 (Hero)
- **메인 카피**: "개발자로의 도약, 실무의 답을 제안합니다."
- **듀얼 CTA 버튼**: `지금 상담 신청하기` (상담 폼 직행), `교육 과정 보기` (커리큘럼 탐색)
- **신뢰 지표**: 수강생 만족도 98.4%, 15년+ 실무 교육 노하우, 500+회 기업·공공기관 출강, 94.2% 국비 자격증 합격률
- **비주얼**: 실무 IT & AI 교육 세미나 현장 고해상도 에셋

### 3. 회사소개 (About)
- **3대 핵심 철학**: 01. 따뜻한 동행 (Warm Mentorship), 02. 검증된 전문성 (Verified Expertise), 03. 실무 중심 교육 (Practical Excellence)
- **1:1 멘토링 비주얼 & 가치 제안**: 비전공자부터 기업 DX 담당자까지 실패 없는 기술 학습 로드맵 제시

### 4. 교육과정 (Curriculum)
- **세그먼트 탭 필터**: 전체 과정 / 일반과정 / 국비과정
- **일반과정 (AI & 공공/기업)**:
  - **AI활용 교육**: ChatGPT, Claude, 실무 프롬프트 엔지니어링, 사내 업무 자동화
  - **맞춤형 AI 교육**: 기업 맞춤 LLM 파이프라인, 사내 문서 RAG 구축 실무
  - **공공기관 프로그램**: 공무원·공기업 행정 혁신, 공공데이터 연계 스마트 오피스
- **국비과정 (국민내일배움카드)**:
  - **컴퓨터활용 1급**: 필기·실기 4주 단기 합격 마스터 (엑셀·액세스)
  - **ITQ 마스터**: 한글, 엑셀, 파워포인트 3개 부문 국가공인 자격 취득
  - **디자인 과정**: 포토샵, 일러스트레이터 실무 그래픽 및 상업용 상세페이지/포트폴리오
- **인터랙티브 기능**: 주차별 세부 커리큘럼 아코디언 토글, `상담 신청` 클릭 시 상담 폼 자동 연동

### 5. 상담 폼 및 LocalStorage 저장 (Lead Capture)
- **실시간 유효성 검증**: 한국어 안내 메시지, 휴대폰 번호 자동 하이픈 포맷, 이메일 정규식 검증
- **접수 완료 피드백**: 접수 번호 및 신청 내용 요약 카드 표시
- **로컬스토리지 영구 보관**: 브라우저 로컬 저장소에 실시간 저장
- **신청내역 관리 모달**: 상태 변경(접수대기/상담진행/상담완료), 개별 삭제, JSON 데이터 내보내기 지원

### 6. 수강생 후기 & FAQ & 푸터 (Reviews, FAQ, Footer)
- 실제 주니어 개발자, 공공기관 교육담당관, 합격생 수기
- 국민내일배움카드 신청 자격, 출강 일정 등 자주 묻는 질문 아코디언
- 사업자등록번호, 대표자, 고객센터 유선번호/이메일, 개인정보처리방침 안내 모달

---

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4
- **Icons & Motion**: Lucide React, Motion
- **Data Persistence**: LocalStorage API
- **Deployment Ready**: Vite Production Build (`dist/`)

---

## 🚀 로컬 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (포트 3000)
npm run dev

# 3. 프로덕션 빌드
npm run build
```

---

## 📦 GitHub 저장소 연동 및 배포 가이드

### 1) 새 GitHub 저장소 생성 및 푸시
```bash
# 1. GitHub에서 새 레포지토리 생성 (예: bit-edu-landing)

# 2. 원격 저장소(Remote) 추가
git remote add origin https://github.com/<본인-GitHub-아이디>/<저장소-이름>.git

# 3. 기본 브랜치 이름을 main으로 설정 후 푸시
git branch -M main
git push -u origin main
```

### 2) GitHub Pages 자동 배포 (선택)
1. `package.json`에 `gh-pages` 패키지 추가 후 배포 스크립트 실행
```bash
npm install gh-pages --save-dev
```
2. `package.json`의 `scripts`에 추가:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
3. 배포 실행:
```bash
npm run deploy
```
4. GitHub 저장소의 **Settings > Pages** 메뉴에서 Source를 `gh-pages` 브랜치로 설정하면 수 분 내에 무료 호스팅 URL이 활성화됩니다.

### 3) Vercel / Netlify 원클릭 연동 (추천)
- GitHub에 코드를 푸시한 후 [Vercel](https://vercel.com) 또는 [Netlify](https://netlify.com)에 로그인하여 해당 저장소를 Import하면 즉시 무료 배포가 완료됩니다.
