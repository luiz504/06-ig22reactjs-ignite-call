import { GetServerSideProps } from 'next'
// import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  Textarea,
} from '@luiz504-ignite-ui/react'

import { Container, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '~/pages/api/auth/[...nextauth].api'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileFormData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileFormSchema),
  })

  // const session = useSession()

  // console.log('session', session)

  async function handleUpdateProfile(data: UpdateProfileFormData) {
    console.log('data', data) //eslint-disable-line 
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={4} />

        <ProfileBox as={'form'} onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de Perfil</Text>
          </label>

          <label>
            <Text size="sm">Sobre voce</Text>
            <Textarea placeholder="Seu nome" {...register('bio')} />

            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
          </Button>
        </ProfileBox>
      </Header>
    </Container>
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
