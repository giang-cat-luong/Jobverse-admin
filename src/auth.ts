import { jwtDecode } from "jwt-decode";
import NextAuth, { type AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

interface JWTPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "username" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          if (credentials.token) {
            const token = credentials.token as string;
            const decoded = jwtDecode<JWTPayload>(token);

            if (Date.now() >= decoded.exp * 1000) {
              throw new Error("Token expired");
            }

            return {
              id: decoded.sub,
              username: decoded.sub,
              token: token,
            };
          }

          if (credentials.username && credentials.password) {
            const parsed = await signInSchema.parseAsync({
              username: credentials.username,
              password: credentials.password,
            });

            const res = await fetch(
              process.env.NEXT_PUBLIC_API_BASE_URL + "/admin/login",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsed),
              }
            );

            const data = await res.json();

            if (res.ok && data.jwt) {
              const decoded = jwtDecode<JWTPayload>(data.jwt);
              return {
                id: decoded.sub,
                username: decoded.sub,
                token: data.jwt,
              };
            }
          }

          return null;
        } catch (error) {
          const e = error as AuthError;
          console.error("Authentication error:", e);
          throw new Error(e.type || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.username = user.username!;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user = {
        ...session.user,
        username: token.username!,
      };
      return session;
    },
  },
  events: {
    async signOut(message) {
      if ("token" in message) {
        try {
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/logout`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${message.token?.accessToken}`,
              },
            }
          )
        } catch (error) {
          console.error('Backend logout failed:', error);
        }
      }
    }
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
});
