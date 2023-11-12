import { Injectable } from '@nestjs/common';
import { ExpenditureCategoryRepository } from './expenditure-category.repository';
import { GetExpenditureCategoriesResDto } from './dto/get-expenditure-categories-res.dto';
import { ExpenditureCategory } from './expenditure-category.entity';

@Injectable()
export class ExpenditureCategoryService {
  constructor(
    private readonly expenditureCategoryRepository: ExpenditureCategoryRepository,
  ) {}

  async getExpenditureCategories(): Promise<GetExpenditureCategoriesResDto> {
    const expenditureCategories: ExpenditureCategory[] =
      await this.expenditureCategoryRepository.findAll();

    return new GetExpenditureCategoriesResDto(expenditureCategories);
  }
}
