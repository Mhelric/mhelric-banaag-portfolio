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

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

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

    const beams: Beam[] = Array.from({ length: 9 }, () => createBeam(true))
    const cells: GlowingCell[] = Array.from({ length: 6 }, () => createCell(true))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw softly pulsing 48x48 grid cells
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i]
        cell.progress += cell.speed

        if (cell.progress >= Math.PI) {
          cells[i] = createCell(false)
          continue
        }

        const alpha = Math.sin(cell.progress) * cell.maxOpacity
        const x = cell.col * GRID_SIZE
        const y = cell.row * GRID_SIZE

        ctx.fillStyle = `rgba(79, 140, 255, ${alpha})`
        ctx.fillRect(x + 1, y + 1, GRID_SIZE - 1, GRID_SIZE - 1)
      }

      // 2. Draw moving light beams along the 48px grid lines
      for (let i = 0; i < beams.length; i++) {
        const beam = beams[i]
        beam.position += beam.speed

        const limit = (beam.isHorizontal ? width : height) + beam.length
        if (beam.position > limit) {
          beams[i] = createBeam(false)
          continue
        }

        const fixedCoord = beam.lineIndex * GRID_SIZE
        const head = beam.position
        const tail = beam.position - beam.length

        const grad = beam.isHorizontal
          ? ctx.createLinearGradient(tail, fixedCoord, head, fixedCoord)
          : ctx.createLinearGradient(fixedCoord, tail, fixedCoord, head)

        grad.addColorStop(0, 'rgba(79, 140, 255, 0)')
        grad.addColorStop(0.7, `rgba(79, 140, 255, ${beam.opacity * 0.65})`)
        grad.addColorStop(1, `rgba(185, 215, 255, ${beam.opacity})`)

        ctx.fillStyle = grad
        if (beam.isHorizontal) {
          ctx.fillRect(tail, fixedCoord, beam.length, 1.5)
        } else {
          ctx.fillRect(fixedCoord, tail, 1.5, beam.length)
        }
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    animationFrameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
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