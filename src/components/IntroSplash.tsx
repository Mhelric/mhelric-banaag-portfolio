import { useEffect, useState } from 'react'

export function IntroSplash() {
  const [isLeaving, setIsLeaving] = useState(false)
  const [isUnmounted, setIsUnmounted] = useState(false)

  useEffect(() => {
    const leaveTimer = setTimeout(() => {
      setIsLeaving(true)
    }, 1680)

    const unmountTimer = setTimeout(() => {
      setIsUnmounted(true)
    }, 2050)

    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (isUnmounted) return null

  return (
    <div
      onClick={() => {
        setIsLeaving(true)
        setTimeout(() => setIsUnmounted(true), 320)
      }}
      role="status"
      aria-label="Mhelric Banaag Portfolio"
      className={`efw-entry-loader ${isLeaving ? 'is-leaving' : ''}`}
    >
      <div className="efw-entry-mark">
        {/* 3-Level Architectural Line-Drawing Monogram (MB) */}
        <svg
          className="efw-brand-symbol"
          viewBox="0 0 88 48"
          aria-hidden="true"
        >
          {/* Level 01: Primary 'M' Architectural Frame */}
          <path
            className="efw-level efw-level--01"
            d="M4 44V4L24 24L44 4V44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* Level 02: Upper 'B' Stepped Chamber */}
          <path
            className="efw-level efw-level--02"
            d="M44 14H66V28H44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* Level 03: Lower 'B' Stepped Chamber */}
          <path
            className="efw-level efw-level--03"
            d="M66 28H84V44H44"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>

        {/* Stacked Architectural Wordmark */}
        <div className="efw-wordmark" aria-hidden="true">
          <span>MHELRIC BANAAG</span>
          <span>DEVELOPER &amp; ARTIST</span>
        </div>
      </div>
    </div>
  )
}