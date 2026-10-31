import { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  t: number
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const headRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const isFinePointer =
      window.matchMedia('(pointer: fine) and (hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isFinePointer) return

    const cursorEl = cursorRef.current
    const canvasEl = canvasRef.current
    const headEl = headRef.current
    if (!cursorEl || !canvasEl || !headEl) return

    const ctx = canvasEl.getContext('2d')
    if (!ctx) return

    document.documentElement.classList.add('has-custom-cursor')

    const strokeColor = '#f2f2f2'
    let width = window.innerWidth
    let height = window.innerHeight

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      // 1x CSS pixel resolution is visually identical for the soft-blurred comet trail
      // and reduces full-viewport canvas backing store memory by 75% on 2x HiDPI displays.
      canvasEl.width = width
      canvasEl.height = height
      canvasEl.style.width = `${width}px`
      canvasEl.style.height = `${height}px`
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    const trail: TrailPoint[] = []
    const leftEdge: { x: number; y: number }[] = []
    const rightEdge: { x: number; y: number }[] = []
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let initialized = false
    let rafId = 0
    let isRunning = false
    let canvasDirty = false

    const render = (now: number) => {
      const dxTarget = target.x - current.x
      const dyTarget = target.y - current.y
      current.x += dxTarget * 0.28
      current.y += dyTarget * 0.28
      headEl.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`

      const lastPoint = trail[trail.length - 1]
      if (
        initialized &&
        (!lastPoint || Math.hypot(current.x - lastPoint.x, current.y - lastPoint.y) >= 1.5)
      ) {
        trail.push({ x: current.x, y: current.y, t: now })
      }

      while (trail.length > 0 && now - trail[0].t > 150) {
        trail.shift()
      }

      if (canvasDirty || trail.length >= 3) {
        ctx.clearRect(0, 0, width, height)
        canvasDirty = false
      }

      if (trail.length >= 3) {
        const len = trail.length
        leftEdge.length = 0
        rightEdge.length = 0

        for (let i = 0; i < len; i++) {
          const pt = trail[i]
          const prev = trail[Math.max(0, i - 1)]
          const next = trail[Math.min(len - 1, i + 1)]
          let dx = next.x - prev.x
          let dy = next.y - prev.y
          const dist = Math.hypot(dx, dy) || 1
          dx /= dist
          dy /= dist

          const ageFactor = Math.min(1, Math.max(0, 1 - (now - pt.t) / 150))
          const halfWidth = (1.5 + 7.5 * ageFactor) / 2

          leftEdge.push({ x: pt.x - dy * halfWidth, y: pt.y + dx * halfWidth })
          rightEdge.push({ x: pt.x + dy * halfWidth, y: pt.y - dx * halfWidth })
        }

        const tailPt = trail[0]
        const headPt = trail[len - 1]
        const grad = ctx.createLinearGradient(tailPt.x, tailPt.y, headPt.x, headPt.y)
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)')
        grad.addColorStop(1, strokeColor)

        ctx.beginPath()
        ctx.moveTo(leftEdge[0].x, leftEdge[0].y)
        for (let i = 1; i < len; i++) {
          ctx.lineTo(leftEdge[i].x, leftEdge[i].y)
        }
        for (let i = len - 1; i >= 0; i--) {
          ctx.lineTo(rightEdge[i].x, rightEdge[i].y)
        }
        ctx.closePath()

        ctx.fillStyle = grad
        ctx.shadowColor = strokeColor
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
        canvasDirty = true
      }

      // Pause the RAF loop once the cursor has settled and the trail has faded out
      const isSettled = Math.hypot(dxTarget, dyTarget) < 0.1 && trail.length === 0
      if (isSettled || document.hidden) {
        isRunning = false
        rafId = 0
      } else {
        rafId = window.requestAnimationFrame(render)
      }
    }

    const startLoop = () => {
      if (!isRunning && !document.hidden) {
        isRunning = true
        rafId = window.requestAnimationFrame(render)
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (!initialized) {
        initialized = true
        current.x = target.x
        current.y = target.y
        trail.length = 0
      }
      if (cursorEl.dataset.visible !== 'true') {
        cursorEl.dataset.visible = 'true'
      }
      startLoop()
    }

    const handlePointerOver = (e: PointerEvent) => {
      const targetEl = e.target as HTMLElement | null
      const interactive = targetEl?.closest('a, button, [role="button"], input, textarea')
      cursorEl.dataset.hover = interactive ? 'true' : 'false'
    }

    const handlePointerLeave = () => {
      cursorEl.dataset.visible = 'false'
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerover', handlePointerOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerover', handlePointerOver)
      document.documentElement.removeEventListener('pointerleave', handlePointerLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      data-visible="false"
      data-hover="false"
      aria-hidden="true"
      className="ingrassia-cursor"
    >
      <canvas ref={canvasRef} className="ingrassia-cursor-canvas" />
      <div ref={headRef} className="ingrassia-cursor-head" />
    </div>
  )
}
