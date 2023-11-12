import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfileRepository {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}
  async insert(userProfile: UserProfile): Promise<void> {
    await this.userProfileRepository.insert(userProfile);
  }
}
