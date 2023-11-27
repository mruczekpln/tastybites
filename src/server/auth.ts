import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { mysqlTable } from "~/server/db/schema";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   id: string;
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3000,
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  adapter: DrizzleAdapter(db, mysqlTable),
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, email),
        });

        if (!user)
          throw new Error(
            "email,Account with this email adress doesn't exist!",
          );

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword!,
        );

        if (!isPasswordValid) throw new Error("password,Wrong password!");

        return user;
      },
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
