import { DateTimeUtil } from './../util/date-time.utils';
import { DayjsTransformer } from './../util/dayjs-transformer';
import * as dayjs from 'dayjs';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class EntityBase {
  @PrimaryColumn({ name: 'id', type: 'uuid' })
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    transformer: new DayjsTransformer(),
  })
  createdAt: dayjs.Dayjs;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
    transformer: new DayjsTransformer(),
  })
  updatedAt: dayjs.Dayjs;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    transformer: new DayjsTransformer(),
  })
  deletedAt?: dayjs.Dayjs | null;

  @BeforeInsert()
  protected beforeInsert(): void {
    this.createdAt = DateTimeUtil.now();
    this.updatedAt = DateTimeUtil.now();
  }

  @BeforeUpdate()
  protected beforeUpdate(): void {
    this.updatedAt = DateTimeUtil.now();
  }
}
