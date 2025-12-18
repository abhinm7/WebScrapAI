CREATE TABLE "tasks" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text,
	"question" text,
	"answer" text,
	"createdAt" timestamp DEFAULT now()
);
