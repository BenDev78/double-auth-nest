import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from '../common/constants';
import { Exclude, Expose } from 'class-transformer';
import { ADMIN_DRIVER_ITEM, DRIVER_ITEM } from '../common/groups/driver.groups';

@Entity()
export class Driver extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  @Expose({ groups: [ADMIN_DRIVER_ITEM] })
  provider: Provider;

  @Column()
  @Expose({ groups: [ADMIN_DRIVER_ITEM] })
  providerId: string;

  @Column()
  @Expose({ groups: [ADMIN_DRIVER_ITEM, DRIVER_ITEM] })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'json' })
  @Expose({ groups: [ADMIN_DRIVER_ITEM] })
  roles: string[];
}
