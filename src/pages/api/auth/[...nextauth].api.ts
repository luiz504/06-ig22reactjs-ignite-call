import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const googleAuthScopesDict = {
  email: 'https://www.googleapis.com/auth/userinfo.email',
  profile: 'https://www.googleapis.com/auth/userinfo.profile',
  calendar: 'https://www.googleapis.com/auth/calendar',
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: Object.values(googleAuthScopesDict)
            .toString()
            .replaceAll(',', ' ')
            .trim(),
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(googleAuthScopesDict.calendar)) {
        return '/register/connect-calendar/?error=permissions'
      }

      return true
    },
  },
}

export default NextAuth(authOptions)
