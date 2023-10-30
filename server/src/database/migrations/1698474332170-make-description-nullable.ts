import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeDescriptionNullable1698474332170
  implements MigrationInterface
{
  name = 'MakeDescriptionNullable1698474332170';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
