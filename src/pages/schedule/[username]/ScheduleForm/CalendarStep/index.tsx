import { Calendar } from '~/components/Calendar'
import {
  Container,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'

export const CalendarStep = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const isDateSelected = !!selectedDate

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null

  const dayAndMonth = selectedDate
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader>
            {weekDay} <span> {dayAndMonth}</span>
          </TimePickerHeader>
          <TimePickerList>
            <TimePickerItem type="button" disabled>
              08:00h
            </TimePickerItem>
            <TimePickerItem type="button">09:00h</TimePickerItem>
            <TimePickerItem type="button">10:00h</TimePickerItem>
            <TimePickerItem type="button">11:00h</TimePickerItem>
            <TimePickerItem type="button">12:00h</TimePickerItem>
            <TimePickerItem type="button">13:00h</TimePickerItem>
            <TimePickerItem type="button">14:00h</TimePickerItem>
            <TimePickerItem type="button">15:00h</TimePickerItem>
            <TimePickerItem type="button">16:00h</TimePickerItem>
            <TimePickerItem type="button">17:00h</TimePickerItem>
            <TimePickerItem type="button">18:00h</TimePickerItem>
          </TimePickerList>
        </TimePickerContainer>
      )}
    </Container>
  )
}
