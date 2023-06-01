import { Box, Text, styled } from '@luiz504-ignite-ui/react'

export const ProfileBox = styled(Box, {
  marginTop: '$6',
  gap: '$4',

  '&, label': {
    display: 'flex',
    flexDirection: 'column',
  },

  label: {
    gap: '$2',
  },
})

export const FormAnnotation = styled(Text, {
  color: '$gray200',
})
