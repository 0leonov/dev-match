// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

import { User } from "@/entities/user";

declare module "next-auth" {
  interface Session {
    user: User;
  }
}
