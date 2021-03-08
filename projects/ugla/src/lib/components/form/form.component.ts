import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Form } from '../../enum';
import { UglaService } from '../../ugla.service';
import { NgClass } from '@angular/common';

/**
 * Form
 */
@Component({
  selector: 'ugl-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {

  /**
   * @ignore
   */
  constructor(private ugla: UglaService) { }

  /**
   * Set class background to footer.
   */
  @Input() footerWithBackground = false;

  /**
   * Set text to cancel button
   * Default: Cancel
   */
  @Input() cancelText: string;

  /**
   * Set text to submit button
   * Default: Submit
   */
  @Input() submitText: string;

  /**
   * Set color to submit button
   * Default is color of current theme
   */
  @Input() submitColor: string;

  /**
   * Set to disable submit event on Enter
   * Default is false
   */
  @Input() disableSubmitEnter = false;

  /**
   * Event to cancel button
   */
  @Output() cancelClick = new EventEmitter<any>();

  /**
   * Event to submit form
   */
  @Output() submitClick = new EventEmitter<any>();

  /**
   * hidden submit button
   * Default true
   */
  @Input() hiddenButtonSubmit?: boolean;

  @Input() ngClass: NgClass;

  /**
   * Disable submit button
   * Default: false
   */
  @Input() disableSubmitButton?: boolean;

  /**
   * Call cancel event.
   */
  onCancelClick() {
    this.cancelClick.emit(true);
  }

  /**
   * Call submit event
   */
  onSubmitClick(event) {
    if (this.disableSubmitButton) {
      return false;
    }
    this.submitClick.emit(event);
  }

  onEnter(event, form) {
    if (event.keyCode !== 13) {
      return false;
    }
    if (this.disableSubmitEnter && event.keyCode === 13) {
      return false;
    }
    this.submitClick.emit(form);
  }

  /**
   * Set initials configurations
   */
  ngOnInit() {
    this.cancelText = (this.cancelText === undefined) ? Form.CANCEL_BUTTON_LABEL : this.cancelText;
    this.submitText = (this.submitText === undefined) ? Form.SUBMIT_BUTTON_LABEL : this.submitText;
    this.hiddenButtonSubmit = (this.hiddenButtonSubmit === undefined) ? false : this.hiddenButtonSubmit;
    this.disableSubmitButton = (this.disableSubmitButton === undefined) ? false : this.disableSubmitButton;
    this.submitColor = (this.submitColor === undefined) ? this.ugla.color : this.submitColor;
  }

  /**
   * Watch updates on disable submit button
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.disableSubmitButton !== undefined) {
      this.disableSubmitButton = changes.disableSubmitButton.currentValue;
    }
  }
}
