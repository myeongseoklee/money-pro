import { Module } from '@nestjs/common';
import { ExpenditureCategoryService } from './expenditure-category.service';
import { ExpenditureCategoryController } from './expenditure-category.controller';
import { ExpenditureCategoryRepository } from './expenditure-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenditureCategory } from './expenditure-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenditureCategory])],
  providers: [ExpenditureCategoryService, ExpenditureCategoryRepository],
  controllers: [ExpenditureCategoryController],
  exports: [ExpenditureCategoryService],
})
export class ExpenditureCategoryModule {}
