'use client'

import { useState, useRef, useEffect } from 'react'
import { type ButtonType, TITLES, MOCK_ANSWERS } from '@/lib/portfolio-data'

type Message =
  | { kind: 'question'; type: ButtonType }
  | { kind: 'answer'; text: string }
  | { kind: 'typing'; text: string }
  | { kind: 'buttons' }

type Props = {
  type: ButtonType | null
  pendingType: ButtonType | null
  onClose: () => void
  onTypeChange: (type: ButtonType) => void
  onPendingConsumed: () => void
}

const ALL_TYPES: ButtonType[] = ['info', 'skills', 'projects', 'career']
const TYPING_SPEED = 8
const ACCENT = '#FF4500'

function parseMessage(text: string) {
  const linkMatch = text.match(/\[link\](.+?)\|(.+?)\[\/link\]/)
  if (!linkMatch) return { title: null, url: null, body: text }
  return {
    title: linkMatch[1],
    url: linkMatch[2],
    body: text.replace(/\[link\].+?\[\/link\]\n?/, ''),
  }
}

export default function ChatPanel({ type, pendingType, onClose, onTypeChange, onPendingConsumed }: Props) {
  const isOpen = type !== null
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTypingRef = useRef(false)

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  const scrollBottom = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }, 30)
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const addMessages = (questionType: ButtonType) => {
    if (isTypingRef.current) return

    setMessages(prev => {
      const filtered = prev.filter(m => m.kind !== 'buttons')
      return [...filtered, { kind: 'question', type: questionType }]
    })
    scrollBottom()

    const answers = MOCK_ANSWERS[questionType]

    const typeSequence = (index: number) => {
      if (index >= answers.length) {
        setMessages(prev => [...prev, { kind: 'buttons' }])
        setIsTyping(false)
        isTypingRef.current = false
        scrollBottom()
        return
      }

      const text = answers[index]
      let i = 0

      setMessages(prev => [...prev, { kind: 'typing', text: '' }])
      setIsTyping(true)
      isTypingRef.current = true
      scrollBottom()

      const tick = () => {
        i++
        setMessages(prev => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last.kind === 'typing') next[next.length - 1] = { kind: 'typing', text: text.slice(0, i) }
          return next
        })
        scrollBottom()

        if (i < text.length) {
          timerRef.current = setTimeout(tick, TYPING_SPEED)
        } else {
          setMessages(prev => {
            const next = [...prev]
            next[next.length - 1] = { kind: 'answer', text }
            return next
          })
          timerRef.current = setTimeout(() => typeSequence(index + 1), 400)
        }
      }

      timerRef.current = setTimeout(tick, 300)
    }

    timerRef.current = setTimeout(() => typeSequence(0), 400)
  }

  useEffect(() => {
    if (!pendingType) return
    onPendingConsumed()
    addMessages(pendingType)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingType])

  const handleTypeChange = (t: ButtonType) => {
    if (isTypingRef.current) return
    onTypeChange(t)
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[72vh] z-50
          bg-white border border-black/10 border-b-0 rounded-t-3xl flex flex-col
          shadow-2xl shadow-black/10
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* handle */}
        <div className="flex justify-center pt-3 shrink-0">
          <div className="w-9 h-1 rounded-full bg-black/10" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-black/6 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            <span className="text-[0.7rem] tracking-[0.15em] uppercase text-black/35">박필주</span>
          </div>
          <button
            onClick={onClose}
            className="text-black/25 hover:text-black/60 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* 메시지 */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
          {messages.map((msg, i) => {

            if (msg.kind === 'question') {
              return (
                <div key={i} className="flex justify-end mt-2">
                  <div
                    className="px-4 py-2.5 text-[0.82rem] rounded-2xl rounded-br-sm max-w-[80%]"
                    style={{ background: '#f2f2f2', color: '#1a1a1a' }}
                  >
                    {TITLES[msg.type]}
                  </div>
                </div>
              )
            }

            if (msg.kind === 'answer' || msg.kind === 'typing') {
              const isCurrentTyping = msg.kind === 'typing'
              const prevMsg = messages[i - 1]
              const showLabel = !prevMsg || prevMsg.kind === 'question' || prevMsg.kind === 'buttons'
              const { title, url, body } = parseMessage(msg.text)

              return (
                <div key={i} className="flex flex-col gap-1.5">
                  {showLabel && (
                    <div className="text-[0.6rem] tracking-[0.18em] uppercase text-black/30 font-medium mt-1">
                      박필주
                    </div>
                  )}
                  {title && url && (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 rounded-2xl border border-black/8
                        hover:border-black/20 hover:shadow-sm transition-all group w-fit max-w-[88%]"
                    >
                      <span
                        className="text-[0.8rem] font-semibold text-[#1a1a1a] group-hover:transition-colors"
                        style={{ color: 'inherit' }}
                        onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                        onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}
                      >
                        {title}
                      </span>
                      <span className="text-black/30 ml-3 text-[0.75rem]">↗</span>
                    </a>
                  )}
                  {body && (
                    <div className="text-[0.85rem] text-[#1a1a1a]/75 leading-[1.8]">
                      {body}
                      {isCurrentTyping && (
                        <span className="inline-block w-[2px] h-[0.85em] bg-[#1a1a1a] ml-0.5 align-middle animate-[blink_0.9s_step-end_infinite]" />
                      )}
                    </div>
                  )}
                  {isCurrentTyping && !body && (
                    <div className="text-[0.85rem] text-[#1a1a1a]/75 leading-[1.8]">
                      <span className="inline-block w-[2px] h-[0.85em] bg-[#1a1a1a] align-middle animate-[blink_0.9s_step-end_infinite]" />
                    </div>
                  )}
                </div>
              )
            }

            if (msg.kind === 'buttons') {
              return (
                <div key={i} className="flex flex-col gap-2 mt-2">
                  <p className="text-[0.68rem] text-black/30">다른 질문</p>
                  <div className="flex flex-wrap gap-2 justify-end">
                    {ALL_TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => handleTypeChange(t)}
                        className="px-4 py-2 text-[0.75rem] font-medium border border-black/10 rounded-full
                          hover:border-black/25 transition-all"
                      >
                        {TITLES[t]}
                      </button>
                    ))}
                  </div>
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </>
  )
}