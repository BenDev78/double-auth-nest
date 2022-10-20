import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../common/constants';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  provider: Provider;

  @Column()
  providerId: string;

  @Column({ type: 'json' })
  roles: string[];
}
