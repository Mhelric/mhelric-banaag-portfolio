import { useEffect, useRef } from 'react'

interface BinaryCell {
  x: number
  y: number
  char: '0' | '1'
  lum: number
  alpha: number
}

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
  const mouseRef = useRef({
    targetX: -1000,
    targetY: -1000,
    x: -1000,
    y: -1000,
    radius: 0,
    targetRadius: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId = 0
    let isCancelled = false

    const img = new Image()
    img.src = '/mhelric-profile.webp'

    img.onload = () => {
      if (isCancelled || !canvas) return

      const logicalWidth = 420
      const aspectRatio = img.height / img.width
      const logicalHeight = Math.round(logicalWidth * aspectRatio)

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = logicalWidth * dpr
      canvas.height = logicalHeight * dpr

      // Sample image pixels once for the interactive X-Ray Binary Lens
      const offscreen = document.createElement('canvas')
      offscreen.width = logicalWidth
      offscreen.height = logicalHeight
      const offCtx = offscreen.getContext('2d')
      if (!offCtx) return

      offCtx.drawImage(img, 0, 0, logicalWidth, logicalHeight)
      const pixels = offCtx.getImageData(0, 0, logicalWidth, logicalHeight).data

      const stepX = 6
      const stepY = 7
      const cells: BinaryCell[] = []
      const edgePoints: { x: number; y: number }[] = []

      for (let y = 0; y < logicalHeight; y += stepY) {
        for (let x = 0; x < logicalWidth; x += stepX) {
          const idx = (y * logicalWidth + x) * 4
          const r = pixels[idx]
          const g = pixels[idx + 1]
          const b = pixels[idx + 2]
          const a = pixels[idx + 3]

          if (a > 40) {
            const lum = Math.min(
              1,
              Math.max(0.15, ((0.299 * r + 0.587 * g + 0.114 * b) / 255) * 1.25)
            )
            cells.push({
              x,
              y,
              char: Math.random() > 0.5 ? '1' : '0',
              lum,
              alpha: a / 255,
            })

            // Detect silhouette edges to spawn subtle floating ambient bits
            if (a < 210 && y > logicalHeight * 0.18 && y < logicalHeight * 0.88) {
              edgePoints.push({ x, y })
            }
          }
        }
      }

      const spawnAmbientBit = (randomLife = false): AmbientBit => {
        const pt =
          edgePoints.length > 0
            ? edgePoints[Math.floor(Math.random() * edgePoints.length)]
            : { x: logicalWidth * 0.5, y: logicalHeight * 0.5 }
        const maxLife = 90 + Math.random() * 90
        return {
          x: pt.x + (Math.random() - 0.5) * 28,
          y: pt.y + (Math.random() - 0.5) * 14,
          vy: -(0.22 + Math.random() * 0.38),
          char: Math.random() > 0.5 ? '1' : '0',
          alpha: 0,
          maxAlpha: 0.25 + Math.random() * 0.35,
          life: randomLife ? Math.random() * maxLife : 0,
          maxLife,
        }
      }

      const ambientBits: AmbientBit[] = Array.from({ length: 22 }, () =>
        spawnAmbientBit(true)
      )

      const render = () => {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, logicalWidth, logicalHeight)

        const m = mouseRef.current
        m.x += (m.targetX - m.x) * 0.22
        m.y += (m.targetY - m.y) * 0.22
        m.radius += (m.targetRadius - m.radius) * 0.16

        // 1. Subtle floating binary particles drifting along the silhouette
        ctx.font = '500 8px "JetBrains Mono", monospace'
        ctx.textBaseline = 'middle'
        for (let i = 0; i < ambientBits.length; i++) {
          const bit = ambientBits[i]
          bit.life += 1
          bit.y += bit.vy

          if (bit.life >= bit.maxLife) {
            ambientBits[i] = spawnAmbientBit(false)
            continue
          }

          const progress = bit.life / bit.maxLife
          const fade = Math.sin(progress * Math.PI) * bit.maxAlpha
          ctx.fillStyle = `rgba(79, 140, 255, ${fade})`
          ctx.fillText(bit.char, bit.x, bit.y)
        }

        // 2. Crisp, full-resolution portrait in the foreground
        ctx.drawImage(img, 0, 0, logicalWidth, logicalHeight)

        // 3. Interactive Binary X-Ray Lens when hovering over the portrait
        if (m.radius > 1.5) {
          ctx.save()
          ctx.beginPath()
          ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2)
          ctx.clip()

          // Darken inside the X-Ray lens so the binary matrix pops cleanly
          ctx.fillStyle = '#0a0a0b'
          ctx.fillRect(
            m.x - m.radius,
            m.y - m.radius,
            m.radius * 2,
            m.radius * 2
          )

          ctx.globalAlpha = 0.2
          ctx.drawImage(img, 0, 0, logicalWidth, logicalHeight)
          ctx.globalAlpha = 1

          ctx.font = '600 6.5px "JetBrains Mono", monospace'
          ctx.textBaseline = 'top'

          const rSq = m.radius * m.radius
          for (let i = 0; i < cells.length; i++) {
            const cell = cells[i]
            const dx = cell.x - m.x
            const dy = cell.y - m.y
            const distSq = dx * dx + dy * dy

            if (distSq <= rSq) {
              if (Math.random() < 0.04) {
                cell.char = cell.char === '1' ? '0' : '1'
              }
              const edgeFade = 1 - Math.sqrt(distSq) / m.radius
              const alpha = Math.min(1, (cell.lum * 0.9 + 0.2) * cell.alpha * (0.4 + edgeFade * 0.6))

              if (cell.lum > 0.58) {
                ctx.fillStyle = `rgba(225, 240, 255, ${alpha})`
              } else {
                ctx.fillStyle = `rgba(79, 140, 255, ${alpha})`
              }
              ctx.fillText(cell.char, cell.x, cell.y)
            }
          }

          // Subtle glowing ring around the X-Ray lens
          ctx.strokeStyle = 'rgba(79, 140, 255, 0.45)'
          ctx.lineWidth = 1.25
          ctx.stroke()
          ctx.restore()
        }

        rafId = window.requestAnimationFrame(render)
      }

      rafId = window.requestAnimationFrame(render)
    }

    return () => {
      isCancelled = true
      window.cancelAnimationFrame(rafId)
    }
  }, [])

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const logicalWidth = 420
    const logicalHeight = logicalWidth * (canvas.height / canvas.width)

    const nx = ((e.clientX - rect.left) / rect.width) * logicalWidth
    const ny = ((e.clientY - rect.top) / rect.height) * logicalHeight

    if (mouseRef.current.targetRadius === 0) {
      mouseRef.current.x = nx
      mouseRef.current.y = ny
    }
    mouseRef.current.targetX = nx
    mouseRef.current.targetY = ny
    mouseRef.current.targetRadius = 72
  }

  const handlePointerLeave = () => {
    mouseRef.current.targetRadius = 0
  }

  return (
    <div ref={containerRef} className="relative flex justify-center lg:justify-end">
      {/* Subtle Ambient Studio Glow Behind Portrait */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl"
      />

      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label="Mhelric Banaag portrait with interactive binary X-ray lens"
        className="relative z-10 block h-auto w-full max-w-[230px] object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)] sm:max-w-[290px] lg:max-w-[380px] xl:max-w-[420px]"
      />
    </div>
  )
}