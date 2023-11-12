import { CustomValidator } from './custom.validator';
import { ValueTransformer } from 'typeorm';

export class BooleanTransformer implements ValueTransformer {
  from(dbValue?: number | null): boolean | undefined {
    if (CustomValidator.isNullOrUndefined(dbValue)) {
      return;
    }
    return dbValue ? true : false;
  }

  to(entityValue?: boolean | null): number | undefined {
    if (CustomValidator.isNullOrUndefined(entityValue)) {
      return;
    }
    return entityValue ? 1 : 0;
  }
}
