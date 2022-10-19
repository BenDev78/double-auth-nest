import { Injectable } from '@nestjs/common';
import { Campaign } from '../../entities/campaign.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class AdminCampaignService {
  findAll(params: FindManyOptions<Campaign> = {}) {
    return Campaign.find(params);
  }
}
