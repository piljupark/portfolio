# Portfolio — AI Chat

Next.js 15 + Claude API로 만든 포트폴리오 사이트

## 시작하기

```bash
npm install
cp .env.local.example .env.local
# .env.local에 ANTHROPIC_API_KEY 입력
npm run dev
```

## 구조

```
portfolio/
├── app/
│   ├── api/chat/route.ts   ← Claude 스트리밍 API
│   ├── page.tsx            ← 메인 페이지
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ChatPanel.tsx       ← 채팅 패널 컴포넌트
└── lib/
    └── portfolio-data.ts   ← 내 정보 mock 데이터 ← 여기만 수정!
```

## 내 정보 수정

`lib/portfolio-data.ts`의 `PORTFOLIO_DATA` 객체만 수정하면 됩니다.

## 배포 (Vercel)

```bash
vercel --prod
# 환경변수 ANTHROPIC_API_KEY 설정 필수
```
