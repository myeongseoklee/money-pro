import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPassword } from './entities/user-password.entity';
import { UserProfile } from './entities/user-profile.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './repository/user.repository';
import { UserProfileRepository } from './repository/user-profile.repository';
import { UserPasswordRepository } from './repository/user-password.repository';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPassword, UserProfile]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserProfileRepository,
    UserPasswordRepository,
    AuthGuard,
  ],
  exports: [UserService, AuthGuard],
})
export class UserModule {}
