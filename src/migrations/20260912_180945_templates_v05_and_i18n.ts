import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_inherits_from_id_pages_t_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_inherits_from_id_pages_t_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_inherits_from_id_posts_t_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_inherits_from_id_posts_t_id_fk";
  
  DROP INDEX "pages_inherits_from_idx";
  DROP INDEX "_pages_v_version_version_inherits_from_idx";
  DROP INDEX "posts_inherits_from_idx";
  DROP INDEX "_posts_v_version_version_inherits_from_idx";
  ALTER TABLE "pages" DROP COLUMN "inherits_from_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_inherits_from_id";
  ALTER TABLE "posts" DROP COLUMN "inherits_from_id";
  ALTER TABLE "_posts_v" DROP COLUMN "version_inherits_from_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "inherits_from_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_inherits_from_id" integer;
  ALTER TABLE "posts" ADD COLUMN "inherits_from_id" integer;
  ALTER TABLE "_posts_v" ADD COLUMN "version_inherits_from_id" integer;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_inherits_from_id_pages_t_id_fk" FOREIGN KEY ("inherits_from_id") REFERENCES "public"."pages_t"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_inherits_from_id_pages_t_id_fk" FOREIGN KEY ("version_inherits_from_id") REFERENCES "public"."pages_t"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_inherits_from_id_posts_t_id_fk" FOREIGN KEY ("inherits_from_id") REFERENCES "public"."posts_t"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_inherits_from_id_posts_t_id_fk" FOREIGN KEY ("version_inherits_from_id") REFERENCES "public"."posts_t"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_inherits_from_idx" ON "pages" USING btree ("inherits_from_id");
  CREATE INDEX "_pages_v_version_version_inherits_from_idx" ON "_pages_v" USING btree ("version_inherits_from_id");
  CREATE INDEX "posts_inherits_from_idx" ON "posts" USING btree ("inherits_from_id");
  CREATE INDEX "_posts_v_version_version_inherits_from_idx" ON "_posts_v" USING btree ("version_inherits_from_id");`)
}
