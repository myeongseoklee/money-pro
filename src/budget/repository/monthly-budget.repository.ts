import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthlyBudget } from '../entities/monthly-budget.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MonthlyBudgetRepository {
  constructor(
    @InjectRepository(MonthlyBudget)
    private readonly repository: Repository<MonthlyBudget>,
  ) {}
}
