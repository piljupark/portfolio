'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform, type Variants } from 'framer-motion'
import ChatPanel from '@/components/ChatPanel'
import { TITLES } from '@/lib/portfolio-data'
import { ACCENT, CHAT_BUTTONS, SKILLS, WORKS, HOW_I_WORK, CAREER } from '@/lib/page-data'
import { type ButtonType } from '@/lib/portfolio-data'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.08 },
  }),
}

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.08 },
  }),
}

function TypingText() {
  const full1 = '구현을 넘어'
  const full2 = '경험을 잇다'
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [phase, setPhase] = useState<'line1' | 'pause' | 'line2' | 'done'>('line1')

  useEffect(() => {
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    if (phase === 'line1') {
      const tick = () => { i++; setText1(full1.slice(0, i)); if (i < full1.length) timer = setTimeout(tick, 80); else setPhase('pause') }
      timer = setTimeout(tick, 400)
    } else if (phase === 'pause') {
      timer = setTimeout(() => setPhase('line2'), 300)
    } else if (phase === 'line2') {
      const tick = () => { i++; setText2(full2.slice(0, i)); if (i < full2.length) timer = setTimeout(tick, 80); else setPhase('done') }
      timer = setTimeout(tick, 80)
    }
    return () => clearTimeout(timer)
  }, [phase])

  return (
    <h1 className="text-[clamp(2.2rem,6vw,5rem)] font-bold text-center leading-[1.15] tracking-tight">
      {text1}
      {phase === 'line1' && <span className="inline-block w-[3px] h-[0.85em] bg-[#1a1a1a] ml-0.5 align-middle animate-[blink_0.9s_step-end_infinite]" />}
      {phase !== 'line1' && (
        <>
          <br />
          <span style={{ color: ACCENT }}>{text2}</span>
          {phase === 'line2' && <span className="inline-block w-[3px] h-[0.85em] ml-0.5 align-middle animate-[blink_0.9s_step-end_infinite]" style={{ background: ACCENT }} />}
        </>
      )}
    </h1>
  )
}

