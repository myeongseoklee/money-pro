import { ExpenditureCategory } from './../../expenditure-category/expenditure-category.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ExpenditureType } from '../entities/monthly-category-budget.entity';

export class MonthlyCategoryBudgetDto {
  @Expose()
  @ApiProperty({
    description:
      '예산의 카테고리 코드 필드입니다. 부모 코드가 아닌 자식코드만 데이터로 사용합니다.',
    required: true,
    example: '001001',
  })
  @IsEnum(ExpenditureCategory)
  expenditureCategoryCode: string;

  @Expose()
  @ApiProperty({
    description: '카테고리 예산의 금액 필드입니다.',
    required: true,
    example: 10000,
  })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @Expose()
  @ApiProperty({
    description: '카테고리 예산의 타입 필드입니다.',
    required: true,
    example: ExpenditureType.VARIABLE,
  })
  @IsEnum(ExpenditureType)
  expenditureType: ExpenditureType;
}
