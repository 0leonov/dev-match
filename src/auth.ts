import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextResponse } from "next/server";
import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "@/db";
import { getUserById } from "@/entities/user";
import { publicRoutes, routes } from "@/lib/routes";

export const config = {
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: routes.signIn,
  },
  callbacks: {
    authorized({ request, auth }) {
      if (publicRoutes.includes(request.nextUrl.pathname)) {
        return true;
      }

      if (request.nextUrl.pathname.startsWith(routes.signIn)) {
        return auth
          ? NextResponse.redirect(new URL(routes.home, request.nextUrl))
          : true;
      }

      if (!auth) {
        return false;
      }

      const isCompleteRegistrationRoute =
        request.nextUrl.pathname === routes.completeRegistration;

      if (!auth.user.username && !isCompleteRegistrationRoute) {
        return NextResponse.redirect(
          new URL(
            `${routes.completeRegistration}?callbackUrl=${encodeURIComponent(request.url)}`,
            request.nextUrl,
          ),
        );
      }

      if (isCompleteRegistrationRoute && auth.user.username) {
        return NextResponse.redirect(new URL(routes.home, request.nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      const user = await getUserById(token.sub);

      session.user = user;

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut, unstable_update } =
  NextAuth(config);
