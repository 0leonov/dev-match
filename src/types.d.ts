// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

import type { User } from "@/features/user/types";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
