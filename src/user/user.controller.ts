import { ResponseEntity } from './../common/response.entity';
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증/사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async signUp(
    @Body() dto: SignUpDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    return ResponseEntity.CREATED_WITH(
      '회원가입 요청에 성공하였습니다.',
      await this.userService.signUp(dto.toEntity()),
    );
  }

  @Post('/sign-in')
  async signIn(
    @Body() dto: SignInDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    return ResponseEntity.CREATED_WITH(
      '로그인 요청에 성공하였습니다.',
      await this.userService.signIn(dto.toEntity()),
    );
  }
}
