import { CustomLogger } from './../common/logger/custom.logger';
import { DateTimeUtil } from './../util/date-time.utils';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserPassword } from './entities/user-password.entity';
import { UserProfile } from './entities/user-profile.entity';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token.dto';
import authConfig from '../config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLogger,
    @Inject(authConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof authConfig>,
  ) {}

  async signUp(dto: SignUpDto): Promise<AccessTokenDto> {
    const user = await this.saveUser(dto);

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.jwtConfig.jwtSecret,
        expiresIn: this.jwtConfig.jwtExpiresIn,
      },
    );

    return new AccessTokenDto(accessToken);
  }

  async saveUser(dto: SignUpDto): Promise<User> {
    // 유저 엔티티 생성
    const userEntity = User.create(dto.email);

    // 트랜잭션 생성
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');

    try {
      // 유저 엔티티 저장
      await queryRunner.manager.insert(User, userEntity);

      // 유저 패스워드 암호화 후 엔티티 생성
      const hashedPassword = await hash(dto.password, 10);
      const passwordEntity = UserPassword.create(userEntity, hashedPassword);

      // 프로필 엔티티 생성
      const userProfileEntity = UserProfile.create(
        userEntity,
        dto.name,
        dto.gender,
        DateTimeUtil.getYear(dto.dateOfBirth),
        DateTimeUtil.getMonth(dto.dateOfBirth),
        DateTimeUtil.getDate(dto.dateOfBirth),
      );

      // 유저 패스워드 & 프로필 저장
      await queryRunner.manager.insert(UserPassword, passwordEntity);
      await queryRunner.manager.insert(UserProfile, userProfileEntity);

      await queryRunner.commitTransaction();

      // 생성된 유저 리턴
      return userEntity;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.log(error.stack, 'signUp()');

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 가입된 회원입니다.', error);
      } else {
        throw new BadRequestException(
          '회원가입 요청에 실패했습니다. 정보를 올바르게 다시 요청해주세요.',
        );
      }
    } finally {
      await queryRunner.release();
    }
  }
}
