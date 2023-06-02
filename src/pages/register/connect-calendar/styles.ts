import { Box, styled } from '@luiz504-ignite-ui/react'
import { FormError } from '~/components/FormError'

export const ConnectBox = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',

  marginBottom: '$4',
})

export const AuthError = styled(FormError, {
  marginBottom: '$4',
})
