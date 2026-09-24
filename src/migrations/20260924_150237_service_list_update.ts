import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ALTER COLUMN "visual" SET DATA TYPE text;
  UPDATE "services" SET "visual" = 'xray' WHERE "visual" = 'interventional';
  ALTER TABLE "services" ALTER COLUMN "visual" SET DEFAULT 'xray'::text;
  DROP TYPE "public"."enum_services_visual";
  CREATE TYPE "public"."enum_services_visual" AS ENUM('ct', 'mri', 'ultrasound', 'doppler', 'cardiac', 'mammo', 'dexa', 'xray', 'dental');
  ALTER TABLE "services" ALTER COLUMN "visual" SET DEFAULT 'xray'::"public"."enum_services_visual";
  ALTER TABLE "services" ALTER COLUMN "visual" SET DATA TYPE "public"."enum_services_visual" USING "visual"::"public"."enum_services_visual";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ALTER COLUMN "visual" SET DATA TYPE text;
  UPDATE "services" SET "visual" = 'doppler' WHERE "visual" = 'cardiac';
  ALTER TABLE "services" ALTER COLUMN "visual" SET DEFAULT 'xray'::text;
  DROP TYPE "public"."enum_services_visual";
  CREATE TYPE "public"."enum_services_visual" AS ENUM('ct', 'mri', 'ultrasound', 'doppler', 'mammo', 'dexa', 'xray', 'dental', 'interventional');
  ALTER TABLE "services" ALTER COLUMN "visual" SET DEFAULT 'xray'::"public"."enum_services_visual";
  ALTER TABLE "services" ALTER COLUMN "visual" SET DATA TYPE "public"."enum_services_visual" USING "visual"::"public"."enum_services_visual";`)
}
