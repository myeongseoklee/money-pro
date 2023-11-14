import { AuthGuard } from './../user/guard/auth.guard';
import { UserId } from './../user/decorator/user-id.decorator';
import { ResponseEntity } from './../common/response.entity';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateMonthlyBudgetDto } from './dto/create-monthly-budget.dto';
import { CreateMonthlyBudgetResDto } from './dto/create-monthly-budget-res.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('예산 설정')
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard)
  @Post()
  async createMonthlyBudget(
    @UserId() userId: string,
    @Body() dto: CreateMonthlyBudgetDto,
  ): Promise<ResponseEntity<CreateMonthlyBudgetResDto>> {
    return ResponseEntity.CREATED_WITH(
      '예산 설정 요청이 성공하였습니다.',
      await this.budgetService.createMonthlyBudget(dto.toEntity(userId)),
    );
  }
}
