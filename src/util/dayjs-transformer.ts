import * as dayjs from 'dayjs';
import { ValueTransformer } from 'typeorm';
import { DateTimeUtil } from './date-time.utils';
import { CustomValidator } from './custom.validator';

export class DayjsTransformer implements ValueTransformer {
  to(entityValue: dayjs.Dayjs): Date {
    if (CustomValidator.isNullOrUndefined(entityValue)) {
      return;
    }
    return DateTimeUtil.toDate(entityValue);
  }
  from(dbValue: Date): dayjs.Dayjs {
    if (CustomValidator.isNullOrUndefined(dbValue)) {
      return;
    }
    return DateTimeUtil.toDayjs(dbValue);
  }
}
