import { Expose } from 'class-transformer';

export const CAMPAIGN_DRIVER_ITEM = 'campaign_driver_item';
export const CAMPAIGN_ADMIN_ITEM = 'campaign_admin_item';
export const CAMPAIGN_DRIVER_LIST = 'campaign_driver_list';
export const CAMPAIGN_ADMIN_LIST = 'campaign_admin_list';

export class CampaignDto {
  @Expose({ groups: [CAMPAIGN_ADMIN_ITEM] })
  name: string;

  @Expose({ groups: [CAMPAIGN_DRIVER_ITEM] })
  city: string;
}
