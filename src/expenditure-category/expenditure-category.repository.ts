import { InjectRepository } from '@nestjs/typeorm';
import { ExpenditureCategory } from './expenditure-category.entity';
import { Repository } from 'typeorm';

export class ExpenditureCategoryRepository {
  constructor(
    @InjectRepository(ExpenditureCategory)
    private readonly repository: Repository<ExpenditureCategory>,
  ) {}

  async findAll(): Promise<ExpenditureCategory[]> {
    return await this.repository.find();
  }
}
