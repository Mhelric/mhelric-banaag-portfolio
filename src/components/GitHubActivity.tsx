import { useEffect, useMemo, useState } from 'react'

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubApiResponse {
  total: {
    lastYear: number
  }
  contributions: ContributionDay[]
}

const GITHUB_USERNAME = 'Mhelric'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const LEVEL_CLASSES: Record<number, string> = {
  0: 'bg-[#1b1c20]',
  1: 'bg-zinc-600',
  2: 'bg-zinc-400',
  3: 'bg-zinc-200',
  4: 'bg-white',
}

export function GitHubActivity() {
  const [data, setData] = useState<GitHubApiResponse | null>(null)
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null)

  useEffect(() => {
    let isMounted = true
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      .then((res) => res.json())
      .then((json: GitHubApiResponse) => {
        if (isMounted && json?.contributions) {
          setData(json)
        }
      })
      .catch(() => {
        // Fallback silently if offline
      })
    return () => {
      isMounted = false
    }
  }, [])

  const { weeks, monthLabels } = useMemo(() => {
    const days = data?.contributions ?? []
    if (days.length === 0) {
      return { weeks: [] as (ContributionDay | null)[][], monthLabels: [] as { col: number; label: string }[] }
    }

    const groupedWeeks: (ContributionDay | null)[][] = []
    let currentWeek: (ContributionDay | null)[] = Array(7).fill(null)

    const firstDate = new Date(`${days[0].date}T00:00:00`)
    const firstDayOfWeek = firstDate.getDay() // 0 = Sun ... 6 = Sat

    let dayCursor = firstDayOfWeek
    for (const day of days) {
      currentWeek[dayCursor] = day
      dayCursor++
      if (dayCursor === 7) {
        groupedWeeks.push(currentWeek)
        currentWeek = Array(7).fill(null)
        dayCursor = 0
      }
    }
    if (dayCursor > 0) {
      groupedWeeks.push(currentWeek)
    }

    const labels: { col: number; label: string }[] = []
    let lastMonth = -1
    groupedWeeks.forEach((week, colIndex) => {
      const firstValidDay = week.find((d) => d !== null)
      if (!firstValidDay) return
      const monthIdx = new Date(`${firstValidDay.date}T00:00:00`).getMonth()
      if (monthIdx !== lastMonth) {
        if (labels.length === 0 || colIndex - labels[labels.length - 1].col >= 3) {
          labels.push({ col: colIndex, label: MONTHS[monthIdx] })
        }
        lastMonth = monthIdx
      }
    })

    return { weeks: groupedWeeks, monthLabels: labels }
  }, [data])

  const totalContributions = data?.total?.lastYear ?? 141

  return (
    <div className="mt-8 rounded-2xl border border-border bg-[#0d0e11] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:p-7">
      {/* Top Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 shrink-0 text-white"
            aria-hidden="true"
          >
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
          </svg>
          <div>
            <p className="text-xs text-muted">GitHub contributions</p>
            <p className="text-sm font-bold text-white sm:text-base">
              {totalContributions} contributions in the last year
            </p>
          </div>
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-white"
        >
          <span>View profile</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Heatmap Scroll Container */}
      <div className="mt-6 overflow-x-auto pb-2">
        <div className="min-w-[680px]">
          {/* Month Headers */}
          <div className="relative mb-2 ml-8 h-4 text-[11px] text-muted">
            {monthLabels.map((m) => (
              <span
                key={`${m.label}-${m.col}`}
                className="absolute top-0"
                style={{ left: `${(m.col / Math.max(weeks.length, 1)) * 100}%` }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid + Day Labels */}
          <div className="flex items-start gap-2">
            {/* Day Labels (Mon, Wed, Fri) */}
            <div className="grid w-6 shrink-0 grid-rows-7 gap-[4px] text-[10px] leading-[11px] text-muted">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            {/* 53 Weeks Columns */}
            <div
              className="grid flex-1 gap-[4px]"
              style={{
                gridTemplateColumns: `repeat(${Math.max(weeks.length, 53)}, minmax(0, 1fr))`,
              }}
            >
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="grid grid-rows-7 gap-[4px]">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <span
                          key={`empty-${wIdx}-${dIdx}`}
                          className="aspect-square w-full rounded-[3px] bg-transparent"
                        />
                      )
                    }
                    return (
                      <span
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                        className={`aspect-square w-full rounded-[3px] transition-transform duration-150 hover:scale-125 ${LEVEL_CLASSES[day.level]}`}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Hovered Day Info + Less/More Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
        <span className="min-h-[1rem]">
          {hoveredDay
            ? `${hoveredDay.count} contribution${hoveredDay.count === 1 ? '' : 's'} on ${hoveredDay.date}`
            : 'Hover over a square to inspect daily activity'}
        </span>

        <div className="ml-auto flex items-center gap-1.5">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className={`h-2.5 w-2.5 rounded-[2px] ${LEVEL_CLASSES[lvl]}`}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}