import { IdeaMapping } from '../types';

const ideaMapping: IdeaMapping[] = [
  { 
    keyword: ['sns', '소셜', '커뮤니티', '게시판', 'social', 'community'], 
    stack: 'React, Node.js(Express), MongoDB', 
    features: ['회원가입/로그인 및 인증 관리 (Auth)', '게시물 CRUD (생성, 읽기, 업데이트, 삭제)', '댓글 및 좋아요 기능', '사용자 프로필 페이지', '실시간 알림 (Socket.io)'] 
  },
  { 
    keyword: ['도구', '툴', '계산기', '변환', '유틸리티', 'tool', 'calc'], 
    stack: 'HTML, CSS, Vanilla JavaScript', 
    features: ['직관적인 입력 폼 구현', '클라이언트 측 계산 로직', '입력 유효성 검사', '결과 실시간 반영', '반응형 디자인'] 
  },
  { 
    keyword: ['포트폴리오', '블로그', '개인', 'portfolio', 'blog'], 
    stack: 'Next.js (SSG/SSR), Tailwind CSS', 
    features: ['정적 페이지 생성 (SEO 최적화)', '마크다운 기반 포스팅 시스템', '테마/디자인 커스터마이징', '연락처/About 섹션', '반응형 레이아웃 및 빠른 로딩 속도'] 
  },
  { 
    keyword: ['쇼핑몰', 'e커머스', '마켓', 'shop', 'commerce'], 
    stack: 'Vue.js, Firebase (or MERN Stack)', 
    features: ['상품 목록 및 상세 페이지', '장바구니 기능', '결제 연동 (Stripe/Toss)', '상품 검색 및 필터링', '관리자 상품 등록 페이지'] 
  },
  { 
    keyword: ['게임', '인터랙티브', '애니메이션', 'game'], 
    stack: 'HTML5 Canvas, Three.js, Vanilla JS', 
    features: ['게임 로직 구현 및 상태 관리', '사용자 입력 처리', '애니메이션 및 시각 효과', '점수 기록/순위표', '모바일 터치 최적화'] 
  },
];

const defaultStack = 'React (Vite), Tailwind CSS, Firebase (Auth/DB)';
const defaultFeatures = [
  '사용자 친화적인 인터페이스 (UI/UX)',
  '기본적인 페이지 라우팅 구현',
  '데이터 저장 및 불러오기 (Mock Data 또는 DB 연동)',
  '완벽한 반응형 웹 디자인',
  '에러 처리 및 로딩 상태 관리'
];

export const generateStaticPrompt = (idea: string): string => {
  const userIdea = idea.trim();
  const ideaLower = userIdea.toLowerCase();

  const mapping = ideaMapping.find(m => m.keyword.some(k => ideaLower.includes(k)));

  const techStack = mapping ? mapping.stack : defaultStack;
  const coreFeatures = mapping ? mapping.features : defaultFeatures;
  
  let uiConcept = '미니멀리즘 (Minimalism) 컨셉. 사용자 경험(UX)을 최우선으로 하여, 명확한 CTA 버튼과 충분한 여백을 활용합니다.';
  if (ideaLower.includes('사진') || ideaLower.includes('갤러리') || ideaLower.includes('photo')) {
    uiConcept = '비주얼 포커스 (Visual Focus). 이미지 및 콘텐츠를 전면에 내세우고, 그리드 레이아웃을 사용하며, 부드러운 전환 효과를 적용합니다.';
  } else if (ideaLower.includes('도구') || ideaLower.includes('관리') || ideaLower.includes('admin')) {
    uiConcept = '데이터 효율 (Data Efficiency). 다크 모드를 기본으로, 명확한 색상 구분을 통해 데이터 가독성을 높이고 복잡한 정보를 깔끔하게 정리합니다.';
  }

  const featuresList = coreFeatures.map((f, index) => `    ${index + 1}. **${f}**`).join('\n');

  return `## 🧑‍💻 프로젝트 오더: [${userIdea}] 개발 지시서
### 🎯 AI 역할 설정 (페르소나)
당신은 **시니어 풀스택 개발자**이며, 특히 **${techStack.split(',')[0].trim()}** 개발에 능숙합니다. 제공된 요구사항을 바탕으로 **최고 수준의 클린 코드**를 작성하는 것을 목표로 합니다.
---
### 📝 프로젝트 개요 (PRD 요약)
* **프로젝트명**: 사용자 맞춤형 웹 애플리케이션 (가칭)
* **사용자 아이디어**: ${userIdea}
* **목표**: 사용자 아이디어를 구현하는 **단일 페이지 웹 애플리케이션(SPA)**을 개발합니다.
---
### 🛠️ 기술 스택 및 환경
* **프론트엔드**: **${techStack.split(',')[0].trim()}** (SPA 구조)
* **핵심 라이브러리/프레임워크**: ${techStack}
* **스타일링**: ${techStack.includes('Tailwind') ? 'Tailwind CSS' : 'CSS-in-JS 또는 바닐라 CSS'}를 활용하여 현대적이고 깔끔한 디자인을 구현합니다.
* **배포/데이터**: (선택적) Mock Data 또는 Firebase/Supabase 연동을 고려합니다.
---
### 🔑 핵심 기능 요구사항 (5가지 필수)
다음 5가지 기능을 최우선으로 구현해야 합니다:
${featuresList}
---
### 🎨 UI/UX 및 디자인 가이드
* **디자인 컨셉**: **${uiConcept}**
* **컬러 팔레트**: 다크 모드 기반 (배경: #0D1117 계열), 메인 컬러: #CCFF00 (네온 라임), 보조 컬러: #00FFFF (네온 블루).
* **반응형**: 모든 화면 크기(Desktop, Tablet, Mobile)에서 완벽하게 작동하는 **반응형 웹**을 구현해야 합니다.
---
### ⚙️ 개발 진행 단계별 지시사항
**아래의 4단계 지시사항을 반드시 순서대로 따르고, 각 단계가 완료될 때마다 다음 단계로 넘어가기 전에 사용자에게 확인을 요청하세요.**

1.  **[기획 및 아키텍처]**: 프로젝트의 **컴포넌트 구조 (트리 다이어그램)**와 **데이터 모델(JSON 스키마)**을 설계하고 제시하세요.
2.  **[핵심 구조 코드]**: 기술 스택에 맞는 **최소 기능 구현(Minimal Viable Product, MVP)**을 위한 HTML, CSS, JavaScript(또는 ${techStack.split(',')[0].trim()} 컴포넌트)의 **전체 코드**를 작성합니다.
3.  **[기능 상세 구현]**: 1단계에서 제시한 나머지 핵심 기능들을 순차적으로 추가하고, UI/UX 가이드에 따라 스타일을 완성합니다.
4.  **[최종 검토 및 수정]**: 작성된 코드에 대한 **셀프 코드 리뷰**를 진행하고, 잠재적인 버그나 성능 이슈를 개선할 수 있는 방안을 제시합니다.
---
### ⚠️ 제약 및 규칙
* **모든 출력은 요청 시까지 전체 코드 블록(Triple Backticks)으로만 제공**하며, 주석을 통해 코드 설명을 충분히 제공해야 합니다.
* 사용자 피드백을 수용하여 언제든지 유연하게 코드 수정 및 개선이 가능합니다.
`;
};