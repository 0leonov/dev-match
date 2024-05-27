ALTER TABLE "connectionRequest" RENAME TO "connection_request";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "registrationCompleted";