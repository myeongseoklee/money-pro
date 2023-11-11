import { Exclude, Expose } from 'class-transformer';
import { PaginationOptionsDto } from './pagination-options.dto';

export interface PageMetaDtoParameters {
  paginationOptionsDto: PaginationOptionsDto;
  total: number;
}

export class PageMetaDto {
  @Exclude() private readonly _total: number;
  @Exclude() private readonly _page: number;
  @Exclude() private readonly _take: number;
  @Exclude() private readonly _lastPage: number;
  @Exclude() private readonly _hasPreviousPage: boolean;
  @Exclude() private readonly _hasNextPage: boolean;

  constructor({ paginationOptionsDto, total }: PageMetaDtoParameters) {
    this._page = paginationOptionsDto.page <= 0 ? 1 : paginationOptionsDto.page;
    this._take = paginationOptionsDto.take;
    this._total = total;
    this._lastPage = Math.ceil(this._total / this._take);
    this._hasPreviousPage = this._page > 1;
    this._hasNextPage = this._page < this._lastPage;
  }

  @Expose()
  get total(): number {
    return this._total;
  }

  @Expose()
  get page(): number {
    return this._page;
  }

  @Expose()
  get take(): number {
    return this._take;
  }

  @Expose()
  get lastPage(): number {
    return this._lastPage;
  }

  @Expose()
  get hasPreviousPage(): boolean {
    return this._hasPreviousPage;
  }

  @Expose()
  get hasNextPage(): boolean {
    return this._hasNextPage;
  }
}
