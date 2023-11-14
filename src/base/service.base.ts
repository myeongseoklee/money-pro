import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export class ServiceBase {
  protected constructor() {}

  processBasicTransactionException(requestName: string, error: unknown): void {
    if (error instanceof QueryFailedError) {
      throw new UnprocessableEntityException(
        `데이터베이스 오류가 발생하여 ${requestName} 요청에 실패했습니다.`,
        { cause: error.stack },
      );
    } else {
      throw new InternalServerErrorException(
        '서버 오류가 발생했습니다. 잠시후 다시 시도하세요.',
        error,
      );
    }
  }
}
