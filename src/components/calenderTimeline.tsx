import { useMemo } from 'react'
import Timeline, { TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import dayjs from 'dayjs'

const CalenderTimeline = () => {
  // Sample groups (e.g., different projects, teams, or categories)
  const groups = useMemo(() => [
    { id: 1, title: 'Project Alpha' },
    { id: 2, title: 'Project Beta' },
    { id: 3, title: 'Project Gamma' },
  ], [])

  // Sample items (events/tasks on the timeline)
  const items = useMemo(() => [
    {
      id: 1,
      group: 1,
      title: 'Task 1',
      start_time: dayjs().subtract(2, 'day').toDate(),
      end_time: dayjs().subtract(1, 'day').toDate(),
    },
    {
      id: 2,
      group: 1,
      title: 'Task 2',
      start_time: dayjs().subtract(1, 'day').toDate(),
      end_time: dayjs().add(1, 'day').toDate(),
    },
    {
      id: 3,
      group: 2,
      title: 'Task 3',
      start_time: dayjs().toDate(),
      end_time: dayjs().add(2, 'days').toDate(),
    },
    {
      id: 4,
      group: 3,
      title: 'Task 4',
      start_time: dayjs().add(1, 'day').toDate(),
      end_time: dayjs().add(3, 'days').toDate(),
    },
  ], [])

  // Default time range (visible on initial load)
  const defaultTimeStart = useMemo(() => dayjs().subtract(3, 'days').valueOf(), [])
  const defaultTimeEnd = useMemo(() => dayjs().add(5, 'days').valueOf(), [])

  return (
    <div className="flex flex-col gap-4 calendar-timeline-container">
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
        lineHeight={60}
        itemHeightRatio={0.75}
        canMove={true}
        canResize={true}
        canSelect={true}
      >
        <TimelineMarkers>
          <TodayMarker />
        </TimelineMarkers>
      </Timeline>
    </div>
  )
}

export default CalenderTimeline