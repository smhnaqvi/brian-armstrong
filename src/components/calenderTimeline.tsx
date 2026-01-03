import React, { useRef, useCallback, forwardRef, useState } from 'react'
import dayjs from 'dayjs'
import {
  GrowingMoneyIcon,
  HouseIcon,
  MembersIcon,
  MoneyTransferIcon,
  PlusIcon,
  ReceiptDollarIcon,
  SalaryIcon,
  UserIcon,
} from './icons'
import Button from './button'
import RightSidebar from './rightSidebar'

/* ===================== TIME CONFIG ===================== */

// محور زمانی باید از JUL شروع شود (اولین marker)
const TIMELINE_START = dayjs('2024-07-01')
const TIMELINE_END = dayjs('2038-12-31')
const PX_PER_DAY = .73 // فقط روی header timeline اثر دارد

const TOTAL_DAYS = TIMELINE_END.diff(TIMELINE_START, 'day') + 1
const TIMELINE_WIDTH = TOTAL_DAYS * PX_PER_DAY

/* ===================== RANGE HELPERS ===================== */

const clampToTimeline = (d: dayjs.Dayjs) => {
  if (d.isBefore(TIMELINE_START)) return TIMELINE_START
  if (d.isAfter(TIMELINE_END)) return TIMELINE_END
  return d
}

const getRangeStyle = (start: string | dayjs.Dayjs, end: string | dayjs.Dayjs) => {
  const rawStart = dayjs(start)
  const rawEnd = dayjs(end)

  const startDate = rawEnd.isBefore(rawStart) ? rawEnd : rawStart
  const endDate = rawEnd.isBefore(rawStart) ? rawStart : rawEnd

  const s = clampToTimeline(startDate)
  const e = clampToTimeline(endDate)

  const startOffsetDays = s.diff(TIMELINE_START, 'day')
  const durationDays = Math.max(1, e.diff(s, 'day') + 1)

  return {
    left: startOffsetDays * PX_PER_DAY,
    width: durationDays * PX_PER_DAY,
  }
}

/* ===================== TIMELINE HEADER ===================== */

const generateTimeline = (startYear: number, endYear: number) => {
  const timeline: Array<{ id: number; startDate: dayjs.Dayjs; label: string }> =
    []
  let id = 1

  timeline.push({
    id: id++,
    startDate: dayjs(`${startYear}-07-01`),
    label: 'JUL',
  })

  for (let year = startYear + 1; year <= endYear; year++) {
    timeline.push({
      id: id++,
      startDate: dayjs(`${year}-01-01`),
      label: String(year),
    })

    if (year < endYear) {
      timeline.push({
        id: id++,
        startDate: dayjs(`${year}-07-01`),
        label: 'JUL',
      })
    }
  }

  return timeline
}

const timeline = generateTimeline(TIMELINE_START.year(), TIMELINE_END.year())

/* ===================== DATA ===================== */

type TimelineSubTask = {
  icon: React.ComponentType
  // current dataset uses `date`; range datasets may use `startDate/endDate`
  date?: string | dayjs.Dayjs
  startDate?: string | dayjs.Dayjs
  endDate?: string | dayjs.Dayjs
  color: string
  label: string
  gradient: string
}

type TimelineTask = {
  id: number
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
  icon: React.ComponentType
  title: string
  label: string
  subTasks: TimelineSubTask[]
}

