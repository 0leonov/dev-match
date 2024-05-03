// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

import type { User } from "@/db";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
