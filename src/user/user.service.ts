import { ServiceBase } from './../base/service.base';
import { CustomLogger } from './../common/logger/custom.logger';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserPassword } from './entities/user-password.entity';
import { UserProfile } from './entities/user-profile.entity';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token.dto';
import authConfig from '../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { UserPasswordRepository } from './repository/user-password.repository';
import { UserRepository } from './repository/user.repository';

/**
 * jwt는 userId를 sub의 value로 생성합니다.
 * @prop {Number} sub - user id
 * @author 명석
 */
export interface JwtPayload {
  sub: string;
}

export interface SignUpProps {
  user: User;
  userPassword: UserPassword;
  userProfile: UserProfile;
}

@Injectable()
export class UserService extends ServiceBase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly userPasswordRepository: UserPasswordRepository,
    private readonly jwtService: JwtService,
    private readonly logger: CustomLogger,
    @Inject(authConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof authConfig>,
  ) {
    super();
  }

  async signUp({
    user,
    userPassword,
    userProfile,
  }: SignUpProps): Promise<AccessTokenDto> {
    await this.saveUser(user, userPassword, userProfile);

    const accessToken = await this.jwtService.signAsync(
      { sub: user.id },
      {
        secret: this.jwtConfig.jwtSecret,
        expiresIn: this.jwtConfig.jwtExpiresIn,
      },
    );

    return new AccessTokenDto(accessToken);
  }

  async signIn(userPassword: UserPassword): Promise<AccessTokenDto> {
    const savedUserPassword =
      await this.userPasswordRepository.findUserBy(userPassword);

    if (savedUserPassword === null) {
      throw new UnauthorizedException(
        '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
      );
    }

    const isSamePassword: boolean = await compare(
      userPassword.password,
      savedUserPassword.password,
    );

    if (!isSamePassword) {
      throw new UnauthorizedException(
        '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
      );
    }

    const accessToken = await this.jwtService.signAsync(
      { sub: savedUserPassword.userId },
      {
        secret: this.jwtConfig.jwtSecret,
        expiresIn: this.jwtConfig.jwtExpiresIn,
      },
    );

    return new AccessTokenDto(accessToken);
  }

  async getTokenPayload(accessToken: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
      secret: process.env.JWT_SECRET,
    });

    const isExistUser = await this.userRepository.isExist(
      User.byId(payload.sub),
    );

    if (!isExistUser) throw new Error('존재하지 않는 유저입니다.');

    return payload;
  }

  async saveUser(
    user: User,
    userPassword: UserPassword,
    userProfile: UserProfile,
  ): Promise<void> {
    // 트랜잭션 생성
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');

    try {
      // 유저 엔티티 저장
      await queryRunner.manager.insert(User, user);

      // 유저 패스워드 암호화 후 패스워드 엔티티 수정
      userPassword.setHashedPassword(await hash(userPassword.password, 10));

      // 유저 패스워드 & 프로필 엔티티 저장
      await queryRunner.manager.insert(UserPassword, userPassword);
      await queryRunner.manager.insert(UserProfile, userProfile);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.log(error.stack, 'signUp()');

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 가입된 회원입니다.', error);
      } else {
        this.processBasicTransactionException('회원가입', error);
      }
    } finally {
      await queryRunner.release();
    }
  }
}
