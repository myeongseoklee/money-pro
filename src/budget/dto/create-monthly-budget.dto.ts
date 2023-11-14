import { BigIntTransformer } from '../../util/bigint.transformer';
import { Month } from './../../common/types/date.type';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { MonthlyCategoryBudgetDto } from './monthly-category-budget.dto';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { MonthlyBudget } from '../entities/monthly-budget.entity';
import {
  ExpenditureType,
  MonthlyCategoryBudget,
} from '../entities/monthly-category-budget.entity';

export class CreateMonthlyBudgetDto {
  @Expose()
  @ApiProperty({
    description: '예산을 설정할 연도를 입력하는 필드입니다.',
    required: true,
    example: 2023,
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @Expose()
  @ApiProperty({
    description:
      '예산을 설정할 월(month)을 입력하는 필드입니다. Month는 0부터 인덱싱되므로 1월은 0입니다.(0-11)',
    required: true,
    example: 11,
  })
  @IsInt()
  @Min(0)
  @Max(11)
  month: Month;

  @Expose()
  @ApiProperty({
    description: '카테고리별 예산 금액의 배열입니다.',
    type: [MonthlyCategoryBudgetDto],
    example: [
      {
        expenditureCategoryCode: '001001',
        amount: 300000,
        expenditureType: ExpenditureType.VARIABLE,
      },
      {
        expenditureCategoryCode: '001003',
        amount: 150000,
        expenditureType: ExpenditureType.VARIABLE,
      },
      {
        expenditureCategoryCode: '002001',
        amount: 140000,
        expenditureType: ExpenditureType.FIXED,
      },
      {
        expenditureCategoryCode: '002003',
        amount: 300000,
        expenditureType: ExpenditureType.FIXED,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => MonthlyCategoryBudgetDto)
  monthlyCategoryBudgetList: MonthlyCategoryBudgetDto[];

  toEntity(userId: string): {
    monthlyBudget: MonthlyBudget;
    monthlyCategoryBudgetList: MonthlyCategoryBudget[];
  } {
    const monthlyBudget = MonthlyBudget.create(userId, this.year, this.month);

    const monthlyCategoryBudgetList = this.monthlyCategoryBudgetList.map(
      (categoryBudget) =>
        MonthlyCategoryBudget.create(
          monthlyBudget.id,
          categoryBudget.expenditureCategoryCode,
          categoryBudget.expenditureType,
          BigIntTransformer.toBigint(categoryBudget.amount),
        ),
    );

    return { monthlyBudget, monthlyCategoryBudgetList };
  }
}
