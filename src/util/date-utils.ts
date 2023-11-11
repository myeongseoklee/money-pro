import dayjs from 'dayjs';

export class DateUtil {
  static getNowFullISOString() {
    return dayjs(new Date()).toISOString();
  }
}
