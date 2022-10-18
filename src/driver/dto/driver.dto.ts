import { Expose } from 'class-transformer';

export const DRIVER_ITEM = 'driver_item';
export const ADMIN_DRIVER_ITEM = 'driver_item';

export class DriverDto {
  @Expose({ groups: [ADMIN_DRIVER_ITEM] })
  provider: string;

  @Expose({ groups: [ADMIN_DRIVER_ITEM] })
  providerId: string;

  @Expose({ groups: [ADMIN_DRIVER_ITEM, DRIVER_ITEM] })
  username: string;

  @Expose({ groups: [ADMIN_DRIVER_ITEM, DRIVER_ITEM] })
  roles: string[];
}
