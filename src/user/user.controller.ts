import { ResponseEntity } from './../common/response.entity';
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessTokenDto } from './dto/access-token.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async signUp(
    @Body() dto: SignUpDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    return ResponseEntity.CREATED_WITH(
      '회원가입 요청에 성공하였습니다.',
      await this.userService.signUp(dto),
    );
  }
}