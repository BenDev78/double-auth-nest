import { Module } from '@nestjs/common';
import { AdminCampaignController } from './admin-campaign.controller';
import { AdminCampaignService } from './admin-campaign.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '../../entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [AdminCampaignController],
  providers: [AdminCampaignService],
  exports: [AdminCampaignService],
})
export class AdminCampaignModule {}
