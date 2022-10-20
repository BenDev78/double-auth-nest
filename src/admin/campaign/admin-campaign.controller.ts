import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { Roles } from '../../common/decorator/role.decorator';
import { Role } from '../../common/roles.enum';
import { Campaign } from '../../entities/campaign.entity';
import { CAMPAIGN_ADMIN_LIST } from '../../common/groups/campaign.groups';

@Controller()
@Roles(Role.Admin)
export class AdminCampaignController {
  @Get()
  @SerializeOptions({
    groups: [CAMPAIGN_ADMIN_LIST],
  })
  list() {
    return Campaign.find();
  }
}
