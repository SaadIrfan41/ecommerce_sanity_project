CREATE TABLE IF NOT EXISTS "Orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"product_id" varchar(256) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"image" text NOT NULL,
	"product_name" text NOT NULL,
	"product_price" numeric NOT NULL,
	"product_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "unique_idx" ON "Orders" ("product_id");