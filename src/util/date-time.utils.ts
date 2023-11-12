import { DateOfMonth, Month } from './../common/types/date.type';
import * as dayjs from 'dayjs';

export class DateTimeUtil {
  static getNowFullISOString(): string {
    return dayjs(new Date()).toISOString();
  }

  static toDate(dayjs: dayjs.Dayjs): Date {
    return dayjs.toDate();
  }

  static toDayjs(date: Date): dayjs.Dayjs {
    return dayjs(date);
  }

  static getYear(date: Date): number {
    return dayjs(date).year();
  }

  static getMonth(date: Date): Month {
    return dayjs(date).month();
  }

  static getDate(date: Date): DateOfMonth {
    return dayjs(date).date() as DateOfMonth;
  }

  static now(): dayjs.Dayjs {
    return dayjs();
  }
}
