import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionField1698474098614 implements MigrationInterface {
  name = 'AddDescriptionField1698474098614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "description" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
  }
}
