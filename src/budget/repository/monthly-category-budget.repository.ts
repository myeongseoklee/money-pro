import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthlyCategoryBudget } from '../entities/monthly-category-budget.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonthlyCategoryBudgetRepository {
  constructor(
    @InjectRepository(MonthlyCategoryBudget)
    private readonly repository: Repository<MonthlyCategoryBudget>,
  ) {}
}
