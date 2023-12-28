import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class MyPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Số mục mỗi trang:';
  override nextPageLabel = 'Trang kế tiếp';
  override previousPageLabel = 'Trang trước đó';
  override firstPageLabel = 'Trang đầu tiên';
  override lastPageLabel = 'Trang cuối cùng';

  override  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 của ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, length);
    return `${startIndex} – ${endIndex} của ${length}`;
  };
}
