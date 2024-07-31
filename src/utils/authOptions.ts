import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
      Credentials({
        credentials: {
          email: { label: "Username", type: "text", placeholder: "UseName" },
          password: {  label: "Password", type: "password" }
        },
        async authorize(credentials) {
        const res = await fetch("http://shoppi.tech/v1/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          })
          const user = await res.json()
          if (res.ok && user) {
            return user
          }
          else {return null;}
        }
      }),
      
    //   GithubProvider({
    //     clientId: process.env.GITHUB_ID as string,
    //     clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //   })
    ],
    callbacks: {
      session: ({ session, token }) => {
       session.user= token;
        return {
          ...session
        };
      },
      jwt: ({ token, user }) => {
        return {...token, ...user};
      },
    },
}