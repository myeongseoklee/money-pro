import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { MonthlyBudgetRepository } from './repository/monthly-budget.repository';
import { MonthlyCategoryBudgetRepository } from './repository/monthly-category-budget.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthlyBudget } from './entities/monthly-budget.entity';
import { MonthlyCategoryBudget } from './entities/monthly-category-budget.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonthlyBudget, MonthlyCategoryBudget]),
    UserModule,
  ],
  controllers: [BudgetController],
  providers: [
    BudgetService,
    MonthlyBudgetRepository,
    MonthlyCategoryBudgetRepository,
  ],
})
export class BudgetModule {}
