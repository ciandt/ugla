import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ListOptionsItem } from '../../models';
import { UglaService } from '../../ugla.service';

/**
 * List component
 *
 * This component generates a selectable list of names getting the index of each item.
 *
 * @example
 * <ugl-list-options
 *  [names]="names"
 *  uglGrid [span]="'2'"
 *  [id]=""
 *  (onClick)="selectItem($event)">
 * </ugl-list-options>
 */
@Component({
  selector: 'ugl-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.scss']
})
export class ListOptionsComponent implements OnChanges {

  /**
   *  Receive onClick function
   */
  @Output() onClick = new EventEmitter();

  /**
   * Receive an array of strings
   */
  @Input() names: string[];

  /**
   * Receive an array os strings
   */
  @Input() items: ListOptionsItem[];

  /**
   * Text to attribute id
   */
  @Input() id: string;

  /**
   * Insert the theme name on html component
   */
  public theme: string;

  /**
   * Receives the component's name
   * @param ugla: UglaService
   */
  constructor(private ugla: UglaService) {
    this.theme = ugla.theme;
  }

  selectName(index) {
    this.onClick.emit(index);
  }

  selectItem(index) {
    if (this.items[index].active) {
      this.onClick.emit(index); 
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['items'] !== undefined) {
      this.items = changes.items.currentValue;
    }
  }
}
