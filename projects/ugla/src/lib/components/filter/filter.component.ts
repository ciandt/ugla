import { Component, OnInit, Output, EventEmitter, Input, OnChanges, HostListener, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { UglaService } from '../../ugla.service';

/**
 * @example
 * <ugl-filter
 *  [id]="'id'"
 *  [isOpen]="boolean"
 *  [title]="'Title'"
 *  (filterEmitter)="openFilter()" >
 *  </ugl-filter>
 */
@Component({
  selector: 'ugl-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  /**
   * Input() property to receive a title
   */
  @Input() title: string;

  /**
   * Input() Property to check the filter is open
   * Default: false
   */
  @Input() isOpen = false;

  /**
   * Property to lock the filter.
   */
  public lockFilter = false;

  /**
   * Input() Property to identify the id for automation.
   */
  @Input() id: string;

  /**
   * Output() Property to emit if the filter is open or not.
   */
  @Output() filterEmitter = new EventEmitter<boolean>();

  /**
   * Property to receive the css classes
   */
  public classes: string;

  /**
   * Property to set the color
   */
  public color: string;

  /**
   * Param to receive the theme name
   * @param ugla: UglaService
   */
  constructor(private ugla: UglaService,
              private changeDetector: ChangeDetectorRef) {
    this.classes = ugla.theme;
  }

  ngOnInit() {
    this.changeClass();
    this.onWindowSizeChange();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isOpen) {
      this.lockFilter = false;
    }
    this.changeClass();
    this.onWindowSizeChange();
    this.changeDetector.detectChanges();
  }

  /**
   * Function to identify whether
   * the filter has been opened or closed.
   */
  toggleFilter() {
    this.toggleLockFilter();
    this.filterEmitter.emit();
  }

  /**
   * Function to lock the filter on the screen
   */
  toggleLockFilter() {
    if (document.getElementsByClassName('has-filter').length === 0) {
      const elements = Array.from(document.getElementsByClassName('need-filter'));
      for (const element of elements) {
        element.classList.add('has-filter');
      }
      this.lockFilter = true;
    } else {
      const elements = Array.from(document.getElementsByClassName('has-filter'));
      for (const element of elements) {
        element.classList.remove('has-filter');
      }
      this.lockFilter = false;
    }
  }

  @HostListener('window:resize', [])
  onWindowSizeChange() {
    if (window.innerWidth < 980) {
      this.color = this.ugla.color;
    } else {
      this.color = 'white';
    }
  }

  /**
   * change css class if the filter is open or closed
   */
  private changeClass() {
    if (this.isOpen) {
      this.classes = `${this.ugla.theme} opened`;
    } else {
        this.classes = `${this.ugla.theme}`;
    }
  }
}
