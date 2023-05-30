export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys())
    .map((value) => formatter.format(new Date(Date.UTC(2021, 5, value))))
    .map((value) =>
      value.substring(0, 1).toUpperCase().concat(value.substring(1)),
    )
}
