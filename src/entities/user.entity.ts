import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../common/constants';

@Entity()
export class User {
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
