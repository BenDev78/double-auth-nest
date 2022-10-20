import { Module } from '@nestjs/common';
import { AdminCampaignController } from './admin-campaign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from '../../entities/campaign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [AdminCampaignController],
})
export class AdminCampaignModule {}
