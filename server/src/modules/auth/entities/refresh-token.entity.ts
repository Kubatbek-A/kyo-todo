import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('uuid')
  @Column()
  sign: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  ua: string;

  @Column({ nullable: true })
  fingerprint: string;

  @Column()
  ip: string;

  @Column('timestamptz', { name: 'expires_at' })
  expiresAt: Date;
}
