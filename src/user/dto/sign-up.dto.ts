import { DateTimeUtil } from './../../util/date-time.utils';
import { Gender } from '../../common/types/gender.type';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { UserPassword } from '../entities/user-password.entity';
import { UserProfile } from '../entities/user-profile.entity';
import { SignUpProps } from '../user.service';

export class SignUpDto {
  @Expose()
  @ApiProperty({
    description:
      '유저가 로그인에 사용할 email 필드입니다. 회원가입이 가능한 이메일의 도메인이 정해져 있습니다. 또한, 도메인을 포함한 아이디는 최소 10자, 최대 60자 까지 가능하며, 소문자 알파벳 및 숫자를 사용할 수 있고 -, _ 등의 특수문자를 사용할 수 있습니다. ',
    required: true,
    example: 'money-pro1@money-pro.com',
  })
  @IsNotEmpty()
  @IsEmail({
    host_whitelist: [
      'gmail.com',
      'naver.com',
      'daum.net',
      'kakao.com',
      'money-pro.com',
    ],
    domain_specific_validation: true,
    allow_utf8_local_part: false,
    ignore_max_length: true,
  })
  @MinLength(10)
  @MaxLength(60)
  email: string;

  @ApiProperty({
    description:
      '유저가 로그인에 사용할 password 필드입니다. 소문자, 대문자 알파벳과 숫자, 특수문자를 포함하여 최소 8자 이상, 최대 30자 까지 가능합니다.',
    required: true,
    example: 'Money-pro1!',
  })
  @Expose()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @MaxLength(30)
  password: string;

  @ApiProperty({
    description: '유저의 이름 필드입니다.',
    required: true,
    example: '김콩쥐',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      '유저의 성별 필드입니다. 자신의 성별에 맞는 예산 설계 추천 시 사용됩니다.',
    required: true,
    example: 'm',
  })
  @Expose()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description:
      '유저의 생년월일 필드입니다. 자신의 연령에 맞는 예산 설계 추천에 사용됩니다.',
    required: true,
    example: '1992-04-19',
  })
  @Expose()
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  toEntity(): SignUpProps {
    const user = User.create(this.email);
    const userPassword = UserPassword.create(user, this.password);
    const userProfile = UserProfile.create(
      user,
      this.name,
      this.gender,
      DateTimeUtil.getYear(this.dateOfBirth),
      DateTimeUtil.getMonth(this.dateOfBirth),
      DateTimeUtil.getDate(this.dateOfBirth),
    );
    return { user, userPassword, userProfile };
  }
}
