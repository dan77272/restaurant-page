import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../../../../lib/db'
import bcrypt from 'bcrypt'
import { QueryResult } from 'pg';


type User = {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        const {rows}: QueryResult<User> = await db.query('SELECT * FROM users WHERE username = $1', [credentials?.username])
        const user = rows[0]

        if(user && await bcrypt.compare(credentials?.password, user.password)){
          return {id: user.id, name: user.name, username: user.username, role: user.role}
        }else{
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as User;
        token.id = u.id;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const u = session.user as User
        u.id = token.id as string;
        u.role = token.role as string
      }
      return session;
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
