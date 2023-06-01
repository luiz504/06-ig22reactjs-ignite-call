import React from 'react'

import { ConfirmForm, FormHeader, FormError, FormActions } from './styles'
import { useForm } from 'react-hook-form'
import { CalendarBlank, Clock } from 'phosphor-react'
import { Button, Text, TextInput, Textarea } from '@luiz504-ignite-ui/react'

export function ConfirmStep() {
  const { handleSubmit } = useForm()
  async function handleConfirmSchedulling() {}
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
        <TextInput placeholder="Seu nome" autoComplete="name" />
      </label>
      <label>
        <Text size={'sm'}>Endereço de e-mail</Text>
        <TextInput placeholder="fulano@exemplo.com" autoComplete="email" />
      </label>

      <label>
        <Text size={'sm'}>Observações</Text>
        <Textarea />
        <FormError>Some error</FormError>
      </label>

      <FormActions>
        <Button variant={'tertiary'}>Cancelar</Button>

        <Button type="submit">Cancelar</Button>
      </FormActions>
    </ConfirmForm>
  )
}
