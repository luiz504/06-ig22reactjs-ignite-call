/**
 * Converts a time string in the format "H:MM" or "HH:MM" to minutes.
 * @throws {Error} If the input time string is invalid.
 */
export function convertTimeStringToMinutes(timeString: string) {
  const timePattern = /^([0-9]|[01]\d|2[0-3]):([0-5]\d)$/
  if (!timePattern.test(timeString)) {
    throw new Error('Invalid time string. Expected format: H:MM or HH:MM')
  }
  const [hours, minutes] = timeString.split(':').map(Number)

  return hours * 60 + minutes
}
