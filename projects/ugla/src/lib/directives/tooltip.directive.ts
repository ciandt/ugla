import {
	Directive,
	ElementRef,
	Input,
	AfterViewInit,
	SimpleChanges,
  OnChanges
} from '@angular/core';
import Tooltip from 'tooltip.js';
import { Options, TitleFunction } from 'tooltip.js';

@Directive({
	selector: '[uglTooltip]',
	exportAs: 'uglTooltip'
})
export class TooltipDirective implements AfterViewInit, OnChanges {

	_tooltip: any;

	/**
	 * Default tooltip options
	 */
	_options: Options = {
		placement: 'top',
		title: undefined,
		trigger: 'hover focus',
		closeOnClickOutside: true
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
			this._options = Object.assign(this._options as object, value);
		}
	}

	/**
	 * @ignore
	 */
	constructor(private elementRef: ElementRef) {}

	/**
	 * Set configurations after view is initializes
	 */
	ngAfterViewInit(): void {
		if (this.title) {
			this._options.title = this.title;
		}
		this._tooltip = new Tooltip(
			this.elementRef.nativeElement as HTMLElement,
			this._options
		);
	}

	/**
   * Set a new tooltip instance
   * @param value
   */
  private newTooltipInstance(value: string | HTMLElement | TitleFunction): void {
		if (this._tooltip) {
			this._tooltip.updateTitleContent(value.toString());
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.title && changes.title.currentValue !== changes.title.previousValue) {
			this._options.title = changes.title.currentValue;
			this.newTooltipInstance(this._options.title);
		}
	}
}
