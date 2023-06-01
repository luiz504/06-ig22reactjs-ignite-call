interface GetWeekDaysParams {
  short?: boolean
}
export function getWeekDays({ short }: GetWeekDaysParams) {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })

  return Array.from(Array(7).keys())
    .map((value) => formatter.format(new Date(Date.UTC(2021, 5, value))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toLocaleUpperCase()
      }
      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
