import { PageMetaDto } from './page-meta.dto';
import { Exclude, Expose } from 'class-transformer';

export class PageListQueryDto<T> {
  @Exclude() private readonly _data: T[];

  @Exclude() private readonly _meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this._data = data;
    this._meta = meta;
  }

  @Expose()
  get data(): T[] {
    return this._data;
  }

  @Expose()
  get meta(): PageMetaDto {
    return this._meta;
  }
}
