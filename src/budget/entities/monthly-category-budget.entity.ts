import { Ulid } from './../../util/ulid';
import { EntityBase } from './../../base/entity.base';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { MonthlyBudget } from './monthly-budget.entity';

export enum ExpenditureType {
  VARIABLE = 'variable',
  FIXED = 'fixed',
}

@Entity('monthly_category_budget')
// ux_monthly_category_budget_monthly_budget_id_expenditure_category_code_expenditure_type의 유니크 키 이름이 너무 길어 약어로 대체
@Unique('ux_monthly_category_budget_monthly_budget_id_code_type', [
  'monthlyBudgetId',
  'expenditureType',
  'expenditureCategoryCode',
])
export class MonthlyCategoryBudget extends EntityBase {
  @Column({ name: 'monthly_budget_id', type: 'uuid', nullable: false })
  monthlyBudgetId: string;

  @ManyToOne(() => MonthlyBudget, (monthlyBudget) => monthlyBudget.id, {
    cascade: ['soft-remove', 'remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'monthly_budget_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_monthly_budget_monthly_category_budget_id',
  })
  monthlyBudget: MonthlyBudget;

  @Column({
    name: 'expenditure_category_code',
    type: 'varchar',
    length: 6,
    nullable: false,
  })
  expenditureCategoryCode: string;

  @Column({
    name: 'expenditure_type',
    type: 'enum',
    nullable: false,
    enum: ExpenditureType,
  })
  expenditureType: ExpenditureType;

  @Column({
    name: 'amount',
    type: 'bigint',
    nullable: false,
    unsigned: true,
  })
  amount: bigint;

  static create(
    monthlyBudgetId: string,
    expenditureCategoryCode: string,
    expenditureType: ExpenditureType,
    amount: bigint,
  ): MonthlyCategoryBudget {
    const monthlyCategoryBudget = new MonthlyCategoryBudget();

    monthlyCategoryBudget.id = Ulid.createUlid();
    monthlyCategoryBudget.monthlyBudgetId = monthlyBudgetId;
    monthlyCategoryBudget.expenditureCategoryCode = expenditureCategoryCode;
    monthlyCategoryBudget.expenditureType = expenditureType;
    monthlyCategoryBudget.amount = amount;

    return monthlyCategoryBudget;
  }
}
