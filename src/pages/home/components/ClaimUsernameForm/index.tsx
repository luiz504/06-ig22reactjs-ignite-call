import { useRouter } from 'next/router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { Button, Text, TextInput } from '@luiz504-ignite-ui/react'

import { Container, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
  userName: z
    .string()
    .min(3, { message: 'O usuário deve ter pelomenos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário porde ter apenas letras e hifens.',
    })
    .transform((value) => value.toLowerCase()),
})

type ClaimUSernameFormData = z.infer<typeof claimUsernameFormSchema>

export const ClaimUsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUSernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })
  const router = useRouter()

  async function handleClaimUsername(data: ClaimUSernameFormData) {
    const { userName } = data

    await router.push(`/register?username=${userName}`)
  }

  return (
    <>
      <Container as={'form'} onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size={'sm'}
          prefix="ignite.com/"
          placeholder="seu-usuario"
          {...register('userName')}
          disabled={isSubmitting}
        />

        <Button size={'sm'} type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Container>
      <FormAnnotation>
        <Text size={'sm'}>
          {errors.userName
            ? errors.userName.message
            : 'Digite o nome do usuário.'}
        </Text>
      </FormAnnotation>
    </>
  )
}
