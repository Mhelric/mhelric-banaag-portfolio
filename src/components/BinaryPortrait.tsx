import { useEffect, useRef } from 'react'

interface AmbientBit {
  x: number
  y: number
  vy: number
  char: '0' | '1'
  alpha: number
  maxAlpha: number
  life: number
  maxLife: number
}

export function BinaryPortrait() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    let isCancelled = false
    let isInViewport = true
    let startLoop: (() => void) | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting
        if (isInViewport && startLoop) {
          startLoop()
        }
      },
      { rootMargin: '150px 0px' },
    )
    observer.observe(container)

    const handleVisibilityChange = () => {
      if (!document.hidden && isInViewport && startLoop) {
        startLoop()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let isRunning = false
    let isLight = document.documentElement.classList.contains('light')

    const buffers: Record<'dark' | 'light', HTMLCanvasElement | null> = {
      dark: null,
      light: null,
    }
    const sources: Record<'dark' | 'light', string> = {
      dark: '/mhelric-profile.webp',
      light: '/mhelric-profile-light.webp',
    }

    const activeImages: HTMLImageElement[] = []
    let redrawCurrentFrame: (() => void) | null = null

    const themeObserver = new MutationObserver(() => {
      const nextLight = document.documentElement.classList.contains('light')
      if (nextLight !== isLight) {
        isLight = nextLight
        if (redrawCurrentFrame) {
          redrawCurrentFrame()
        }
      }
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const loadPortraitBuffer = (
      mode: 'dark' | 'light',
      onReady: (img: HTMLImageElement, buf: HTMLCanvasElement) => void,
    ) => {
      const img = new Image()
      activeImages.push(img)
      img.src = sources[mode]

      img.onload = () => {
        if (isCancelled) return
        const logicalWidth = 420
        const aspectRatio = img.height / img.width
        const logicalHeight = Math.round(logicalWidth * aspectRatio)
        const dpr = Math.min(window.devicePixelRatio || 1, 2)

        const buf = document.createElement('canvas')
        buf.width = logicalWidth * dpr
        buf.height = logicalHeight * dpr
        const bufCtx = buf.getContext('2d')
        if (bufCtx) {
          bufCtx.drawImage(img, 0, 0, buf.width, buf.height)
        }

        buffers[mode] = buf
        onReady(img, buf)
        img.onload = null
      }
    }

    const initialMode: 'dark' | 'light' = isLight ? 'light' : 'dark'
    const secondaryMode: 'dark' | 'light' = isLight ? 'dark' : 'light'

    loadPortraitBuffer(initialMode, (img) => {
      if (isCancelled || !canvas) return

      const logicalWidth = 420
      const aspectRatio = img.height / img.width
      const logicalHeight = Math.round(logicalWidth * aspectRatio)

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = logicalWidth * dpr
      canvas.height = logicalHeight * dpr

      // Sample silhouette outline points once to spawn ambient floating bits
      const sampleCanvas = document.createElement('canvas')
      sampleCanvas.width = logicalWidth
      sampleCanvas.height = logicalHeight
      const sampleCtx = sampleCanvas.getContext('2d')
      const edgePoints: { x: number; y: number }[] = []

      if (sampleCtx) {
        sampleCtx.drawImage(img, 0, 0, logicalWidth, logicalHeight)
        const pixels = sampleCtx.getImageData(0, 0, logicalWidth, logicalHeight).data
        for (let y = Math.round(logicalHeight * 0.15); y < logicalHeight * 0.9; y += 12) {
          for (let x = 0; x < logicalWidth; x += 10) {
            const a = pixels[(y * logicalWidth + x) * 4 + 3]
            if (a > 30 && a < 220) {
              edgePoints.push({ x, y })
            }
          }
        }
        sampleCanvas.width = 0
        sampleCanvas.height = 0
      }

      // Preload alternate theme portrait so theme toggles swap instantaneously
      loadPortraitBuffer(secondaryMode, () => {
        if (!isCancelled && redrawCurrentFrame) {
          redrawCurrentFrame()
        }
      })

      const spawnAmbientBit = (randomLife = false): AmbientBit => {
        const pt =
          edgePoints.length > 0
            ? edgePoints[Math.floor(Math.random() * edgePoints.length)]
            : { x: logicalWidth * 0.5, y: logicalHeight * 0.5 }
        const maxLife = 90 + Math.random() * 90
        return {
          x: pt.x + (Math.random() - 0.5) * 32,
          y: pt.y + (Math.random() - 0.5) * 16,
          vy: -(0.22 + Math.random() * 0.38),
          char: Math.random() > 0.5 ? '1' : '0',
          alpha: 0,
          maxAlpha: 0.25 + Math.random() * 0.35,
          life: randomLife ? Math.random() * maxLife : 0,
          maxLife,
        }
      }

      const ambientBits: AmbientBit[] = Array.from({ length: 22 }, () =>
        spawnAmbientBit(true),
      )

      const drawFrame = (advanceBits: boolean) => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, logicalWidth, logicalHeight)

        // 1. Subtle floating binary particles drifting along the silhouette
        ctx.font = '500 8px "JetBrains Mono", monospace'
        ctx.textBaseline = 'middle'
        for (let i = 0; i < ambientBits.length; i++) {
          const bit = ambientBits[i]
          if (advanceBits) {
            bit.life += 1
            bit.y += bit.vy

            if (bit.life >= bit.maxLife) {
              ambientBits[i] = spawnAmbientBit(false)
              continue
            }
          }

          const progress = bit.life / bit.maxLife
          const fade = Math.sin(progress * Math.PI) * bit.maxAlpha
          ctx.fillStyle = isLight
            ? `rgba(29, 78, 216, ${fade})`
            : `rgba(79, 140, 255, ${fade})`
          ctx.fillText(bit.char, bit.x, bit.y)
        }

        // 2. Crisp portrait matching the active theme
        const activeBuffer =
          (isLight ? buffers.light : buffers.dark) ??
          buffers.dark ??
          buffers.light
        if (activeBuffer) {
          ctx.drawImage(activeBuffer, 0, 0, logicalWidth, logicalHeight)
        }
      }

      redrawCurrentFrame = () => {
        drawFrame(false)
      }

      const render = () => {
        if (isCancelled || !isInViewport || document.hidden) {
          isRunning = false
          rafId = 0
          return
        }

        drawFrame(true)
        rafId = window.requestAnimationFrame(render)
      }

      startLoop = () => {
        if (!isRunning && isInViewport && !document.hidden && !isCancelled) {
          isRunning = true
          rafId = window.requestAnimationFrame(render)
        }
      }

      startLoop()
    })

    return () => {
      isCancelled = true
      if (rafId) window.cancelAnimationFrame(rafId)
      themeObserver.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      for (const img of activeImages) {
        img.onload = null
      }
      if (buffers.dark) {
        buffers.dark.width = 0
        buffers.dark.height = 0
      }
      if (buffers.light) {
        buffers.light.width = 0
        buffers.light.height = 0
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative flex justify-center lg:justify-end">
      {/* Subtle Ambient Studio Glow Behind Portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl"
      />

      <canvas
        ref={canvasRef}
        aria-label="Mhelric Banaag portrait"
        className="relative z-10 block aspect-[1215/1773] h-auto w-auto max-w-[230px] max-h-[34svh] object-contain drop-shadow-[0_14px_28px_rgba(15,23,42,0.18)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)] sm:max-w-[290px] sm:max-h-[40svh] lg:max-w-[380px] lg:max-h-[calc(100svh-12rem)] xl:max-w-[420px] xl:max-h-[calc(100svh-11.5rem)]"
      />
    </div>
  )
}
