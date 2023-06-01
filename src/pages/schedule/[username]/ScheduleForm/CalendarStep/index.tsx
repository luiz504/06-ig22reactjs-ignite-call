import { Calendar } from '~/components/Calendar'
import {
  Container,
  TimePickerContainer,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from './styles'

export const CalendarStep = () => {
  const isDateSelected = true
  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar />
      {isDateSelected && (
        <TimePickerContainer>
          <TimePickerHeader>
            Terca-feira <span> 20 de junho</span>
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
