CREATE TABLE IF NOT EXISTS "skill" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	CONSTRAINT "skill_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_skill" (
	"userId" text NOT NULL,
	"skillId" text NOT NULL,
	CONSTRAINT "user_skill_userId_skillId_pk" PRIMARY KEY("userId","skillId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_skill" ADD CONSTRAINT "user_skill_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_skill" ADD CONSTRAINT "user_skill_skillId_skill_id_fk" FOREIGN KEY ("skillId") REFERENCES "public"."skill"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
