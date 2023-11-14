import { ResponseEntity } from '../common/response.entity';
import { Controller, Get } from '@nestjs/common';
import { ExpenditureCategoryService } from './expenditure-category.service';
import { GetExpenditureCategoriesResDto } from './dto/get-expenditure-categories-res.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('예산 카테고리 목록')
@Controller('expenditure-categories')
export class ExpenditureCategoryController {
  constructor(
    private readonly expenditureCategoryService: ExpenditureCategoryService,
  ) {}

  @Get()
  async getExpenditureCategories(): Promise<
    ResponseEntity<GetExpenditureCategoriesResDto>
  > {
    return ResponseEntity.OK_WITH(
      '예산/지출 카테고리 조회 요청에 성공하였습니다.',
      await this.expenditureCategoryService.getExpenditureCategories(),
    );
  }
}
