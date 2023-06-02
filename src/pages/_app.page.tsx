import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { globalStyles } from '~/styles/global'

import '~/lib/dayjs'
import { queryClient } from '~/lib/react-query'
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
