import prisma from '@/lib/db/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'

export const authOptions:NextAuthOptions={
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ]
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };