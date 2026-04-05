import { type ButtonType } from './portfolio-data'

export const ACCENT = '#0077b6'

export const CHAT_BUTTONS: { type: ButtonType }[] = [
  { type: 'info' }, { type: 'skills' }, { type: 'projects' }, { type: 'career' },
]

export const SKILLS = [
  'HTML5', 'CSS3', 'SCSS', 'JavaScript', 'jQuery',
  'React', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator',
]

export const WORKS = [
  {
    image: '/images/pf_open.webp',
    title: 'stud.io 플랫폼 소개 페이지',
    url: 'open.kma.or.kr',
    desc: '자사 LXP 플랫폼 stud.io를 소개하는 마이크로페이지. \n플랫폼의 특장점을 직관적으로 전달하는 구조로 설계했습니다.',
    tags: ['마이크로페이지', '랜딩'],
    portrait: false,
  },
  {
    image: '/images/pf_studio.webp',
    title: 'stud.io LXP 플랫폼',
    url: 'studio.kma.or.kr',
    desc: '기업 맞춤형 교육 콘텐츠 스트리밍 플랫폼. \n백엔드 개발자 1명과 함께 LXP 솔루션을 자체 개발하고 운영 중입니다.',
    tags: ['플랫폼', 'React', '자체개발'],
    portrait: false,
  },
  {
    image: '/images/pf_ai.webp',
    title: 'KMA AI 교육사업 마이크로페이지',
    url: 'ai.kma.or.kr',
    desc: 'AI 교육사업 부서의 서비스를 소개하는 마이크로페이지. \n콘텐츠 구조 설계부터 퍼블리싱까지 단독 진행했습니다.',
    tags: ['마이크로페이지', 'UI/UX'],
    portrait: false,
  },
  {
    image: '/images/pf_mem.webp',
    title: 'KMA 회원사 전용 페이지',
    url: 'membership.kma.or.kr',
    desc: '한국능률협회 회원사 대상 전용 페이지. \n다양한 기기 환경을 고려한 반응형 퍼블리싱 작업을 진행했습니다.',
    tags: ['반응형', '퍼블리싱'],
    portrait: false,
  },
  {
    image: '/images/pf_compfy.webp',
    title: 'Compfy',
    url: 'compfy.netlify.app',
    desc: '이미지 포맷 변환과 용량 압축을 브라우저에서 바로 처리할 수 있는 웹툴. \n사이드 프로젝트로 기획·개발했습니다.',
    tags: ['사이드프로젝트', '웹툴'],
    portrait: false,
  },
]

export const HOW_I_WORK = [
  {
    num: '01',
    title: '사용자의 여정',
    desc: '페이지를 만들 때마다 기존 사용자 흐름을 먼저 분석하고, 어디서 어떤 문제가 발생하는지 파악합니다. 랜딩페이지와 마이크로페이지 제작 경험처럼, 유입부터 전환까지 실제로 작동하는 구조를 설계하며 불필요한 클릭을 줄여왔습니다. 결과적으로 사용자 전환율이 개선되는 걸 확인할 수 있었습니다.',
  },
  {
    num: '02',
    title: '사용자 경험이 수치로 증명되도록 만듭니다',
    desc: '단순히 퍼포먼스 지표를 맞추는 것이 아니라, 실제 사용자 환경에서 느껴지는 속도와 안정성을 개선해왔습니다. 렌더링 구조를 정비하고 리소스를 최적화해 Core Web Vitals와 PageSpeed  점수를 함께 끌어올렸으며, 모든 개선이 사용자 경험 향상으로 이어지도록 설계합니다.',
  },
  {
    num: '03',
    title: '기술적 개선은 곧 비즈니스 성과입니다',
    desc: '사수가 없는 환경에서도 전사 채널 5개 이상을 단독으로 관리 및 유지보수 하면서 문제를 정의하고 해결하는 과정을 반복해왔습니다. 서비스 구조를 이해하고, 문제의 원인을 파악하며, 어떻게 개선을 해야하는지 항상 고민해왔습니다. 기술적 개선이 실제 사용자 경험과 비즈니스 성과로 이어지도록 하는 것을 목표로 하겠습니다.',
  },
  {
    num: '04',
    title: '다양한 환경에서의 접근성',
    desc: '다양한 기기 환경에서 일관된 경험을 제공하기 위해 접근성을 지속적으로 개선해왔습니다. 사내 전사 채널과 랜딩페이지를 단독 관리하며, 여러가지 기기와 브라우저에서 테스트하며 접근성 문제를 발견하고 개선해왔습니다. 사용자 경험이 모든 환경에서 일관되도록 하는 것을 중요하게 생각합니다.',
  },
]

export const CAREER = [
  {
    company: '한국능률협회',
    role: '마케팅팀 · 프론트엔드 개발자',
    period: '2024.08 — 현재',
    desc: '사내 첫 퍼블리셔로 입사. 전사 채널 5개 이상 단독 운영, 신규 LXP 플랫폼 개발, Core Web Vitals 개선.',
    current: true,
  },
  {
    company: '토브더가먼트메이커',
    role: '콘텐츠기획 · 반응형웹',
    period: '2023.01 — 2023.09',
    desc: '자사 홈페이지 프론트엔드 개발 및 유지보수.',
    current: false,
  },
  {
    company: '플랜트란스',
    role: '개발기획 · 반응형웹 · PM',
    period: '2021.08 — 2022.12',
    desc: '자사 홈페이지 프론트엔드 개발 및 유지보수. PM 겸임.',
    current: false,
  },
]