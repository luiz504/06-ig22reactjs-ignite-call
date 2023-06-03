import { useState } from 'react'

import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export const ScheduleForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  function handleCancelConfirmation() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancel={handleCancelConfirmation}
      />
    )
  }

  return <CalendarStep onSeletectDateTime={setSelectedDateTime} />
}
