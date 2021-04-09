import { Component,
        ElementRef,
        EventEmitter,
        HostListener,
        Input,
        OnDestroy,
        OnInit,
        Output,
        Renderer2,
        ViewChild,
        OnChanges,
        SimpleChanges } from '@angular/core';
import {Options, Select} from '../../models';
import {UglaService} from '../../ugla.service';
import {Form, KeyCode} from '../../enum';

/**
 * Select
 *
 * @example
 * <ugl-select [select]="select" (selectItemEmit)="yourFunction($event)" [ngClass]="'header'"></ugl-select>
 *
 * <ugl-select
 *   [label]="'Language'"
 *   [select]="select"
 *   [readonly]="true"
 *   [message]="'Select your language'"
 *   [dataTitle]="'Select an option'"
 *   (selected)="selectLanguage($event)">
 * </ugl-select>
 *
 * @example
 * public people = new People('PEOPLE NAME', 'LOGIN', 'IMAGE URL');
 *
 * @example
 * public select = new Select('language', [
 *  new Options('Select an option', '-1'),
 *  new Options('Portuguese PT-BR', 'pt_br', true, 'green'),
 *  new Options('English EN', 'en')
 * ], 'white', 'aquamarine');
 */
@Component({
  selector: 'ugl-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * Receives theme's name
   */
  public theme: string;

  /**
   * Classes list
   */
  public classGroup: string;

  /**
   * Set select object
   */
  @Input() select: Select;

  /**
   * Set label
   */
  @Input() label: string;

  /**
   * Set message
   */
  @Input() message: string;

  /**
   * Is stylized?
   *
   * Stylized is used only header
   *
   * Default value: false
   */
  @Input() stylized: boolean = false;

  /**
   * If is stylized, set a defined type
   *
   * Stylized type options: header or pagination
   *
   * Default value: header
   */
  @Input() stylizedType = 'header';

  /**
   * Is disabled?
   *
   * Default value: false
   */
  @Input() disabled: boolean = false;

  /**
   * Set data-title attribute
   *
   * Default value: none
   */
  @Input() dataTitle: string;

  /**
   * Is required
   *
   * Default: false
   */
  @Input() required: boolean;

  /**
   * Z-index of the field. Optional.
   *
   * Default: 2
   */
  @Input() zindex = 2;

  /**
   * Direction to open list
   *
   * Default: bottom
   */
  @Input() direction = 'bottom';

  /**
   * Get a checkbox element under select list
   */
  @ViewChild('checkbox') checkbox !: ElementRef;


  /**
   * Event on clicked option
   */
  @Output() selected = new EventEmitter();

  /**
   * Is invalid
   *
   * Default: false
   */
  @Input() invalid: boolean;

  /**
   * Message for invalid selection
   *
   * Default: Form.REQUIRED
   */
  @Input() messageRequired: string;

  /**
   * Set a truncate length for the text.
   */
  @Input() truncateLength: number;

  /**
   * Set a readonly mode
   */
  @Input() readonly = false;

  @Input() width: string;

  @Input() nextFocus = "";

  /**
   * Original message
   */
  public originalMessage: string;

  /**
   * Style for select
   */
  public selectStyle: {};

  /**
   * Classes of the component
   */
  public classes = '';

  private _open = false;


  private itemsList: NodeListOf<HTMLElement>;
  private firstItem = null;
  private lastItem = null;

  /**
   * Receives the component's name
   * @param ugla: UglaService
   * @param elementRef: ElementRef
   * @param renderer: Render2
   */
  constructor(private ugla: UglaService,
              protected elementRef: ElementRef,
              private renderer: Renderer2) {
    this.theme = this.ugla.theme;
  }

  /**
   * Current values
   */
  public current = {
    description: '',
    value: '',
    checked: false,
    color: ''
  };

  originalBackgroundColor = '';
  originalZindex;

  listenClick: () => void;

  /**
   * Set initials configurations
   */
  ngOnInit() {
    const checkedItem = this.select.options.findIndex((item) => item.checked);

    this.current = this.truncateCurrentOption(this.select.options[0]);
    if (checkedItem > -1) {
      this.current = this.truncateCurrentOption(this.select.options[checkedItem]);
    }

    this.originalBackgroundColor = this.select.labelBackgroundColor;

    this.setLabelColor();

    this.originalMessage = this.message;
    this.messageRequired = (this.messageRequired !== undefined) ? this.messageRequired : Form.REQUIRED;
    this.originalZindex = this.zindex;
    this.classes = `${this.theme} ${this.select.labelColor ? 'no-margin' : ''} ${this.readonly ? 'readonly' : ''}`;
  }

  ngDoCheck(): void {
    this.itemsList = document.querySelectorAll(`#form-select-${this.select.name} [role=option]`);
    
    if (this.itemsList.length > 0) {
      this.firstItem = this.itemsList[0];
      this.lastItem = this.itemsList[this.itemsList.length - 1];
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const SELECT = 'select';

    if (changes[SELECT]) {
      this.select = changes.select.currentValue;
    }
  }

  ngOnDestroy() {
    if (this.listenClick) {
      this.listenClick();
    }
  }

  /**
   * Toggles the combobox.
   */
  toggleCombobox(event) {
    if (!this.readonly) {
      if (event.keyCode === 13 || event.keyCode === 32 || event.type === 'click') {
        if (!this._open) {
          this.open();
        } else {
          this.close();
        }
      }
    }
  }

  open() {
    if (this._open) {
      return;
    }

    this.listenClick = this.renderer.listen('window', 'click', (evt) => {
      if (!this.elementRef.nativeElement.contains(evt.target)) {
        this.close();
      }
    });

    this._open = true;

    if (!this.disabled) {
      if (this.zindex === 5) {
        this.zindex = this.originalZindex;
      } else {
        this.zindex = 5;
      }
    }

    setTimeout(() => {
      this.checkbox.nativeElement.checked = true;
      this.setFocus(this.firstItem.querySelector('label'));
    }, 0);
  }

  close() {
    this._open = false;
    this.zindex = this.originalZindex;
    this.listenClick(); // destroy event listener
    setTimeout(() => this.checkbox.nativeElement.checked = false, 0);
  }

  onClick() {
    if (!this.disabled) {
      if (this.zindex === 5) {
        this.zindex = this.originalZindex;
      } else {
        this.zindex = 5;
      }
    }
  }

  /**
   * Call selected event
   * @param value input value
   * @param event Event element
   */
  selectedItem(value, event) {
    if (event.keyCode === 13 || event.keyCode === 32 || event.keyCode === undefined) {
      this.current = this.truncateCurrentOption(this.select.options[value]);

      this.setLabelColor();

      this.checkbox.nativeElement.checked = false;
      this.checkbox.nativeElement.nextSibling.focus();
      this.validate(this.checkbox.nativeElement, value);
      this.selected.emit(this.current);
      this.close();
    }
  }

  validate(element, value) {
    if (value === 0 && this.required) {
      this.message = this.messageRequired;

      element.classList.remove('valid');
      element.classList.add('invalid');
    } else {
      if (!this.invalid) {
        element.classList.remove('invalid');
      }
      this.message = this.originalMessage;
    }
  }

  getTheme() {
    let theme = this.theme;
    if (this.stylized) {
      theme = `${theme} ${this.stylizedType}`;
    }

    if (this.readonly) {
      theme = `${theme} readonly`;
    }

    return theme;
  }

  setSelect(value, labelColor?, backgroundColor?) {
    setTimeout(() => {
      this.select.labelColor = (labelColor) ? labelColor : this.select.labelColor;
      this.select.labelBackgroundColor = (backgroundColor) ? backgroundColor : this.select.labelBackgroundColor;
      this.select.options.forEach(((item) => {
        item.checked = false;
        if (item.value === String(value)) {
          item.checked = true;
          this.current = item;
        }
      }).bind(this));
    });
  }

  /**
   * Return a truncated value.
   * @param value input value
   */
  truncateValue(value: string) {
    const ending = '...';
    if (this.truncateLength && value.length > this.truncateLength) {
      return value.substring(0, this.truncateLength - ending.length) + ending;
    }
    return value;
  }

  /**
   * Generate current option.
   *
   * @param currentOption past selected option
   */
  truncateCurrentOption(currentOption: Options) {
    const currentDescription: string = this.truncateValue(currentOption.description);
    return new Options(currentDescription, currentOption.value, currentOption.checked, currentOption.color);
  }

  setClass(color: string, backgroundColor: string) {
    const classColor = color ? `color-${color}` : '';
    const classBackgroundcolor = backgroundColor ? `background-${backgroundColor}` : '';
    const classCustom = color ? 'custom' : '';
    const classComboSelected = 'combo-selected';
    return `${classComboSelected} ${classColor} ${classBackgroundcolor} ${classCustom} `;
  }

  setLabelColor() {
    this.select.labelColor = this.current.color;
    if (this.current.value !== '-1') {
      this.select.labelBackgroundColor = 'white';
    } else {
      this.select.labelBackgroundColor = this.originalBackgroundColor;
    }
  }

  isOpened = () => this._open;

  setFocus(current: any) {
    if (current === null) {
      return;
    }
    (current as HTMLDivElement).focus();
  }

  keydownEvent(event: KeyboardEvent, index: number) {
    const current = this.itemsList[index];
    const keyCode = event.code.toUpperCase();

    if (keyCode === KeyCode.UP) {
      this.setFocusToPreviousItem(current, index);
    } else if (keyCode === KeyCode.DOWN) {
      this.setFocusToNextItem(current, index);
    } else if (keyCode === KeyCode.TAB) {
      const nextFocus = document.querySelector(this.nextFocus);
      (nextFocus as HTMLDivElement).focus()
      this.close();
    }
  }

  private setFocusToPreviousItem(current: any, index: number) {
    if (current === this.firstItem) {
      this.setFocus(this.lastItem.querySelector('label'))
    } else {
      this.setFocus(this.itemsList[index - 1].querySelector('label'));
    }
  }

  private setFocusToNextItem(current: any, index: number) {
    if (current === this.lastItem) {
      this.setFocus(this.firstItem.querySelector('label'))
    } else {
      this.setFocus(this.itemsList[index + 1].querySelector('label'));
    }
  }

  /**
   * Handles `Escape` key closing the dropdown, and arrow up/down focus to/from the dropdown list.
   */
  @HostListener('keydown', ['$event'])
  hostkeys(ev: KeyboardEvent) {
    const key = ev.code.toUpperCase();

    if (key === KeyCode.ESC) {
      this.close();
    } else if (this.elementRef && this.elementRef.nativeElement.contains(ev.target)) {
      ev.stopPropagation();
      if (key === KeyCode.DOWN || ev.key === 'Down') {
        if (!this.readonly) {
          this.open();
        }
      } else {
        this.toggleCombobox(ev);
      }
    } else if (key === KeyCode.TAB) {
      const nextFocus = document.querySelector(this.nextFocus);
      (nextFocus as HTMLDivElement).focus()
    }
  }
}
