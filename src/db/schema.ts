import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin"]);
export const genderEnum = pgEnum("gender", ["not_specified", "male", "female"]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  username: varchar("username", { length: 16 }).unique(),
  bio: text("bio"),
  birthdate: date("birthdate"),
  gender: genderEnum("gender").default("not_specified"),
  roles: roleEnum("roles")
    .array()
    .default(sql`ARRAY['user']::role[]`),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const posts = pgTable("post", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  authorId: text("authorId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});

export const connections = pgTable(
  "connection",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    connectedUserId: text("connectedUserId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (connection) => ({
    compoundKey: primaryKey({
      columns: [connection.userId, connection.connectedUserId],
    }),
  }),
);

export const connectionRequests = pgTable(
  "connection_request",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    targetId: text("targetId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  },
  (connectionRequest) => ({
    compoundKey: primaryKey({
      columns: [connectionRequest.userId, connectionRequest.targetId],
    }),
  }),
);

export const skills = pgTable("skill", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").unique(),
});

export const userSkills = pgTable(
  "user_skill",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    skillId: text("skillId")
      .notNull()
      .references(() => skills.id, { onDelete: "cascade" }),
  },
  (userSkill) => ({
    compoundKey: primaryKey({
      columns: [userSkill.userId, userSkill.skillId],
    }),
  }),
);

export type User = typeof users.$inferSelect;

export type Skill = typeof skills.$inferSelect;

export type InsertSkill = typeof skills.$inferInsert;

export type UserSkill = typeof userSkills.$inferSelect;
