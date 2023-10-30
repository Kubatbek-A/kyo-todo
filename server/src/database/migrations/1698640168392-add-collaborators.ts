import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCollaborators1698640168392 implements MigrationInterface {
    name = 'AddCollaborators1698640168392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collaborators" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "task_id" uuid NOT NULL, "user_id" uuid NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f579a5df9d66287f400806ad875" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "collaborators" ADD CONSTRAINT "FK_146d8811baa3876cf00b385e9db" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "collaborators" ADD CONSTRAINT "FK_8235bb5945c983c272fe5d14a24" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_8235bb5945c983c272fe5d14a24"`);
        await queryRunner.query(`ALTER TABLE "collaborators" DROP CONSTRAINT "FK_146d8811baa3876cf00b385e9db"`);
        await queryRunner.query(`DROP TABLE "collaborators"`);
    }

}
