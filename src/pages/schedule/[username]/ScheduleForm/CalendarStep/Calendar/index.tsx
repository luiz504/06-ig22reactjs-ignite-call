import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'

import {
  CalendarActions,
  CalendarBody,
  CalendarContainer,
  CalendarDay,
  CalendarHeader,
  CalendarTitle,
} from './styles'

import { getWeekDays } from '~/utils/get-week-days'
import { api } from '~/lib/axios'

interface CalendarWeeek {
  week: number
  days: Array<{ date: dayjs.Dayjs; disabled: boolean }>
}

type CalendarWeeks = CalendarWeeek[]

interface CalendarProps {
  selectedDate?: Date | null
  onDateSelect: (date: Date) => void
}

interface BlockedDates {
  blockedWeekDays: number[]
  blockedDates: number[]
}

export const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs().set('date', 1)
  })

  const shortWeekDays = getWeekDays({ short: true })

  const currentMonth = currentDate.format('MMMM')
  const currentYear = currentDate.format('YYYY')

  function handlePreviousMonth() {
    const previousMonth = currentDate.subtract(1, 'month')

    setCurrentDate(previousMonth)

    // console.log('handlePreviousMonth', { previousMonth, currentDate })
  }
  function handleNextMonth() {
    const nextMonth = currentDate.add(1, 'month')
    setCurrentDate(nextMonth)

    // console.log('handlenextMonth', { nextMonth, currentDate })
  }

  const router = useRouter()

  const userName = String(router.query.username)

  const { data: blockedDates } = useQuery<BlockedDates>({
    queryKey: ['blocked-dates', { userName, currentYear, currentMonth }],
    queryFn: async () => {
      const response = await api.get(`/users/${userName}/blocked-dates`, {
        params: {
          year: currentDate.get('year'),
          month: currentDate.get('month'),
        },
      })
      return response.data
    },
  })

  const calendarWeeks = useMemo(() => {
    if (!blockedDates) {
      return []
    }
    const daysInMonthArray = Array.from(
      { length: currentDate.daysInMonth() },
      (_, i) => {
        const date = currentDate.set('date', i + 1)

        const disabled =
          date.endOf('day').isBefore(new Date()) ||
          !!blockedDates.blockedWeekDays.includes(date.get('day')) ||
          !!blockedDates.blockedDates.includes(date.get('date'))

        return { date, disabled }
      },
    )

    const firstWeekDay = currentDate.get('day')

    const previousMonthFillArray = Array.from(
      { length: firstWeekDay },
      (_, i) => ({ date: currentDate.subtract(i + 1, 'day'), disabled: true }),
    ).reverse()

    const lastDayInCurrentMonth = currentDate.set(
      'date',
      currentDate.daysInMonth(),
    )
    const lastWeekDay = lastDayInCurrentMonth.get('day')

    const nextMonthFillArray = Array.from(
      {
        length: 7 - (lastWeekDay + 1),
      },
      (_, i) => ({
        date: lastDayInCurrentMonth.add(i + 1, 'day'),
        disabled: true,
      }),
    )

    const calendarDays = [
      ...previousMonthFillArray,
      ...daysInMonthArray,
      ...nextMonthFillArray,
    ]

    const calendarWeeksArray = calendarDays.reduce<CalendarWeeks>(
      (weeks, _, i, original) => {
        const isNewWeek = i % 7 === 0

        if (isNewWeek) {
          weeks.push({ week: i / 7 + 1, days: original.slice(i, i + 7) })
        }
        return weeks
      },
      [],
    )

    return calendarWeeksArray
  }, [currentDate, blockedDates])

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarTitle>
          {currentMonth} <span>{currentYear}</span>
        </CalendarTitle>
        <CalendarActions>
          <button type="button" onClick={handlePreviousMonth}>
            <CaretLeft />
          </button>
          <button type="button" onClick={handleNextMonth}>
            <CaretRight />
          </button>
        </CalendarActions>
      </CalendarHeader>
      <CalendarBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(({ week, days }) => (
            <tr key={week}>
              {days.map(({ date, disabled }) => (
                <td key={date.toString()}>
                  <CalendarDay
                    disabled={disabled}
                    onClick={() => onDateSelect(date.toDate())}
                  >
                    {date.get('date')}
                  </CalendarDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarBody>
    </CalendarContainer>
  )
}
