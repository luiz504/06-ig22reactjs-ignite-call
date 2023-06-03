import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CalendarBlank, Clock } from 'phosphor-react'
import { Button, Text, TextInput, Textarea } from '@luiz504-ignite-ui/react'

import { ConfirmForm, FormHeader, FormActions } from './styles'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormError } from '~/components/FormError'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormType = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmFormType>({
    resolver: zodResolver(confirmFormSchema),
  })
  async function handleConfirmSchedulling(data: ConfirmFormType) {
    console.log('data', data) // eslint-disable-line
  }

  return (
    <ConfirmForm as={'form'} onSubmit={handleSubmit(handleConfirmSchedulling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de Setembro de 2022
        </Text>

        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>

      <label>
        <Text size={'sm'}>Nome Completo</Text>
        <TextInput
          placeholder="Seu nome"
          autoComplete="name"
          {...register('name')}
        />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput
          placeholder="fulano@exemplo.com"
          autoComplete="email"
          {...register('email')}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size={'sm'}>Observações</Text>
        <Textarea {...register('observations')} />
      </label>

      <FormActions>
        <Button variant={'tertiary'}>Cancelar</Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
