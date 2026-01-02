import React, { useRef, useCallback, forwardRef, useState } from 'react'
import dayjs from 'dayjs'
import { GrowingMoneyIcon, HouseDollerIcon, HouseIcon, MembersIcon, MoneyTransferIcon, PercentageIcon, PlusIcon, RatingsIcon, ReceiptDollarIcon, SalaryIcon, UserIcon } from './icons';
import Button from './button';
import RightSidebar from './rightSidebar';

// Generate timeline array dynamically
// Pattern: Every 6 months (July and January), July shows "JUL", January shows the year
// Starts with July of startYear, then alternates: Jan (next year), Jul (same year), Jan (next year), etc.
// Ends with January of endYear
const generateTimeline = (startYear: number, endYear: number) => {
  const timeline: Array<{ id: number; startDate: dayjs.Dayjs; label: string }> = []
  let id = 1

  // Start with July of the start year
  timeline.push({
    id: id++,
    startDate: dayjs(`${startYear}-07-01`),
    label: 'JUL'
  })

  // Then for each year from startYear+1 to endYear, add January and July
  for (let year = startYear + 1; year <= endYear; year++) {
    // Add January entry
    timeline.push({
      id: id++,
      startDate: dayjs(`${year}-01-01`),
      label: String(year)
    })

    // Add July entry (except if this is the last year)
    if (year < endYear) {
      timeline.push({
        id: id++,
        startDate: dayjs(`${year}-07-01`),
        label: 'JUL'
      })
    }
  }

  return timeline
}

const timeline = generateTimeline(2024, 2028)

const tasks = [
  {
    id: 1,
    startDate: dayjs('2024-06-01'),
    endDate: dayjs('2024-06-01'),
    icon: UserIcon,
    title: "",
    label: "Nick",
    subTasks: [
      {
        icon: SalaryIcon,
        date: "2024-06-01",
        color: "#9F7DEF",
        label: "Gross Annual Salary • $90,000 p.a.",
        gradient: "linear-gradient(72.76deg, #4E2494 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #AC85FF 0%, #7D2CE3 100%)",
      },
      {
        icon: MoneyTransferIcon,
        date: "2024-06-05",
        color: "#AF9BFF",
        label: "Living Expenses • $8,000 p.m.",
        gradient: "linear-gradient(72.76deg, #423AA0 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #AF9BFF 0%, #7561EE 100%)",
      },
      {
        icon: ReceiptDollarIcon,
        date: "2024-06-10",
        color: "#AF9BFF",
        label: "HECS/HELP Loan • $20,000",
        gradient: "linear-gradient(72.76deg, #25439A 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #9BB6FF 0%, #2D60ED 100%, #2D60ED 100%)",
      },
      {
        icon: GrowingMoneyIcon,
        date: "2024-06-15",
        color: "#35C9D2",
        label: "Dependants • 0",
        gradient: "linear-gradient(72.76deg, #33668E 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #459AD9 0%, #459AD9 100%)",
      },
      {
        icon: MembersIcon,
        date: "2024-06-20",
        color: "#459AD9",
        label: "Side Hustle Income • p.m.",
        gradient: "linear-gradient(72.76deg, #33858E 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #8EDDE2 0%, #35C9D2 100%)",
      },
      {
        icon: MembersIcon,
        date: "2024-06-20",
        color: "#70B595",
        label: "Monthly Bonus• $1000",
        gradient: "linear-gradient(72.76deg, #4D7666 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #BFEDD7 0%, #70B595 100%)",
      }
    ]
  },
  {
    id: 2,
    startDate: dayjs('2024-06-01'),
    endDate: dayjs('2024-06-30'),
    title: "Bondi Property• House",
    icon: HouseIcon,
    label: "",
    subTasks: [
      {
        icon: RatingsIcon,
        date: "2024-06-05",
        color: "#7D2CE3",
        label: "Gross Annual Salary • $90,000 p.a.",
        gradient: "linear-gradient(72.76deg, #4E2494 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #AC85FF 0%, #7D2CE3 100%)",
      },
      {
        icon: PercentageIcon,
        date: "2024-06-10",
        color: "#459AD9",
        label: "Gross Annual Salary • $90,000 p.a.",
        gradient: "linear-gradient(72.76deg, #4E2494 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #AC85FF 0%, #7D2CE3 100%)",
      },
      {
        icon: HouseDollerIcon,
        color: "#70B595",
        date: "2024-06-15",
        label: "Gross Annual Salary • $90,000 p.a.",
        gradient: "linear-gradient(72.76deg, #4E2494 23.68%, #14141C 76.32%)",
        border: "linear-gradient(180deg, #AC85FF 0%, #7D2CE3 100%)",
      }
    ]
  }
]

