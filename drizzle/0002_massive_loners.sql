CREATE TABLE IF NOT EXISTS "post" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"content" text,
	"birthdate" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post" ADD CONSTRAINT "post_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
