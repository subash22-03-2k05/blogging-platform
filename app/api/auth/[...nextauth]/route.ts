import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'
import bcrypt from 'bcryptjs'

const DATA_PATH = path.join(process.cwd(), 'data', 'users.json')

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials) return null
        const { email, password } = credentials
        const raw = await readFile(DATA_PATH, 'utf-8')
        const users = JSON.parse(raw || '[]')
        const user = users.find((u: any) => u.email === email)
        if (!user) return null
        const valid = await bcrypt.compare(password, user.password_hash)
        if (!valid) return null
        // return user object for session
        return { id: user.id, name: user.full_name, email: user.email, role: user.role }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      session.user.role = token.role
      return session
    },
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
}

const handler = NextAuth(options as any)

export { handler as GET, handler as POST }
