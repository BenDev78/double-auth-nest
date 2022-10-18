import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from '../../entities/campaign.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class AdminCampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
  ) {}

  findAll(params: FindManyOptions<Campaign> = {}) {
    return this.campaignRepository.find(params);
  }
}
