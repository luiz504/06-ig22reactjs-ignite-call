import { GetStaticPaths, GetStaticProps } from 'next'

import { Container, UserHeader } from './styles'
import { Avatar, Heading, Text } from '@luiz504-ignite-ui/react'
import { prisma } from '~/lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'

interface ScheduleProps {
  user: {
    name: string
    bio: string | null
    avatarUrl: string | null
  }
}
export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />

      <Container>
        <UserHeader>
          <Avatar
            src={user.avatarUrl || ''}
            alt={`${user.name} profile picture`}
          />
          <Heading>{user.name}</Heading>
          {user.bio && <Text>{user.bio}</Text>}
        </UserHeader>
        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return { notFound: true }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    } as ScheduleProps,

    revalidate: 60 * 60 * 24, // 1day
  }
}
