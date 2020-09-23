import { Directive, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import Tooltip from 'tooltip.js';
import { Options, TitleFunction } from 'tooltip.js';

@Directive({
  selector: '[uglTooltip]',
  exportAs: 'uglTooltip'
})
export class TooltipDirective implements AfterViewInit {
  _tooltip: any;

  /**
   * Default tooltip options
   */
  _options: Options = {
    placement: 'top',
    title: undefined,
    trigger: 'hover focus',
    closeOnClickOutside: true,
  };

  /**
   * Set the tooltip title value
   */
  @Input('uglTooltipTitle') title?: string | HTMLElement | TitleFunction;

  /**
   * Set the tooltip options value
   */
  @Input('uglTooltip')
  set options(value: {} | Options) {
    if (value) {
<<<<<<< HEAD
      this._options = Object.assign(this._options as Object, value);
=======
      this._options = Object.assign(this._options as object, value);
>>>>>>> upgrade
    }
  }

  /**
   * @ignore
   */
  constructor(private elementRef: ElementRef) {}

  /**
   * Set configurations after view is initializes
   */
  ngAfterViewInit() {
    if (this.title) {
      this._options.title = this.title;
    }
    this._tooltip = new Tooltip((this.elementRef.nativeElement as HTMLElement), this._options);
  }

  /**
   * Set a new tooltip instance
   */
  private newTooltipInstance(value: string | HTMLElement | TitleFunction) {
    if (this._tooltip) {
      this._tooltip.updateTitleContent(value.toString());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.title.currentValue !== changes.title.previousValue) {
      this._options.title = changes.title.currentValue;
      this.newTooltipInstance(this._options.title);
    }
  }
}