const CalenderTimeline = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const tasksContainerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !buttonRef.current) return

    // Skip mouse tracking if mouse is over tasks container
    if (tasksContainerRef.current) {
      const tasksRect = tasksContainerRef.current.getBoundingClientRect()
      const mouseX = e.clientX
      const mouseY = e.clientY
      
      // Check if mouse is within tasks container bounds
      if (
        mouseX >= tasksRect.left &&
        mouseX <= tasksRect.right &&
        mouseY >= tasksRect.top &&
        mouseY <= tasksRect.bottom
      ) {
        return // Skip button movement when over tasks
      }
    }

    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Use requestAnimationFrame for smooth updates
    animationFrameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current || !buttonRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      
      // Direct DOM manipulation for instant response (no React re-render delay)
      buttonRef.current.style.transition = 'none' // Remove transition during tracking
      buttonRef.current.style.left = `${x}px`
      buttonRef.current.style.transform = 'translateX(-50%)'
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!buttonRef.current) return
    
    // Restore transition and reset to default position
    buttonRef.current.style.transition = 'all 0.3s ease-out'
    buttonRef.current.style.left = '-20px'
    buttonRef.current.style.transform = 'none'
  }, [])

  return (
   <React.Fragment>
     <div 
      ref={containerRef}
      className='relative'
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute h-full flex gap-[130px] z-1">
        {timeline.map((item) => {
          return (
            <div className='flex flex-col items-center gap-1.5' key={item.id}>
              <span className="text-[#9494B3] text-[12px] font-normal">{item.label}</span>
              <div className="w-px h-full bg-[#333348]"></div>
            </div>
          )
        })}
      </div>
      <div 
        ref={tasksContainerRef}
        className="flex flex-col z-10 gap-3.5 top-1/5 left-2.5 w-full h-fit mt-[73px]"
      >
        {tasks.map((task, i)=> {
          return (
            <div key={task.id ?? i} className='flex flex-col gap-2 z-10'>
              <Task
                task={task}
                isExpanded={expandedTaskId === task.id}
                onToggle={(taskId) =>
                  setExpandedTaskId((prev) => (prev === taskId ? null : taskId))
                }
              />
              {expandedTaskId === task.id && (
                <div className='flex flex-col gap-2'>
                  {task.subTasks.map((subTask, subTaskIndex) => {
                    return <SubTaskRow key={subTaskIndex} subTask={subTask} />
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <TimelineActionButton ref={buttonRef} onClick={() => setIsSidebarOpen(true)} />
    </div>
    <div className={`absolute z-10 top-0 right-0 h-full transition-all duration-300 ${isSidebarOpen ? 'w-[407px] opacity-100' : 'w-0 opacity-0 overflow-hidden display-none'}`}>
        <RightSidebar onClose={() => setIsSidebarOpen(false)} />
    </div> 
   </React.Fragment>
  )
}

interface TimelineActionButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TimelineActionButton = forwardRef<HTMLDivElement, TimelineActionButtonProps>(({ onClick }, ref) => { 
  return (
    <div 
      ref={ref}
      className='absolute z-1 h-full top-[30px] flex flex-col items-center'
      style={{ 
        left: '-20px', // Default position
        transition: 'all 0.3s ease-out' // Only used when returning to default
      }}
    >
        <Button onClick={onClick} className='bg-white cursor-pointer flex gap-1 items-center justify-center px-3 py-1.5 rounded-full text-[12px]'>
          <PlusIcon />
          JUL
        </Button>
        <div className="w-[3px] h-full bg-[white]"></div>
      </div>
  )
})

TimelineActionButton.displayName = 'TimelineActionButton'

const Task = ({
  task,
  isExpanded,
  onToggle,
}: {
  task: typeof tasks[number]
  isExpanded: boolean
  onToggle: (taskId: number) => void
}) => {
  return <div>
    <p className='text-[#B1B1C8] text-[10px] font-semibold ml-2 mb-1'>{task.title}</p>
    <div
      className='flex bg-[#252534] p-[13px] border border-[#9F7DEF] rounded-xl cursor-pointer'
      onClick={() => onToggle(task.id)}
      aria-expanded={isExpanded}
    >
      <div className='flex gap-1 text-white items-center'>
        <task.icon />
          <span>{task.label}</span>
          <div className='flex gap-1'>
            {task.subTasks.map((subTask, index) => {
              return <SubTaskCircle key={index} subTask={subTask} />
            })}
          </div>
      </div>
    </div>
  </div>
}


const SubTaskRow = ({ subTask }: { subTask: typeof tasks[number]['subTasks'][number] }) => { 
  return (
    <div className="flex items-center gap-1.5 rounded-full p-[12px] text-[#F0F0F4]" style={{
      background: subTask.gradient,
      border: `1px solid ${subTask.color}`,
    }}>
      <subTask.icon />
      <span>{subTask.label}</span>
    </div>
  )
}


const SubTaskCircle = ({ subTask }: { subTask: typeof tasks[number]['subTasks'][number] }) => {
  return (
    <div className="flex items-center justify-center rounded-full p-[4px]" style={{ background: subTask.color }}>
      <div className={`text-[#1E1E2A]`}>
        <subTask.icon />
      </div>
    </div>
  )
}

export default CalenderTimeline