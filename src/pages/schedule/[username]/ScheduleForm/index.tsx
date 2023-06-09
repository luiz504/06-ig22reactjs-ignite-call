import { useState } from 'react'

import { CalendarStep } from './CalendarStep'
import { ConfirmStep } from './ConfirmStep'

export const ScheduleForm = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)

  function handleResetSelectedDateTime() {
    setSelectedDateTime(null)
  }

  if (selectedDateTime) {
    return (
      <ConfirmStep
        schedulingDate={selectedDateTime}
        onCancel={handleResetSelectedDateTime}
        onSuccess={handleResetSelectedDateTime}
      />
    )
  }

  return <CalendarStep onSeletectDateTime={setSelectedDateTime} />
}
