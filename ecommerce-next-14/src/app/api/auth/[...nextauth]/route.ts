import prisma from '@/lib/db/prisma'
import { env } from '@/lib/env';
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
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string
    }),
    // Passwordless / email sign in
    // EmailProvider({
    //   server: env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
  ]
  ,callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };