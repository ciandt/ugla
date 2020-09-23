import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Select } from '../../../models';
import { SelectComponent } from '../../select/select.component';

/**
 * Items per page component of pagination
 *
 * @example
 * <ugl-pagination-items-per-page class="pagination-items-per-page"
 *    [range]="itemsPerPageRange"
 *    (changeItemsPerPagePageSize)="changePaginationPageSize.emit($event)"
 *    [id]="'pagination-items-per-page'"
 *    [beforeText]="'Before Text'"
 *    [afterText]="'After Text'"
 *    [title]="'Title'"
 *    #itemsPerPageComponent>
 */
@Component({
  selector: 'ugl-pagination-items-per-page',
  templateUrl: './pagination-items-per-page.component.html',
  styleUrls: ['./pagination-items-per-page.component.scss']
})
export class PaginationItemsPerPageComponent {

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Range of the pagination size.
   */
  @Input() range?: Select;

  /**
   * Component id.
   */
  @Input() id: string;

  /**
   * Show text before select input.
   */
  @Input() beforeText?: string;

  /**
   * Show text after select input.
   */
  @Input() afterText?: string;

  /**
   * Component title.
   */
  @Input() title?: string;

  /**
   * Items per page select component.
   */
  @ViewChild('itemsPerPageSelect') itemsPerPageSelect !: SelectComponent;

  /**
   * Emitter for change of page size.
   */
  @Output() changeItemsPerPagePageSize = new EventEmitter<number>();

  /**
   * Set selected value.
   *
   * @param pageSize number of page size
   */
  setSelected(pageSize: number) {
    this.itemsPerPageSelect.setSelect(pageSize.toString());
  }

  /**
   * Fire pagination size.
   */
  fireChangePage(size: any) {
    let selectedSize: number;

    if (Number(size.value) > 0) {
      selectedSize = Number(size.value);
    } else {
      this.itemsPerPageSelect.select.options.forEach((item) => {
        if (item.checked
          && Number(item.value) > 0) {
          selectedSize = Number(item.value);
          item.checked  = true;
        }
      });
    }
    this.changeItemsPerPagePageSize.emit(selectedSize);
  }

  /**
   * Return true if the page rage has initialized.
   */
  hasPageRange() {
    return !!this.range;
  }
}
