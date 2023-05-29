import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowRight } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@luiz504-ignite-ui/react'

import { AxiosError, api } from '~/lib/axios'

import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  userName: z
    .string()
    .min(3, { message: 'O usuário deve ter pelomenos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário porde ter apenas letras e hifens.',
    })
    .transform((value) => value.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome do usuário deve ter pelomenos 3 letras.' }),
})

type RegisterFomData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFomData>({ resolver: zodResolver(registerFormSchema) })

  const router = useRouter()

  useEffect(() => {
    const userName = router.query?.username

    if (userName) {
      setValue('userName', Array.isArray(userName) ? userName[0] : userName)
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFomData) {
    try {
      await api.post('/users', { name: data.name, username: data.userName })

      await router.push('/register/connect-calendar')
    } catch (err: any) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err?.response?.data?.message)
        return
      }
      console.log('err ##', err) //eslint-disable-line 
    }
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep size={4} currentStep={1} />

        <Form as={'form'} onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm"> Nome de usuário</Text>
            <TextInput
              prefix={'ignite.com/'}
              placeholder="seu-usuário"
              {...register('userName')}
            />
            {errors.userName && (
              <FormError size="sm">{errors.userName.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm"> Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register('name')} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo <ArrowRight />
          </Button>
        </Form>
      </Header>
    </Container>
  )
}
