import { ServiceBase } from './../base/service.base';
import { CustomLogger } from './../common/logger/custom.logger';
import { Injectable } from '@nestjs/common';
import { MonthlyBudget } from './entities/monthly-budget.entity';
import { MonthlyCategoryBudget } from './entities/monthly-category-budget.entity';
import { DataSource } from 'typeorm';
import { CreateMonthlyBudgetResDto } from './dto/create-monthly-budget-res.dto';

@Injectable()
export class BudgetService extends ServiceBase {
  constructor(
    private readonly dataSource: DataSource,
    private readonly logger: CustomLogger,
  ) {
    super();
  }

  async createMonthlyBudget({
    monthlyBudget,
    monthlyCategoryBudgetList,
  }: {
    monthlyBudget: MonthlyBudget;
    monthlyCategoryBudgetList: MonthlyCategoryBudget[];
  }): Promise<CreateMonthlyBudgetResDto> {
    const monthlyCategoryBudgetListGroup =
      this.groupMonthlyCategoryBudgetByExpenditureType(
        monthlyBudget.id,
        monthlyCategoryBudgetList,
      );

    monthlyBudget.setFixedAmount(
      this.calculateTotalAmount(monthlyCategoryBudgetListGroup.fixed),
    );

    monthlyBudget.setVariableAmount(
      this.calculateTotalAmount(monthlyCategoryBudgetListGroup.variable),
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('REPEATABLE READ');

    try {
      await queryRunner.manager.insert(MonthlyBudget, monthlyBudget);
      await queryRunner.manager.insert(
        MonthlyCategoryBudget,
        monthlyCategoryBudgetList,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      this.logger.log(error.stack, 'createMonthlyBudget()');

      this.processBasicTransactionException('예산 설정', error);
    } finally {
      await queryRunner.release();
    }

    return new CreateMonthlyBudgetResDto(
      monthlyBudget,
      monthlyCategoryBudgetList,
    );
  }

  groupMonthlyCategoryBudgetByExpenditureType(
    monthlyBudgetId: string,
    monthlyCategoryBudgetList: MonthlyCategoryBudget[],
  ): {
    fixed: MonthlyCategoryBudget[];
    variable: MonthlyCategoryBudget[];
  } {
    const monthlyCategoryBudgetListGroup = {
      fixed: [],
      variable: [],
    };

    monthlyCategoryBudgetList.forEach((categoryBudget) => {
      const monthlyCategoryBudget = MonthlyCategoryBudget.create(
        monthlyBudgetId,
        categoryBudget.expenditureCategoryCode,
        categoryBudget.expenditureType,
        categoryBudget.amount,
      );

      monthlyCategoryBudgetListGroup[categoryBudget.expenditureType].push(
        monthlyCategoryBudget,
      );
    });

    return monthlyCategoryBudgetListGroup;
  }

  calculateTotalAmount(
    monthlyCategoryBudgetList: MonthlyCategoryBudget[],
  ): bigint {
    return monthlyCategoryBudgetList.reduce(
      (total, { amount }) => total + amount,
      0n,
    );
  }
}
