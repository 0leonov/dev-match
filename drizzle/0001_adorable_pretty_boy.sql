DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('not_specified', 'male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "username" varchar(16);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "birthdate" date;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "gender" "gender" DEFAULT 'not_specified';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roles" role[] DEFAULT ARRAY['user']::role[];--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "registrationCompleted" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");