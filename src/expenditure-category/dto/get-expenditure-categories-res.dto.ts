import { Exclude, Expose } from 'class-transformer';
import {
  ExpenditureCategory,
  PARENT_CODE_NULL,
} from '../expenditure-category.entity';

interface IExpenditureCategory {
  code: string;
  name: string;
  parentCode: string;
  sortOrder: number;
}

interface SelfJoinedExpenditureCategory {
  code: string;
  name: string;
  parentCode: string;
  sortOrder: number;
  children: IExpenditureCategory[];
}

export class GetExpenditureCategoriesResDto {
  @Exclude()
  private readonly _selfJoinedExpenditureCategories: SelfJoinedExpenditureCategory[];

  constructor(expenditureCategories: ExpenditureCategory[]) {
    this._selfJoinedExpenditureCategories = this.selfJoin(
      expenditureCategories,
    );
  }

  selfJoin(
    expenditureCategories: ExpenditureCategory[],
  ): SelfJoinedExpenditureCategory[] {
    const parents = expenditureCategories.filter(
      (category) => category.parentCode === PARENT_CODE_NULL,
    );

    const children = expenditureCategories.filter(
      (category) => category.parentCode !== PARENT_CODE_NULL,
    );

    const selfJoinedCategories = parents.map((parent) => {
      return {
        ...parent,
        children: children.filter((child) => child.parentCode === parent.code),
      };
    });

    return selfJoinedCategories;
  }

  @Expose({ name: 'expenditureCategories' })
  get selfJoinedExpenditureCategories(): SelfJoinedExpenditureCategory[] {
    return this._selfJoinedExpenditureCategories;
  }
}
