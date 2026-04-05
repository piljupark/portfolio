export type ButtonType = 'info' | 'skills' | 'projects' | 'career'

export const TITLES: Record<ButtonType, string> = {
  info:     '자기소개',
  skills:   '기술 스택',
  projects: '프로젝트',
  career:   '경력',
}

export const MOCK_ANSWERS: Record<ButtonType, string[]> = {
  info: [
    '안녕하세요, 박필주입니다. 복잡한 서비스 구조를 사용자 중심으로 풀어내는 퍼블리셔입니다.',
    '현재 한국능률협회에서 메인 홈페이지를 포함한 5개 이상의 전사 채널 및 마이크로페이지를 관리하고 있습니다. 또한, 신규 기업 맞춤형 플랫폼인 stud.io의 프론트엔드 개발을 담당, 유지보수를 하고 있습니다.',
    '단순히 화면을 구현하는 것을 넘어, 사용자 흐름과 서비스 구조를 함께 고려하며 일해왔습니다. 사수 없는 환경에서도 문제를 정의하고 해결하며 서비스 개선을 주도해왔습니다.',
  ],
  skills: [
    'HTML5, CSS3, SCSS, JavaScript, jQuery가 기본 베이스입니다.',
    'React 기반 컴포넌트 개발도 가능하고, 반응형 웹 구현에 특히 강점이 있습니다.',
    '디자인 툴은 Figma, Adobe XD, Photoshop, Illustrator를 사용합니다. 웹디자인기능사 자격증도 보유하고 있으며, 디자인과 개발 사이에서 브릿지 역할을 자주 맡습니다.',
  ],
  projects: [
    '[link]stud.io 플랫폼 소개 페이지|https://open.kma.or.kr[/link]\n자사 LXP 플랫폼 stud.io를 소개하는 마이크로페이지입니다. 플랫폼의 특장점을 직관적으로 전달하는 구조로 설계하였습니다.',
    '[link]stud.io LXP 플랫폼|https://studio.kma.or.kr[/link]\n기업 맞춤형 교육 콘텐츠 스트리밍 플랫폼입니다. 백엔드 개발자 1명과 함께 LXP 솔루션을 자체 개발하고 운영 중입니다.',
    '[link]KMA AI 교육사업 마이크로페이지|https://ai.kma.or.kr[/link]\nAI 교육사업 부서의 서비스를 소개하는 마이크로페이지입니다. 콘텐츠 구조 설계부터 퍼블리싱까지 단독으로 진행하였습니다.',
    '[link]KMA 회원사 전용 페이지|https://membership.kma.or.kr[/link]\n한국능률협회 회원사 대상 전용 페이지입니다. 다양한 기기 환경을 고려한 반응형 퍼블리싱 작업을 진행하였습니다.',
    '[link]Compfy|https://compfy.netlify.app[/link]\n이미지 포맷 변환과 용량 압축을 브라우저에서 바로 처리할 수 있는 웹툴입니다. 사이드 프로젝트로 기획부터 개발까지 직접 진행하였습니다.',
  ],
  career: [
    '총 경력 3년 10개월입니다. 플랜트란스(1년 5개월) → 토브더가먼트메이커(9개월) → 한국능률협회(2024.08~ 재직중) 순으로 일해왔습니다.',
    '세 곳 모두 자사 홈페이지 프론트엔드 개발 및 유지보수가 주 업무였습니다.',
    '현재 한국능률협회에서는 stud.io라는 자체 플랫폼의 프론트엔드 개발을 담당하고, 유지보수를 하고 있습니다. 또한, 해당 플랫폼을 비롯한 전사 홈페이지에 대해서는 UI/UX 개선을 더불어 Lighthouse 성능 점수를 실질적으로 끌어올리고, Core Web Vitals 지표 개선도 직접 주도하였습니다.',
  ],
}