import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const { date } = req.query

  if (!date) {
    return res.status(400).json({ message: 'Date not provided.' })
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'Users does not exist.' })
  }

  const refDate = dayjs(String(date))

  if (!refDate.isValid()) {
    return res.status(400).json({ message: 'Invalid date' })
  }

  const isPastDate = refDate.endOf('day').isBefore(new Date())

  if (isPastDate) {
    return res.json({
      possibleTimes: [],
      availableTimes: [],
    })
  }

  const userAvailability = await prisma.userTimeInterval.findFirst({
    where: {
      user_id: user.id,
      week_day: refDate.get('day'),
    },
  })

  if (!userAvailability) {
    return res.json({
      possibleTimes: [],
      availableTimes: [],
    })
  }

  const { time_start_in_minutes, time_end_in_minutes } = userAvailability

  const startHour = time_start_in_minutes / 60
  const endHour = time_end_in_minutes / 60

  const possibleTimes = Array.from(
    { length: endHour - startHour },
    (_, i) => startHour + i,
  )

  const blockedTimes = await prisma.scheduling.findMany({
    select: {
      date: true,
    },
    where: {
      user_id: user.id,

      date: {
        gte: refDate.set('hour', startHour).toDate(),
        lte: refDate.set('hour', endHour).toDate(),
      },
    },
  })
  const availableTimes = possibleTimes.filter((time) => {
    const isTimeBlocked = !blockedTimes.some(
      (blockedTime) => blockedTime.date.getHours() === time,
    )

    const isTimePassed = refDate.set('hour', time).isBefore(new Date())

    return !isTimePassed && !isTimeBlocked
  })

  return res.json({
    possibleTimes,
    availableTimes,
  })
}