function HeroScroll() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const scrollHintOp = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 1, 0])

  const b0op = useTransform(scrollYProgress, [0.10, 0.20], [0, 1])
  const b1op = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])
  const b2op = useTransform(scrollYProgress, [0.20, 0.30], [0, 1])

  const b0y = useTransform(scrollYProgress, [0.10, 0.20], [16, 0])
  const b1y = useTransform(scrollYProgress, [0.15, 0.25], [16, 0])
  const b2y  = useTransform(scrollYProgress, [0.20, 0.30], [16, 0])

  const bOps = [b0op, b1op, b2op]
  const bYs  = [b0y,  b1y,  b2y]

  const BUBBLES = [
    {
      text: '5개 이상의 전사 채널 관리 및 플랫폼을\n유지보수하며 서비스를 개선합니다.',
      right: true,
      style: { left: '55%', top: '18%' },
      mobileStyle: { right: '4%', top: '12%', left: 'auto' },
    },
    {
      text: '사용자 경험이 곧 비즈니스 성과입니다.',
      right: false,
      style: { left: '25%', top: '52%' },
      mobileStyle: { left: '4%', bottom: '30%', top: 'auto' },
    },
    {
      text: '단순한 화면 구현을 넘어 서비스 흐름과\n데이터 구조를 이해합니다.',
      right: true,
      style: { left: '58%', top: '72%' },
      mobileStyle: { right: '4%', bottom: '4%', top: 'auto', left: 'auto' },
    },
  ]

  useEffect(() => {
    setIsMounted(true)
    setIsMobile(window.innerWidth < 768)
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div ref={ref} style={{ height: '400vh' }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-8">
          <TypingText />
        </div>

        <motion.div
          style={{ opacity: scrollHintOp }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[0.62rem] tracking-[0.22em] uppercase text-black/30">scroll</span>
          <div className="w-px h-8 bg-black/10 overflow-hidden rounded-full">
            <motion.div
              className="w-full h-1/2 rounded-full"
              style={{ background: ACCENT }}
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {BUBBLES.map((bubble, i) => {
          const pos = isMobile ? bubble.mobileStyle : bubble.style

          return (
            <motion.div
              key={i}
              style={{ opacity: bOps[i], y: bYs[i], position: 'absolute', ...pos }}
              className="max-w-[240px] pointer-events-none z-20"
            >
              <div
                className="px-4 py-3 text-[0.8rem] leading-[1.65] shadow-sm"
                style={{
                  background: bubble.right ? ACCENT : '#f0f0f0',
                  color: bubble.right ? 'white' : '#1a1a1a',
                  borderRadius: bubble.right ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  whiteSpace: 'pre-line',
                }}
              >
                {bubble.text}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Home() {
  const [activeType, setActiveType] = useState<ButtonType | null>(null)
  const [pendingType, setPendingType] = useState<ButtonType | null>(null)

  const introRef   = useRef(null)
  const worksRef   = useRef(null)
  const howRef     = useRef(null)
  const careerRef  = useRef(null)
  const contactRef = useRef(null)

  const introInView   = useInView(introRef,   { once: true, margin: '-60px' })
  const worksInView   = useInView(worksRef,   { once: true, margin: '-60px' })
  const howInView     = useInView(howRef,     { once: true, margin: '-60px' })
  const careerInView  = useInView(careerRef,  { once: true, margin: '-60px' })
  const contactInView = useInView(contactRef, { once: true, margin: '-60px' })

  const handleAsk = (t: ButtonType) => {
    setActiveType(t)
    setPendingType(t)
  }

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a]">
      <header className="fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-sm border-b border-black/6">
        <div className="max-w-5xl mx-auto px-8 h-14 flex items-center justify-between">
          <span className="text-[0.82rem] font-semibold tracking-tight">박필주</span>
          <nav className="hidden md:flex items-center gap-8">
            {[['소개', '#intro'], ['프로젝트', '#projects'], ['일하는 방식', '#how'], ['콘택트', '#contact']].map(([label, href]) => (
              <a key={label} href={href}
                className="relative text-[0.75rem] text-black/40 hover:text-black/80 transition-colors group">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: ACCENT }} />
              </a>
            ))}
          </nav>
        </div>
      </header>

      <HeroScroll />

      <section id="intro" className="py-24 border-b border-black/8" ref={introRef}>
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/8 border border-black/8 rounded-2xl overflow-hidden mb-14"
            variants={fadeUp} initial="hidden" animate={introInView ? 'visible' : 'hidden'} custom={2}>
            {[
              { value: '3년 10개월', label: '총 경력' },
              { value: '5개+', label: '운영 채널' },
              { value: '10+', label: '사용 기술' },
              { value: 'PageSpeed ↑', label: '성능 최적화' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white px-6 py-5 group hover:bg-[#0077B610] transition-colors duration-200">
                <div className="text-[1.1rem] font-bold mb-1 group-hover:text-[#0077B6] transition-colors">{value}</div>
                <div className="text-[0.72rem] text-black/35">{label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div className="flex flex-wrap gap-2 mb-14"
            variants={fadeUp} initial="hidden" animate={introInView ? 'visible' : 'hidden'} custom={3}>
            {SKILLS.map(s => (
              <span key={s}
                className="text-[0.75rem] border border-black/10 rounded-full px-3.5 py-1.5 text-black/60
                  transition-all duration-200 hover:text-white hover:border-[#0077B6] hover:bg-[#0077B6]">
                {s}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate={introInView ? 'visible' : 'hidden'} custom={4}>
            <p className="text-[0.7rem] tracking-[0.18em] uppercase text-black/30 mb-4">더 자세히 알고 싶다면</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CHAT_BUTTONS.map(({ type }) => (
                <button key={type} onClick={() => handleAsk(type)}
                  className="text-left p-5 border rounded-2xl transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                  style={activeType === type
                    ? { background: ACCENT, borderColor: ACCENT, color: 'white' }
                    : { background: 'white', borderColor: 'rgba(0,0,0,0.1)' }}>
                  <span className="block text-[0.8rem] font-semibold">{TITLES[type]}</span>
                  <span className="block text-[0.7rem] mt-1 opacity-50">AI에게 물어보기 →</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-24 border-b border-black/8" ref={worksRef}>
        <div className="max-w-5xl mx-auto px-8">
          <motion.div variants={fadeUp} initial="hidden" animate={worksInView ? 'visible' : 'hidden'} custom={0}>
            <p className="text-[0.7rem] tracking-[0.2em] uppercase mb-3 font-medium" style={{ color: ACCENT }}>Projects</p>
            <h2 className="text-[2rem] font-bold tracking-tight mb-16">프로젝트</h2>
          </motion.div>
          <div className="flex flex-col divide-y divide-black/8">
            {WORKS.map((work, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden"
                animate={worksInView ? 'visible' : 'hidden'} custom={i + 1}
                className="group grid md:grid-cols-[1fr_1.4fr] gap-8 py-12 items-center">
                <a href={`https://${work.url}`} target="_blank" rel="noopener noreferrer"
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#f0f2f5] block">
                  <Image src={work.image} alt={work.title} fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`transition-transform duration-500 group-hover:scale-[1.04]
                      ${work.portrait ? 'object-contain' : 'object-cover'}`}
                    priority={i === 0} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'rgba(0,119,182,0.82)' }}>
                    <span className="text-white text-[0.85rem] font-semibold tracking-wide">보러가기 ↗</span>
                  </div>
                </a>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.tags.map(tag => (
                      <span key={tag} className="text-[0.68rem] border border-black/12 rounded-full px-3 py-1 text-black/45">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-[1.25rem] font-bold mb-2">{work.title}</h3>
                  <p className="text-[0.82rem] text-black/50 leading-[1.8] mb-5">{work.desc}</p>
                  <a href={`https://${work.url}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.78rem] underline underline-offset-4"
                    style={{ color: ACCENT }}>{work.url} ↗</a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="py-24 border-b border-black/8" ref={howRef}>
        <div className="max-w-5xl mx-auto px-8">
          <motion.div variants={fadeUp} initial="hidden" animate={howInView ? 'visible' : 'hidden'} custom={0}>
            <p className="text-[0.7rem] tracking-[0.2em] uppercase mb-3 font-medium" style={{ color: ACCENT }}>What I Value</p>
            <h2 className="text-[2rem] font-bold tracking-tight mb-16">일하는 기준</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-px bg-black/8 border border-black/8 rounded-2xl overflow-hidden">
            {HOW_I_WORK.map(({ num, title, desc }, i) => (
              <motion.div key={num} variants={fadeUp} initial="hidden"
                animate={howInView ? 'visible' : 'hidden'} custom={i + 1}
                className="bg-white p-8 hover:bg-[#0077B610] transition-colors duration-200">
                <span className="text-[0.65rem] tracking-[0.2em] font-medium" style={{ color: ACCENT }}>{num}</span>
                <h3 className="text-[1rem] font-bold mt-3 mb-3">{title}</h3>
                <p className="text-[0.82rem] text-black/50 leading-[1.85]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-black/8" ref={careerRef}>
        <div className="max-w-5xl mx-auto px-8">
          <motion.div variants={fadeUp} initial="hidden" animate={careerInView ? 'visible' : 'hidden'} custom={0}>
            <p className="text-[0.7rem] tracking-[0.2em] uppercase mb-3 font-medium" style={{ color: ACCENT }}>Career</p>
            <h2 className="text-[2rem] font-bold tracking-tight mb-16">경력</h2>
          </motion.div>
          <div className="flex flex-col">
            {CAREER.map((c, i) => (
              <motion.div key={i} variants={slideLeft} initial="hidden"
                animate={careerInView ? 'visible' : 'hidden'} custom={i + 1}
                className="flex flex-col gap-8 py-8 border-b border-black/8 last:border-0 sm:flex-row">
                <div className="w-28 shrink-0 pt-1">
                  {c.current && (
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-white rounded-full px-2.5 py-1"
                      style={{ background: ACCENT }}>
                      <span className="w-1 h-1 rounded-full bg-white/70 animate-pulse" />
                      재직중
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-[1rem] font-bold">{c.company}</h3>
                    <span className="text-[0.72rem] text-black/30 shrink-0">{c.period}</span>
                  </div>
                  <p className="text-[0.78rem] text-black/45 mb-2">{c.role}</p>
                  <p className="text-[0.82rem] text-black/55 leading-[1.8]">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24" ref={contactRef}>
        <div className="max-w-5xl mx-auto px-8">
          <motion.div variants={fadeUp} initial="hidden" animate={contactInView ? 'visible' : 'hidden'} custom={0}>
            <p className="text-[0.7rem] tracking-[0.2em] uppercase mb-3 font-medium" style={{ color: ACCENT }}>Contact</p>
            <h2 className="text-[2rem] font-bold tracking-tight mb-10">콘택트</h2>
          </motion.div>
          <motion.div className="flex flex-wrap gap-4"
            variants={fadeUp} initial="hidden" animate={contactInView ? 'visible' : 'hidden'} custom={1}>
            {[
              { label: 'pilpark25@gmail.com', href: 'mailto:pilpark25@gmail.com' },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-[0.82rem] border border-black/12 rounded-full px-5 py-2.5 text-black/55
                  hover:border-[#0077B6] hover:text-[#0077B6] transition-all">
                {label} ↗
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-black/8">
        <div className="max-w-5xl mx-auto px-8 py-6 flex items-center justify-between">
          <span className="text-[0.68rem] text-black/25">© 2026 박필주</span>
          <span className="text-[0.68rem] text-black/25">pilpark25@gmail.com</span>
        </div>
      </footer>

      <ChatPanel
        type={activeType}
        pendingType={pendingType}
        onPendingConsumed={() => setPendingType(null)}
        onClose={() => setActiveType(null)}
        onTypeChange={(t) => handleAsk(t)}
      />

      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-black/6 md:hidden">
        <div className="flex items-center justify-around px-4 py-3">
          {[['소개', '#intro'], ['프로젝트', '#projects'], ['일하는 기준', '#how'], ['콘택트', '#contact']].map(([label, href]) => (
            <a key={label} href={href}
              className="text-[0.72rem] text-black/40 hover:text-black/80 transition-colors px-3 py-1">
              {label}
            </a>
          ))}
        </div>
      </nav>
    </main>
  )
}