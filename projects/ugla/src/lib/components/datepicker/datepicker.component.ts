import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form} from '../../enum';
import * as datepicker_ from 'js-datepicker';
import {UglaService} from '../../ugla.service';
import * as moment_ from 'moment';

/**
 * @ignore
 */
const datepicker = datepicker_;
const moment = moment_;

@Component({
  selector: 'ugl-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, AfterViewInit {

  /**
   * Set name
   */
  @Input() name: string;

  /**
   * Set label
   */
  @Input() label: string;

  /**
   * Set initial value
   */
  @Input()
  set value(value: any) {
    if (value) {
      this._value = new Date(value);
    }
  }

  get value() {
    if (this.picker) {
      this.picker.dateSelected = this._value;
    }
    return null;
  }

  /**
   * Set message
   */
  @Input() message: string;

  /**
   * Set a options
   *
   * [See more](https://github.com/qodesmith/datepicker)
   * Default:
   * - startDate: new Date()
   * - position: 'br'
   * - formatter: locale en-US
   */
  @Input() options: any;

  /**
   * Is disabled?
   *
   * Default: false
   */
  @Input() disabled: boolean;

  /**
   * Is required
   *
   * Default: false
   */
  @Input() required: boolean;

  /**
   * Is invalid
   *
   * Default: false
   */
  @Input() invalid: boolean;

  /**
   * Message for invalid selection
   *
   * Default: Form.INVALID_SELECTION
   */
  @Input() messageInvalidSelection: string;

  /**
   * Message for invalid selection
   *
   * Default: Form.REQUIRED
   */
  @Input() messageRequired: string;

  /**
   * Language for date formatting
   *
   * Default: en
   */
  @Input() language: string;

  /**
   * Allow set field readonly
   * Use as needed to assure a disabled look and feel, but still readable by accessibility's screen readers.
   * Default:  false
   */
  @Input() set readonly(value: boolean) {
    this._readonly = value;

    if (this.picker) {
      if (value) {
        this.picker.calendar.remove();
      } else {
        // instantiate a new datepicker
        this.picker.remove();
        this.options.onSelect = (instance) => {
          // force trigger event of input
          const event = new Event('change');
          instance.el.dispatchEvent(event);
        };
        this.newDatepickerInstance();
      }
    }
  }

  get readonly() {
    return this._readonly;
  }

  /**
   * Set a date custom date pattern.
   * Using the pattern, it's possible to parse into a valid date object.
   * Default: null
   */
  @Input() datePattern: string;

  @Output() onSelectValue = new EventEmitter<Date>();

  /**
   * List classes
   */
  public groupClass: string;

  /**
   * Save the origin message
   */
  public originalMessage: string;

  /**
   * Indicates if the format of the date is invalid
   *
   * Default is false
   */
  public invalidFormat: boolean;

  /**
   * Classes of the component
   */
  public classes: string;

  /**
   * @ignore
   */
  picker: any;

  id: string;

  private _value: Date;

  private _readonly: boolean;

  /**
   * @ignore
   */
  private theme: string;

  /**
   * @ignore
   */
  constructor(private ugla: UglaService) {
    this.theme = ugla.theme;
  }

  /**
   * Event on change inputs
   * @param picker is a instance of Picker
   */
  onDateChange(picker) {
    if (picker) {
      if (!!this.datePattern) {
        try {
          let momentDate: moment_.Moment;

          // If date was selected using datepicker
          if (!!picker.dateSelected) {
            momentDate = moment(picker.dateSelected);
            picker.el.value = momentDate.format(this.datePattern);
          }

          const dateValue = moment(picker.el.value, this.datePattern, this.language, true);

          if (dateValue.isValid()) {
            picker.setDate(dateValue.toDate(), true);
            picker.el.value = dateValue.format(this.datePattern);
            this.invalid = false;
            this.message = dateValue.isValid() ? this.originalMessage : this.messageInvalidSelection;
          } else {
            this.invalid = !dateValue.isValid();
            this.message = dateValue.isValid() ? this.originalMessage : this.messageInvalidSelection;
            this.invalidFormat = dateValue.parsingFlags().invalidFormat;
          }
        } catch (e) {
          this.invalid = true;
          this.message = this.messageInvalidSelection;
        } finally {
          this.invalidFormat = this.invalid;
        }

      } else {
        try {
          const format = this.language === 'en' ? '$1/$2/$3' : '$2/$1/$3';
          picker.setDate(new Date(picker.el.value.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, format)), true);
          this.invalid = false;
          this.message = this.originalMessage;
        } catch (e) {
          this.invalid = true;
          this.message = this.messageInvalidSelection;
        } finally {
          this.invalidFormat = this.invalid;
        }
      }
      this.onSelectValue.emit(picker.dateSelected);
    }
  }

  resetField() {
    this.picker.setDate(null, false);
    this.picker.parent.classList.add('reset');
  }

  /**
   * Set initials configurations
   */
  ngOnInit() {
    this.id = 'datepicker-' + this.name;
    this.originalMessage = this.message;
    this.value = this.value ? this.value : '';
    this.invalid = (this.invalid !== undefined) ? this.invalid : false;
    this.disabled = (this.disabled !== undefined) ? this.disabled : false;
    this.readonly = (this.readonly !== undefined) ? this.readonly : false;
    this.messageInvalidSelection = (this.messageInvalidSelection !== undefined) ? this.messageInvalidSelection : Form.INVALID_SELECTION;
    this.messageRequired = (this.messageRequired !== undefined) ? this.messageRequired : Form.REQUIRED;
    this.language = (this.language !== undefined) ? this.language : 'en';
    this.invalidFormat = (this.invalidFormat !== undefined) ? this.invalidFormat : false;
    this.options = (this.options !== undefined) ? this.options : this.defaultInitDatepicker();
    this.classes = `${this.theme}`;
    this.datePattern = !!this.datePattern ? this.datePattern : this.language === 'br' ? 'DD/MM/YYYY' : 'MM/DD/YYYY';

    this.options.onHide = (instance) => {
      this.onFocusOut(instance);
    };

    this.options.onSelect = (instance) => {
      // force trigger event of input
      const event = new Event('change');
      instance.el.dispatchEvent(event);
    };

  }

  /**
   * Event focus in
   * @param instance is a instance of Picker
   */
  onFocusIn(instance) {
    const input: HTMLInputElement = instance.el;
    input.setAttribute('focused', 'true');

    input.parentElement.classList.remove('reset');
  }

  /**
   * Event focus out
   * @param instance is a instance of Picker
   */
  onFocusOut(instance) {
    // Both instances will be set because they are linked by `id`.
    const input: HTMLInputElement = instance.el;

    if (input.parentElement.classList.value.indexOf('reset') > -1) {
      this.invalid = false;
      input.classList.remove('invalid');
      this.message = this.originalMessage;
    } else if (this.required && input.hasAttribute('focused')) {
      if (input.value.length === 0) {
        this.invalid = true;
        this.message = this.messageRequired;
      } else if (!this.invalid) {
        this.invalid = false;
        input.classList.remove('invalid');
        this.message = this.originalMessage;
      }
    }
  }

  /**
   * Set a current date value.
   */
  setCurrentDate() {
    if (this._value) {
      this.picker.setDate(this._value, true);
      const event = new Event('change');
      const input: HTMLInputElement = this.picker.el;
      input.dispatchEvent(event);
    } else {
      this.picker.setDate(null, false);
    }
  }

  /**
   * Execute on after view
   */
  ngAfterViewInit() {
    this.newDatepickerInstance();
    this.setCurrentDate();
  }

  /**
   * Set a date
   * @param date is a selected Date
   */
  setDate(date: Date) {
    if (date === null) {
      this.picker.setDate();
    } else {
      this.picker.setDate(date);
    }

    const event = new Event('change');
    const input: HTMLInputElement = this.picker.el;
    input.dispatchEvent(event);
  }

  /**
   * Default init datepicker options.
   */
  defaultInitDatepicker() {
    return this.options = {
      startDate: new Date(),
      position: 'br'
    };
  }

  /**
   * Hide datepicker calendar from screen readers
   */
  private hideFromScreenReaders() {
    document.querySelectorAll('.qs-datepicker').forEach(item => item.setAttribute('aria-hidden', 'true'));
    document.querySelectorAll('.qs-overlay-year').forEach(item => item.setAttribute('aria-hidden', 'true'));
  }

  private newDatepickerInstance() {
    this.picker = datepicker('#datepicker-' + this.name, this.options);
    this.hideFromScreenReaders();
  }
}
