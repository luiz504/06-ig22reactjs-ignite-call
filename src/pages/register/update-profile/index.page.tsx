import { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  Textarea,
} from '@luiz504-ignite-ui/react'

import { api } from '~/lib/axios'

import { buildNextAuthOptions } from '~/pages/api/auth/[...nextauth].api'

import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const session = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    await api.put('/users/profile', { bio: data.bio })

    await router.push(`/schedule/${session.data?.user.username}`)
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={4} />

          <ProfileBox as={'form'} onSubmit={handleSubmit(handleUpdateProfile)}>
            <label>
              <Text size="sm">Foto de Perfil</Text>

              <Avatar
                src={session.data?.user.avatar_url}
                alt={session.data?.user.name}
              />
            </label>

            <label>
              <Text size="sm">Sobre voce</Text>
              <Textarea {...register('bio')} />

              <FormAnnotation size="sm">
                Fale um pouco sobre você. Isto será exibido em sua página
                pessoal.
              </FormAnnotation>
            </label>

            <Button type="submit" disabled={isSubmitting}>
              Finalizar
            </Button>
          </ProfileBox>
        </Header>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  return {
    props: {
      session,
    },
  }
}
