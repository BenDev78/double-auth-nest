import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../common/decorator/role.decorator';
import { Role } from '../../common/roles.enum';
import { AdminCampaignService } from './admin-campaign.service';
import { Serialize } from '../../common/interceptor/serialize.interceptor';
import { CAMPAIGN_ADMIN_ITEM, CampaignDto } from './dto/campaign.dto';

@Controller()
@Roles(Role.Admin)
@Serialize(CampaignDto, [CAMPAIGN_ADMIN_ITEM])
export class AdminCampaignController {
  constructor(private readonly adminCampaignService: AdminCampaignService) {}

  @Get()
  list() {
    return this.adminCampaignService.findAll();
  }
}
