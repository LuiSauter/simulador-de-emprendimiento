import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, profile }) {
      console.log({ token, profile })
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    session: ({ session, token }) => {
      console.log({ session, token })
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    authorized({ auth }) {
      console.log({ auth })
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
