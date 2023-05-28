import { Button, TextInput } from '@luiz504-ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

import { Container } from './styles'

export const ClaimUsernameForm = () => {
  return (
    <Container as={'form'}>
      <TextInput size={'sm'} prefix="ignite.com/" placeholder="seu-usuario" />

      <Button size={'sm'} type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </Container>
  )
}
