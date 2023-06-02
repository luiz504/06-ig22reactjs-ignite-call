import { useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { Calendar } from './Calendar'
import {
  Container,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

import { api } from '~/lib/axios'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const router = useRouter()
  const userName = String(router.query.username)

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null

  const dayAndMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYYY-MM-DD')
    : null

  const { data: availability } = useQuery<Availability>({
    queryKey: ['user-availability', { userName, selectedDateWithoutTime }],
    queryFn: async () => {
      const response = await api.get(`/users/${userName}/availability`, {
        params: {
          date: selectedDateWithoutTime,
        },
      })

      return response.data
    },
    enabled: !!selectedDate,
    staleTime: 30 * 1000, // 30 secs
  })

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader>
            {weekDay} <span> {dayAndMonth}</span>
          </TimePickerHeader>
          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={`possibleTime-${hour}`}
                type="button"
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePickerContainer>
      )}
    </Container>
  )
}
