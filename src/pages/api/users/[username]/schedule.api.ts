import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { getGoogleOAuthToken } from '~/lib/google'
import { prisma } from '~/lib/prisma'

const createScredulingRequestBody = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  observations: z.string().nullable(),
  date: z.string().datetime(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'Users does not exist.' })
  }

  const { name, email, observations, date } = createScredulingRequestBody.parse(
    req.body,
  )

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: 'The Hour informed already past.' })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res
      .status(400)
      .json({ message: 'There is another scheduling at the same time.' })
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      user_id: user.id,
      date: schedulingDate.toDate(),
      email,
      name,
      observations,
    },
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: await getGoogleOAuthToken(user.id),
  })
  try {
    await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Ignite Call: ${name}`,
        description: observations,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, 'hour').format(),
        },
        attendees: [{ email, displayName: name }],
        conferenceData: {
          createRequest: {
            requestId: scheduling.id,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    })
  } catch (err) {
    await prisma.scheduling.delete({ where: { id: scheduling.id } })

    return res
      .status(400)
      .json({ message: 'Failed to create schedule at google calendar', err })
  }

  return res.status(201).end()
}
