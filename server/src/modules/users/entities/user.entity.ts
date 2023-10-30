import { Collaborator } from 'src/modules/tasks/entities/collaborator.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Index,
  Generated,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Index({ unique: true, where: '"deleted_at" IS NULL' })
  email: string;

  @Column({ name: 'google_id', nullable: true })
  @Index({
    unique: true,
    where: '"google_id" IS NOT NULL AND "deleted_at" IS NULL',
  })
  googleId: string | null;

  @Column('uuid', { name: 'control_token' })
  @Generated('uuid')
  controlToken: string;

  @OneToMany(() => Collaborator, (collaborator) => collaborator.users)
  @JoinColumn({ name: 'collaborating_tasks' })
  collaboratingTasks: Collaborator[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
