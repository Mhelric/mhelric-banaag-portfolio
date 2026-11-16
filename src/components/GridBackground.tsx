import { useEffect, useRef } from 'react'

const GRID_SIZE = 48

interface Beam {
  isHorizontal: boolean
  lineIndex: number
  position: number
  speed: number
  length: number
  opacity: number
}

interface GlowingCell {
  col: number
  row: number
  progress: number
  speed: number
  maxOpacity: number
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const SCALE = 0.35
    let animationFrameId = 0
    let isRunning = false
    let isLight = document.documentElement.classList.contains('light')
    let width = window.innerWidth
    let height = window.innerHeight
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const syncCanvasSize = () => {
      if (!canvas) return
      width = window.innerWidth
      height = window.innerHeight
      // 0.5x canvas scale cuts fill-rate & VRAM by 75% for soft ambient beams/cells
      canvas.width = Math.max(1, Math.ceil(width * SCALE))
      canvas.height = Math.max(1, Math.ceil(height * SCALE))
    }

    syncCanvasSize()

    const themeObserver = new MutationObserver(() => {
      isLight = document.documentElement.classList.contains('light')
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.addEventListener('resize', syncCanvasSize)

    const createBeam = (randomStart = false): Beam => {
      const isHorizontal = Math.random() > 0.45
      const maxLines = Math.max(
        1,
        Math.floor((isHorizontal ? height : width) / GRID_SIZE)
      )
      const lineIndex = Math.floor(Math.random() * maxLines) + 1
      const length = 110 + Math.random() * 140
      const maxSpan = isHorizontal ? width : height

      return {
        isHorizontal,
        lineIndex,
        position: randomStart ? Math.random() * maxSpan : -length,
        speed: 1.1 + Math.random() * 1.8,
        length,
        opacity: 0.35 + Math.random() * 0.45,
      }
    }

    const createCell = (randomPhase = false): GlowingCell => {
      const cols = Math.max(1, Math.floor(width / GRID_SIZE))
      const rows = Math.max(1, Math.floor(height / GRID_SIZE))
      return {
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
        progress: randomPhase ? Math.random() * Math.PI : 0,
        speed: 0.012 + Math.random() * 0.018,
        maxOpacity: 0.06 + Math.random() * 0.08,
      }
    }

    const beams: Beam[] = Array.from({ length: 3 }, () => createBeam(true))
    const cells: GlowingCell[] = Array.from({ length: 3 }, () => createCell(true))

    let lastFrame = 0
    const render = (now: number) => {
      if (document.hidden) {
        isRunning = false
        animationFrameId = 0
        return
      }
      if (now - lastFrame < 50) {
        animationFrameId = window.requestAnimationFrame(render)
        return
      }
      const stepScale = lastFrame ? Math.min(3, (now - lastFrame) / 16.67) : 1
      lastFrame = now

      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
      ctx.clearRect(0, 0, width, height)

      // 1. Draw softly pulsing 48x48 grid cells
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i]
        cell.progress += cell.speed * stepScale

        if (cell.progress >= Math.PI) {
          cells[i] = createCell(false)
          continue
        }

        const alpha = Math.sin(cell.progress) * (isLight ? cell.maxOpacity * 0.9 : cell.maxOpacity)
        const x = cell.col * GRID_SIZE
        const y = cell.row * GRID_SIZE

        ctx.fillStyle = isLight
          ? `rgba(29, 78, 216, ${alpha})`
          : `rgba(79, 140, 255, ${alpha})`
        ctx.fillRect(x + 1, y + 1, GRID_SIZE - 1, GRID_SIZE - 1)
      }

      // 2. Draw moving light beams along the 48px grid lines (two-segment fill, zero gradient allocations)
      for (let i = 0; i < beams.length; i++) {
        const beam = beams[i]
        beam.position += beam.speed * stepScale

        const limit = (beam.isHorizontal ? width : height) + beam.length
        if (beam.position > limit) {
          beams[i] = createBeam(false)
          continue
        }

        const fixedCoord = beam.lineIndex * GRID_SIZE
        const head = beam.position
        const tail = beam.position - beam.length
        const tipLen = Math.min(28, beam.length * 0.25)

        ctx.fillStyle = isLight
          ? `rgba(29, 78, 216, ${beam.opacity * 0.35})`
          : `rgba(79, 140, 255, ${beam.opacity * 0.4})`
        if (beam.isHorizontal) {
          ctx.fillRect(tail, fixedCoord, beam.length - tipLen, 1.5)
        } else {
          ctx.fillRect(fixedCoord, tail, 1.5, beam.length - tipLen)
        }

        ctx.fillStyle = isLight
          ? `rgba(30, 64, 175, ${beam.opacity * 0.78})`
          : `rgba(185, 215, 255, ${beam.opacity * 0.9})`
        if (beam.isHorizontal) {
          ctx.fillRect(head - tipLen, fixedCoord, tipLen, 1.5)
        } else {
          ctx.fillRect(fixedCoord, head - tipLen, 1.5, tipLen)
        }
      }

      if (!reducedMotion) {
        animationFrameId = window.requestAnimationFrame(render)
      } else {
        isRunning = false
        animationFrameId = 0
      }
    }

    const startLoop = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true
        lastFrame = 0
        animationFrameId = window.requestAnimationFrame(render)
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId)
          animationFrameId = 0
        }
        isRunning = false
      } else {
        startLoop()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    startLoop()

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
      themeObserver.disconnect()
      window.removeEventListener('resize', syncCanvasSize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
