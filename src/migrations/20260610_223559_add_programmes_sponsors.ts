import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sponsors_tier" AS ENUM('headline', 'sponsor', 'association', 'educational', 'media');
  CREATE TABLE "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"logo_id" integer,
  	"strapline" varchar,
  	"description" jsonb,
  	"external_url" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programmes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sponsors_id" integer
  );
  
  CREATE TABLE "sponsors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"website" varchar,
  	"tier" "enum_sponsors_tier",
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sponsors_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"programmes_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "programmes_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sponsors_id" integer;
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sponsors_rels" ADD CONSTRAINT "sponsors_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "programmes_slug_idx" ON "programmes" USING btree ("slug");
  CREATE INDEX "programmes_logo_idx" ON "programmes" USING btree ("logo_id");
  CREATE INDEX "programmes_updated_at_idx" ON "programmes" USING btree ("updated_at");
  CREATE INDEX "programmes_created_at_idx" ON "programmes" USING btree ("created_at");
  CREATE INDEX "programmes_rels_order_idx" ON "programmes_rels" USING btree ("order");
  CREATE INDEX "programmes_rels_parent_idx" ON "programmes_rels" USING btree ("parent_id");
  CREATE INDEX "programmes_rels_path_idx" ON "programmes_rels" USING btree ("path");
  CREATE INDEX "programmes_rels_sponsors_id_idx" ON "programmes_rels" USING btree ("sponsors_id");
  CREATE INDEX "sponsors_logo_idx" ON "sponsors" USING btree ("logo_id");
  CREATE INDEX "sponsors_updated_at_idx" ON "sponsors" USING btree ("updated_at");
  CREATE INDEX "sponsors_created_at_idx" ON "sponsors" USING btree ("created_at");
  CREATE INDEX "sponsors_rels_order_idx" ON "sponsors_rels" USING btree ("order");
  CREATE INDEX "sponsors_rels_parent_idx" ON "sponsors_rels" USING btree ("parent_id");
  CREATE INDEX "sponsors_rels_path_idx" ON "sponsors_rels" USING btree ("path");
  CREATE INDEX "sponsors_rels_programmes_id_idx" ON "sponsors_rels" USING btree ("programmes_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("programmes_id");
  CREATE INDEX "payload_locked_documents_rels_sponsors_id_idx" ON "payload_locked_documents_rels" USING btree ("sponsors_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "programmes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sponsors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sponsors_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "programmes" CASCADE;
  DROP TABLE "programmes_rels" CASCADE;
  DROP TABLE "sponsors" CASCADE;
  DROP TABLE "sponsors_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_programmes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sponsors_fk";
  
  DROP INDEX "payload_locked_documents_rels_programmes_id_idx";
  DROP INDEX "payload_locked_documents_rels_sponsors_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "programmes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sponsors_id";
  DROP TYPE "public"."enum_sponsors_tier";`)
}
