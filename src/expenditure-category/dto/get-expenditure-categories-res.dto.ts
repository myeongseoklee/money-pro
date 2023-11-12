import { Exclude, Expose } from 'class-transformer';
import { ExpenditureCategory } from '../expenditure-category.entity';

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
    const categories = expenditureCategories.map((category) => ({
      code: category.code,
      name: category.name,
      sortOrder: category.sortOrder,
      parentCode:
        category.parentExpenditureCategory === null
          ? ''
          : (category.parentExpenditureCategory as unknown as string),
    }));

    const parents = categories.filter((category) => category.parentCode === '');

    const children = categories.filter(
      (category) => category.parentCode !== '',
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
