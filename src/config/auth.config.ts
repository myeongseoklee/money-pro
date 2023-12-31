import { registerAs } from '@nestjs/config';

/**
 * auth이라는 토큰으로 ConfigFactory를 등록할 수 있는 함수
 * @param jwtSecret jwt 엑세스 토큰의 secret key입니다
 * @param jwtExpiresIn jwt 엑세스 토큰의 만료 기간(수명)입니다
 */
export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
}));
