import { BigIntTransformer } from '../../util/bigint.transformer';
import { Exclude, Expose } from 'class-transformer';
import { MonthlyBudget } from '../entities/monthly-budget.entity';
import { MonthlyCategoryBudget } from '../entities/monthly-category-budget.entity';
import { Month } from 'src/common/types/date.type';
import { MonthlyCategoryBudgetDto } from './monthly-category-budget.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MonthlyCategoryBudgetResDto extends MonthlyCategoryBudgetDto {
  @Expose()
  @ApiProperty({ description: '예산 카테고리의 id 필드입니다.', example: '' })
  id: string;
}

export class CreateMonthlyBudgetResDto {
  @Exclude() private readonly _id: string;
  @Exclude() private readonly _year: number;
  @Exclude() private readonly _month: Month;
  @Exclude() private readonly _fixedAmount: bigint;
  @Exclude() private readonly _variableAmount: bigint;
  @Exclude() private readonly _totalAmount: bigint;
  @Exclude()
  private readonly _monthlyCategoryBudgetList: MonthlyCategoryBudgetResDto[];

  constructor(
    monthlyBudget: MonthlyBudget,
    monthlyCategoryBudgetList: MonthlyCategoryBudget[],
  ) {
    this._id = monthlyBudget.id;
    this._year = monthlyBudget.year;
    this._month = monthlyBudget.month;
    this._fixedAmount = monthlyBudget.fixedAmount;
    this._variableAmount = monthlyBudget.variableAmount;
    this._totalAmount = monthlyBudget.totalAmount;

    this._monthlyCategoryBudgetList = this.monthlyCategoryBudgetListFromEntity(
      monthlyCategoryBudgetList,
    );
  }

  monthlyCategoryBudgetListFromEntity(
    monthlyCategoryBudgetList: MonthlyCategoryBudget[],
  ): MonthlyCategoryBudgetResDto[] {
    return monthlyCategoryBudgetList.map((monthlyCategoryBudget) => {
      const monthlyCategoryBudgetResDto = new MonthlyCategoryBudgetResDto();

      monthlyCategoryBudgetResDto.id = monthlyCategoryBudget.id;
      monthlyCategoryBudgetResDto.expenditureCategoryCode =
        monthlyCategoryBudget.expenditureCategoryCode;
      monthlyCategoryBudgetResDto.amount = BigIntTransformer.toNumber(
        monthlyCategoryBudget.amount,
      );
      monthlyCategoryBudgetResDto.expenditureType =
        monthlyCategoryBudget.expenditureType;

      return monthlyCategoryBudgetResDto;
    });
  }

  @Expose()
  get id(): string {
    return this._id;
  }

  @Expose()
  @ApiProperty({
    description: '예산을 설정할 연도를 입력하는 필드입니다.',
    required: true,
    example: 2023,
  })
  get year(): number {
    return this._year;
  }

  @Expose()
  @ApiProperty({
    description:
      '예산을 설정할 월(month)을 입력하는 필드입니다. Month는 0부터 인덱싱되므로 1월은 0입니다.(0-11)',
    required: true,
    example: 11,
  })
  get month(): Month {
    return this._month;
  }

  @Expose()
  @ApiProperty({
    description: '고정 예산 금액의 총합입니다.',
    example: 1000000,
  })
  get fixedAmount(): number {
    return BigIntTransformer.toNumber(this._fixedAmount);
  }

  @Expose()
  @ApiProperty({
    description: '가변 예산 금액의 총합입니다.',
    example: 1000000,
  })
  get variableAmount(): number {
    return BigIntTransformer.toNumber(this._variableAmount);
  }

  @Expose()
  @ApiProperty({
    description: '가변 예산과 고정 예산 금액의 총합입니다.',
    example: 2000000,
  })
  get totalAmount(): number {
    return BigIntTransformer.toNumber(this._totalAmount);
  }

  @Expose()
  @ApiProperty({
    description: '카테고리별 예산 금액의 배열입니다.',
    example: [MonthlyCategoryBudgetResDto],
  })
  get monthlyCategoryBudgetList(): MonthlyCategoryBudgetResDto[] {
    return this._monthlyCategoryBudgetList;
  }
}
