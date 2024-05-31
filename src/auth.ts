import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextResponse } from "next/server";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "@/db";

import { getUserById } from "./entities/user";

export const config = {
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ request, auth }) {
      if (["/", "/about", "/terms"].includes(request.nextUrl.pathname)) {
        return true;
      }

      if (request.nextUrl.pathname.startsWith("/login")) {
        return auth
          ? NextResponse.redirect(new URL("/home", request.nextUrl))
          : true;
      }

      if (!auth) {
        return false;
      }

      if (
        !auth.user.username &&
        request.nextUrl.pathname !== "/complete-registration"
      ) {
        return NextResponse.redirect(
          new URL(
            `/complete-registration?callbackUrl=${encodeURIComponent(request.url)}`,
            request.nextUrl,
          ),
        );
      }

      if (
        request.nextUrl.pathname === "/complete-registration" &&
        auth.user.username
      ) {
        return NextResponse.redirect(new URL("/home", request.nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      const user = await getUserById(token.sub);

      if (!user) {
        return session;
      }

      session.user = user;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut, unstable_update } =
  NextAuth(config);
