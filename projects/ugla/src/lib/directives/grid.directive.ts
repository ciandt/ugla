import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

/**
 * Directive for create a grid
 *
 * @example
 * // Create a grid div:
 * <div uglGrid [grid]="true" [col]="'2'" [colSm]="'3'"></div>
 * // Generated html:
 * <div class="grid col-2 col-sm-3"></div>
 *
 */
@Directive({
  selector: '[uglGrid]'
})
export class GridDirective implements OnInit {
  @Input() set grid(grid: boolean) {
    this._grid = grid;
    this.classes.push('grid');
  }

  get grid(): boolean {
    return this._grid;
  }

  @Input() set col(col: number) {
    this._col = col;
    this.classes.push(`col-${this.col}`);
  }

  get col(): number {
    return this._col;
  }

  @Input() set colSm(colSm: number) {
    this._colSm = colSm;
    this.classes.push(`col-sm-${this.colSm}`);
  }

  get colSm(): number {
    return this._colSm;
  }

  @Input() set gap(gap: number) {
    this._gap = gap;
    this.classes.push(`gap-${this.gap}`);
  }

  get gap(): number {
    return this._gap;
  }

  @Input() set gapSm(gapSm: number) {
    this._gapSm = gapSm;
    this.classes.push(`gap-sm-${this.gapSm}`);
  }

  get gapSm(): number {
    return this._gapSm;
  }

  @Input() set span(span: number) {
    this._span = span;
    this.classes.push(`span-${this.span}`);
  }

  get span(): number {
    return this._span;
  }

  @Input() set spanSm(spanSm: number) {
    this._spanSm = spanSm;
    this.classes.push(`span-sm-${this.spanSm}`);
  }

  get spanSm(): number {
    return this._spanSm;
  }

  @Input() set customCol(customCol: string) {
    this._customCol = customCol;
    this.element.nativeElement.style.gridTemplateColumns = this.customCol;
  }

  get customCol(): string {
    return this._customCol;
  }

  private _grid: boolean;
  private _col: number;
  private _colSm: number;
  private _gap: number;
  private _gapSm: number;
  private _span: number;
  private _spanSm: number;
  private _customCol: string;

  private classes = [];

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const classes =  this.element.nativeElement.classList;
    this.element.nativeElement.classList.value = `${this.classes.join(' ')} ${classes.value}`;
  }
}
