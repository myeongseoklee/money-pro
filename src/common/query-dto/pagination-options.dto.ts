import { Expose, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export const Sort = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const SORT = Object.freeze(Object.keys(Sort));

export type SortType = keyof typeof Sort;

export class PaginationOptionsDto {
  @Expose()
  @Type(() => String)
  @IsIn(SORT)
  readonly order: SortType;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @Expose()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  take?: number;

  @Expose()
  @Type(() => String)
  @IsString()
  @IsOptional()
  search?: string;

  constructor(order: SortType, page?: number, take?: number, search?: string) {
    this.order = order;
    this.page = page;
    this.take = take;
    this.search = search;
  }

  get skip(): number {
    return this.page <= 0 ? (this.page = 0) : (this.page - 1) * this.take;
  }

  get searchArray(): string[] {
    return this.isExistSearch() ? this.search.split(' ') : [];
  }

  validatePaginateQuery(): this {
    this.validatePage();
    this.validateTake();

    return this;
  }

  private validateTake(): void {
    this.take = this.take && this.take >= 1 ? this.take : 20;
  }

  private validatePage(): void {
    this.page = this.page && this.page >= 1 ? this.page : 1;
  }

  private isExistSearch(): boolean {
    return !!this.search;
  }
}
