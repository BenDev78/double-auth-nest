import { Module } from '@nestjs/common';
import { AdminCampaignController } from './campaign/admin-campaign.controller';
import { AdminCampaignModule } from './campaign/admin-campaign.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AdminCampaignModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'campaign',
            module: AdminCampaignModule,
          },
        ],
      },
    ]),
  ],
  controllers: [AdminCampaignController],
})
export class AdminModule {}
