import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../common/constants';

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
}
