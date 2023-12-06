import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  theme: {
    colorScheme: 'dark',
    logo: '/logo.svg'
  },
  pages: {
    signIn: '/login'
  },
  debug: false
})

export { handler as GET, handler as POST }
