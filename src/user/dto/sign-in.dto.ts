import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { User } from '../entities/user.entity';
import { UserPassword } from '../entities/user-password.entity';

export class SignInDto extends PickType(SignUpDto, ['email', 'password']) {
  toEntity(): UserPassword {
    return UserPassword.of(User.byEmail(this.email), this.password);
  }
}