const tasks: TimelineTask[] = [
  {
    id: 1,
    startDate: dayjs('2024-06-01'),
    endDate: dayjs('2030-08-15'),
    icon: UserIcon,
    title: 'Nick',
    label: 'Nick',
    subTasks: [
      {
        icon: SalaryIcon,
        startDate: '2024-12-01',
        endDate: '2029-08-31',
        label: 'Gross Annual Salary • $90,000 p.a.',
        color: '#9F7DEF',
        gradient:
          'linear-gradient(72deg, #4E2494 23%, #14141C 76%)',
      },
      {
        icon: MoneyTransferIcon,
        startDate: '2025-02-01',
        endDate: '2029-07-11',
        label: 'Living Expenses • $8,000 p.m.',
        color: '#AF9BFF',
        gradient:
          'linear-gradient(72deg, #423AA0 23%, #14141C 76%)',
      },
      {
        icon: ReceiptDollarIcon,
        startDate: '2025-06-01',
        endDate: '2028-03-15',
        label: 'HECS/HELP Loan • $20,000',
        color: '#2D60ED',
        gradient:
          'linear-gradient(72deg, #25439A 23%, #14141C 76%)',
      },
      {
        icon: GrowingMoneyIcon,
        startDate: '2026-01-01',
        endDate: '2030-06-15',
        label: 'Dependants • 0',
        color: '#35C9D2',
        gradient:
          'linear-gradient(72deg, #33668E 23%, #14141C 76%)',
      },
      {
        icon: MembersIcon,
        startDate: '2025-06-01',
        endDate: '2030-08-15',
        label: 'Side Hustle Income • p.m.',
        color: '#70B595',
        gradient:
          'linear-gradient(72deg, #33858E 23%, #14141C 76%)',
      },
    ],
  },
  {
    id: 2,
    startDate: dayjs('2025-01-01'),
    endDate: dayjs('2030-08-15'),
    icon: HouseIcon,
    title: 'Bondi Property• House',
    label: '',
    subTasks: [
      {
        icon: SalaryIcon,
        startDate: '2025-06-01',
        endDate: '2027-08-31',
        label: 'Gross Annual Salary • $90,000 p.a.',
        color: '#9F7DEF',
        gradient:
          'linear-gradient(72deg, #4E2494 23%, #14141C 76%)',
      },
      {
        icon: MoneyTransferIcon,
        startDate: '2025-04-01',
        endDate: '2035-07-11',
        label: 'Living Expenses • $8,000 p.m.',
        color: '#AF9BFF',
        gradient:
          'linear-gradient(72deg, #423AA0 23%, #14141C 76%)',
      },
      {
        icon: ReceiptDollarIcon,
        startDate: '2025-06-01',
        endDate: '2028-03-15',
        label: 'HECS/HELP Loan • $20,000',
        color: '#2D60ED',
        gradient:
          'linear-gradient(72deg, #25439A 23%, #14141C 76%)',
      },
      {
        icon: GrowingMoneyIcon,
        startDate: '2025-09-01',
        endDate: '2030-06-15',
        label: 'Dependants • 0',
        color: '#35C9D2',
        gradient:
          'linear-gradient(72deg, #33668E 23%, #14141C 76%)',
      },
      {
        icon: MembersIcon,
        startDate: '2025-12-01',
        endDate: '2030-08-15',
        label: 'Side Hustle Income • p.m.',
        color: '#70B595',
        gradient:
          'linear-gradient(72deg, #33858E 23%, #14141C 76%)',
      },
    ],
  },
]

/* ===================== COMPONENT ===================== */

