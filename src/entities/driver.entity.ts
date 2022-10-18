import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../common/constants';
import { Expose } from 'class-transformer';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  provider: Provider;

  @Column()
  providerId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'json' })
  roles: string[];
}
