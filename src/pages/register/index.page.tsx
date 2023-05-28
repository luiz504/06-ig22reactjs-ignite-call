import React from 'react'

import { Container, Form, FormError, Header } from './styles'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@luiz504-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

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
    formState: { errors, isSubmitting },
  } = useForm<RegisterFomData>({ resolver: zodResolver(registerFormSchema) })

  async function handleRegister(data: RegisterFomData) {
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