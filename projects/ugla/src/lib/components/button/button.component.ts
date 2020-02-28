import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { UglaService } from '../../ugla.service';

/**
 * Button
 *
 * @example
 * <ugl-button
 *    [id]="'id'"
 *    [type]="TYPE"
 *    [theme]="THEME"
 *    [style]="STYLE"
 *    [wave]="false"
 *    [title]="TITLE"
 *    [disabled]="false">TEXT</ugl-button>
 */
@Component({
  selector: 'ugl-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges {

  /**
   * Text to attribute id
   */
  @Input() id: string;

  /**
   * Set size: large, medium, small
   *
   * Default: ''
   */
  @Input() size: string;

  /**
   * Receives the theme's name
   */
  @Input() theme: string;

  /**
   * Set color: white, aquamarine, red, purple
   *
   * Default: aquarine
   */
  @Input() color: string;

  /**
   * Set style: fill, border, icon
   *
   * Default: fill
   */
  @Input() style: string;

  /**
   * Has wave effect?
   *
   * Default: true
   */
  @Input() wave: boolean;

  /**
   * Text to title
   *
   * Default: ''
   */
  @Input() title: string;

  /**
   * Has disabled
   *
   * Default: false
   */
  @Input() disabled: boolean;

  /**
   * Types: submit, button
   *
   * Default: button
   */
  @Input() type: string;

  /**
   * Element tabindex
   *
   * Default: 0
   */
  @Input() tabindex: number;

  /**
   * Indicates if button should be floating
   *
   * Default: false
   */
  @Input() floating = false;

  /**
   * Function to action
   */
  @Output() action = new EventEmitter<any>();

  @Input() set rotated(rotated: boolean) {
    this._rotated = rotated;

    if (this.rotated) {
      this.groupClass.push('rotated');
    } else {
      if (this.groupClass.indexOf('rotated') > -1) {
        this.groupClass.splice(this.groupClass.indexOf('rotated'), 1);
      }
    }
  }

  get rotated(): boolean {
    return this._rotated;
  }

  _rotated = false;

  /**
   * @ignore
   */
  public groupClass = [];

  /**
   * @ignore
   */
  constructor() {
  }

  /**
   * Set initials configurations
   */
  ngOnInit() {
    this.size = (this.size === undefined) ? '' : this.size;
    this.style = (this.style === undefined) ? 'fill' : this.style;
    this.color = (this.color === undefined) ? 'aquamarine' : this.color;
    this.disabled = (this.disabled === undefined) ? false : this.disabled;
    this.type = (this.type === undefined) ? 'button' : this.type;
    this.tabindex = (this.tabindex === undefined) ? 0 : this.tabindex;

    if (this.theme !== undefined && this.theme !== 'theme-white') {
      this.color = 'white';
    }

    const isIcon = this.style === 'icon' ? `btn-icon btn-${this.style}-${this.color}` : `btn btn-${this.style}-${this.color}`;

    this.groupClass.push(this.size);
    this.groupClass.push(isIcon);

    if (this.wave) {
      this.groupClass.push('wave');
    }

    if (this.floating) {
      this.groupClass.push('floating');
    }

    if (this.rotated) {
      this.groupClass.push('rotated');
    }
  }

  clickedButton(event: any) {
    this.action.emit(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    const COLOR = 'color';

    if (changes[COLOR] !== undefined ) {
      this.color = changes[COLOR].currentValue;
      const isIcon = this.style === 'icon' ? `btn-icon btn-${this.style}-${this.color}` : `btn btn-${this.style}-${this.color}`;
      this.groupClass.push(this.size);
      this.groupClass.push(isIcon);

      if (this.wave) {
        this.groupClass.push('wave');
      }
     }
  }
}
