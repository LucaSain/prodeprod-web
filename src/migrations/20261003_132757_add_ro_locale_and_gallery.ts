import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."_locales" ADD VALUE 'ro' BEFORE 'ru';
  ALTER TYPE "public"."enum__pages_v_published_locale" ADD VALUE 'ro' BEFORE 'ru';
  ALTER TYPE "public"."enum__posts_v_published_locale" ADD VALUE 'ro' BEFORE 'ru';
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"feature_first" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"feature_first" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_t_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_t_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"feature_first" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_gallery_images" ADD CONSTRAINT "pages_t_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_gallery_images" ADD CONSTRAINT "pages_t_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_t_blocks_gallery" ADD CONSTRAINT "pages_t_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_t"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_locale_idx" ON "pages_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_locale_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_locale_idx" ON "_pages_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_t_blocks_gallery_images_order_idx" ON "pages_t_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_gallery_images_parent_id_idx" ON "pages_t_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_gallery_images_locale_idx" ON "pages_t_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_t_blocks_gallery_images_image_idx" ON "pages_t_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_t_blocks_gallery_order_idx" ON "pages_t_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_t_blocks_gallery_parent_id_idx" ON "pages_t_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_t_blocks_gallery_path_idx" ON "pages_t_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_t_blocks_gallery_locale_idx" ON "pages_t_blocks_gallery" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "pages_t_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_t_blocks_gallery" CASCADE;
  ALTER TABLE "pages_hero_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_map_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_texts" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_map_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_texts" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "_pages_v_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_texts" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "_posts_v_texts" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "categories_breadcrumbs" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_checkbox_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_country_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_email_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_message_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_number_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_select_options_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_select_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_state_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_text_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_blocks_textarea_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "forms_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_hero_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_blocks_map_block" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_texts" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "pages_t_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "posts_t_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "posts_t_texts" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "header_nav_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "header_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  ALTER TABLE "footer_nav_items" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "footer_rels" ALTER COLUMN "locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'ru');
  ALTER TABLE "pages_hero_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_blocks_map_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_texts" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "pages_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_pages_v_version_hero_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_blocks_map_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_pages_v_texts" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_pages_v_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "posts_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_texts" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_posts_v_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "_posts_v_texts" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "media_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "categories_breadcrumbs" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_checkbox_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_country_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_email_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_message_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_number_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_select_options_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_select_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_state_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_text_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_blocks_textarea_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_emails_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "forms_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_hero_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_cta_links" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_cta" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_content_columns" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_content" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_media_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_archive" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_form_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_blocks_map_block" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "pages_t_texts" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "pages_t_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "posts_t_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "posts_t_texts" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "header_nav_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "header_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "footer_nav_items" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "footer_rels" ALTER COLUMN "locale" SET DATA TYPE "public"."_locales" USING "locale"::"public"."_locales";
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_published_locale";
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ru');
  ALTER TABLE "_pages_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__pages_v_published_locale" USING "published_locale"::"public"."enum__pages_v_published_locale";
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_published_locale";
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'ru');
  ALTER TABLE "_posts_v" ALTER COLUMN "published_locale" SET DATA TYPE "public"."enum__posts_v_published_locale" USING "published_locale"::"public"."enum__posts_v_published_locale";`)
}
