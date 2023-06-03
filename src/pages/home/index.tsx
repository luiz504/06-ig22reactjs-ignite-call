import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { Heading, Text } from '@luiz504-ignite-ui/react'

import previewImg from '~/assets/preview.png'

import { ClaimUsernameForm } from './components/ClaimUsernameForm'

import { Hero, HomeContainer, Preview } from './styles'

export default function Home() {
  const description =
    'Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre.'

  return (
    <>
      <NextSeo
        title="Descomplique a sua agenda | Ignite Call"
        description={description}
      />

      <HomeContainer>
        <Hero>
          <Heading as={'h1'} size={'4xl'}>
            Agendamento Descomplicado
          </Heading>

          <Text size={'xl'}>{description}</Text>
          <ClaimUsernameForm />
        </Hero>

        <Preview>
          <Image
            src={previewImg}
            alt="Calendário simbolizando aplicação em funcionamento"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </HomeContainer>
    </>
  )
}
