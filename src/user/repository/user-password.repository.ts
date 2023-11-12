import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword } from '../entities/user-password.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPasswordRepository {
  constructor(
    @InjectRepository(UserPassword)
    private readonly repository: Repository<UserPassword>,
  ) {}

  async findUserBy(userPassword: UserPassword): Promise<UserPassword> {
    return await this.repository.findOne({
      where: { user: { email: userPassword.user.email } },
      relations: { user: true },
    });
  }
}