const CalenderTimeline = () => {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const tasksContainerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !buttonRef.current) return

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left
      buttonRef.current!.style.left = `${x}px`
      buttonRef.current!.style.transform = 'translateX(-50%)'
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return
    buttonRef.current.style.left = '-20px'
    buttonRef.current.style.transform = 'none'
  }, [])

  return (
    <>
      <div className="relative w-full max-h-screen overflow-x-auto overflow-y-auto">
        {/* ===== STICKY TIMELINE HEADER (labels) ===== */}
        <div className="sticky top-0 z-20 ml-[15px] bg-[#14141C]">
          <div className="relative h-[17px]" style={{ width: TIMELINE_WIDTH + 20 }}>
            {timeline.map((item) => (
              <div
                key={item.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: item.startDate.diff(TIMELINE_START, 'day') * PX_PER_DAY,
                }}
              >
                <span className="text-[#9494B3] text-[12px]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative top-[7px]"
          style={{ width: TIMELINE_WIDTH + 20 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* ===== TIMELINE GRID (vertical lines) ===== */}
          <div className="absolute inset-0 z-1 pointer-events-none ml-[25px]">
            {timeline.map((item) => (
              <div
                key={item.id}
                className="absolute flex flex-col items-center h-full"
                style={{
                  left: item.startDate.diff(TIMELINE_START, 'day') * PX_PER_DAY,
                }}
              >
                <div className="w-px h-full bg-[#333348]" />
              </div>
            ))}
          </div>

          {/* ===== TASKS (layout stays column-based; range bars inside rows) ===== */}
          <div
            ref={tasksContainerRef}
            className="relative flex flex-col z-10 gap-3.5 top-[45px] ml-[25px]"
          >
            {tasks.map(task => (
              <div key={task.id} className="flex flex-col gap-2">
                <Task
                  task={task}
                  isExpanded={expandedTaskId === task.id}
                  onToggle={() =>
                    setExpandedTaskId(prev => (prev === task.id ? null : task.id))
                  }
                />

                {expandedTaskId === task.id && (
                  <div className="flex flex-col gap-3.5">
                    {task.subTasks.map((st, i) => (
                      <SubTaskRow key={i} subTask={st} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <TimelineActionButton
            ref={buttonRef}
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
      </div>

      <div
        className={`absolute z-50 top-0 right-0 h-full transition-all duration-300 ${
          isSidebarOpen
            ? 'w-[407px] opacity-100'
            : 'w-0 opacity-0 overflow-hidden'
        }`}
      >
        <RightSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
    </>
  )
}

/* ===================== SUB COMPONENTS ===================== */

const TimelineActionButton = forwardRef<
  HTMLDivElement,
  { onClick?: React.MouseEventHandler<HTMLButtonElement> }
>(({ onClick }, ref) => (
  <div
    ref={ref}
    className="absolute z-1 h-full top-[6px] flex flex-col items-center"
    style={{ left: '-7px' }}
  >
    <Button
      onClick={onClick}
      className="bg-white flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px]"
    >
      <PlusIcon />
      JUL
    </Button>
    <div className="w-[3px] h-full bg-white" />
  </div>
))

TimelineActionButton.displayName = 'TimelineActionButton'

const Task = ({
  task,
  isExpanded,
  onToggle,
}: {
  task: TimelineTask
  isExpanded: boolean
  onToggle: () => void
}) => (
  <div className="relative h-[74px]">
    {/* Sub-task icons positioned on the timeline line (by startDate) */}
    <div className="absolute inset-0 pointer-events-none">
      {(() => {
        const byDayOffset = new Map<number, TimelineSubTask[]>()

        task.subTasks.forEach((st) => {
          const d = clampToTimeline(dayjs(st.startDate ?? st.date ?? task.startDate))
          const dayOffset = d.diff(TIMELINE_START, 'day')
          const group = byDayOffset.get(dayOffset)
          if (group) group.push(st)
          else byDayOffset.set(dayOffset, [st])
        })

        const BASE_TOP_PX = 48.5 // aligns icons roughly with the task bar line
        const STACK_OFFSET_PX = 4 // overlap amount when multiple icons share a day

        return Array.from(byDayOffset.entries()).flatMap(([dayOffset, group]) => {
          const left = dayOffset * PX_PER_DAY
          return group.map((st, stackIndex) => (
            <div
              key={`${dayOffset}-${stackIndex}`}
              className="absolute"
              style={{
                left,
                top: BASE_TOP_PX,
                zIndex: 10 + stackIndex,
                transform: `translate(-50%, -50%) translateY(${stackIndex * STACK_OFFSET_PX}px)`,
              }}
            >
              <SubTaskCircle subTask={st} />
            </div>
          ))
        })
      })()}
    </div>

    {/* Task bar (range-based) */}
    <div
      className="absolute flex flex-col gap-1 h-[52px]"
      style={getRangeStyle(task.startDate, task.endDate)}
      onClick={onToggle}
      aria-expanded={isExpanded}
    >
      <p className="text-[12px] ml-2 text-[#9494B3]">{task.title}</p>
      <div className="flex bg-[#252534] p-[13px] border border-[#9F7DEF] rounded-xl cursor-pointer">
        <div className="flex gap-1 items-center text-white">
          <task.icon />
          <span>{task.label}</span>
        </div>
      </div>
    </div>
  </div>
)

const SubTaskRow = ({ subTask }: { subTask: TimelineSubTask }) => {
  // data model in this file uses `date` (single-day events)
  const start = subTask.startDate ?? TIMELINE_START
  const end = subTask.endDate ?? start

  return (
    <div className="relative h-[44px]">
      <div
        className="absolute top-0 flex items-center gap-1.5 rounded-full p-[12px] text-[#F0F0F4]"
        style={{
          ...getRangeStyle(start, end),
          background: subTask.gradient,
          border: `1px solid ${subTask.color}`,
        }}
      >
        <subTask.icon />
        <span>{subTask.label}</span>
      </div>
    </div>
  )
}

const SubTaskCircle = ({ subTask }: { subTask: TimelineSubTask }) => (
  <div
    className="flex items-center justify-center rounded-full p-[4px]"
    style={{ background: subTask.color }}
  >
    <subTask.icon />
  </div>
)

export default CalenderTimeline
