CREATE TABLE IF NOT EXISTS "connectionRequest" (
	"userId" text NOT NULL,
	"targetId" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "connectionRequest_userId_targetId_pk" PRIMARY KEY("userId","targetId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "connection" (
	"userId" text NOT NULL,
	"connectedUserId" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "connection_userId_connectedUserId_pk" PRIMARY KEY("userId","connectedUserId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connectionRequest" ADD CONSTRAINT "connectionRequest_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connectionRequest" ADD CONSTRAINT "connectionRequest_targetId_user_id_fk" FOREIGN KEY ("targetId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connection" ADD CONSTRAINT "connection_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "connection" ADD CONSTRAINT "connection_connectedUserId_user_id_fk" FOREIGN KEY ("connectedUserId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
