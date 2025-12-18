ALTER TABLE "tasks" ALTER COLUMN "url" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "question" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN "createdAt";