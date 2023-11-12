import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword } from '../entities/user-password.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPasswordRepository {
  constructor(
    @InjectRepository(UserPassword)
    private readonly userPasswordRepository: Repository<UserPassword>,
  ) {}

  async insert(password: UserPassword): Promise<void> {
    await this.userPasswordRepository.insert(password);
  }
}
