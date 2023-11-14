import { Ulid } from './../../util/ulid';
import { User } from './../../user/entities/user.entity';
import { Month } from './../../common/types/date.type';
import { EntityBase } from './../../base/entity.base';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity('monthly_budget')
@Unique('ux_monthly_budget_user_id_year_month', ['userId', 'year', 'month'])
export class MonthlyBudget extends EntityBase {
  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: ['soft-remove', 'remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_monthly_budget_user_id',
  })
  user: User;

  @Column({ name: 'year', type: 'int', unsigned: true, nullable: false })
  year: number;

  @Column({ name: 'month', type: 'enum', nullable: false, enum: Month })
  month: Month;

  @Column({
    name: 'fixed_amount',
    type: 'bigint',
    nullable: true,
    unsigned: true,
  })
  fixedAmount: bigint;

  @Column({
    name: 'variable_amount',
    type: 'bigint',
    nullable: true,
    unsigned: true,
  })
  variableAmount: bigint;

  static create(userId: string, year: number, month: Month): MonthlyBudget {
    const monthlyBudget = new MonthlyBudget();

    monthlyBudget.id = Ulid.createUlid();
    monthlyBudget.userId = userId;
    monthlyBudget.year = year;
    monthlyBudget.month = month;

    return monthlyBudget;
  }

  //todo setter 말고 이름 없을까
  setFixedAmount(fixedAmount: bigint): void {
    this.fixedAmount = fixedAmount;
  }

  setVariableAmount(variableAmount: bigint): void {
    this.variableAmount = variableAmount;
  }

  get totalAmount(): bigint {
    return this.fixedAmount + this.variableAmount;
  }
}
