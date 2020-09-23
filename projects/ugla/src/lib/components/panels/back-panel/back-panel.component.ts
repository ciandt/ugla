import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Form } from '../../../enum';
import { NgClass } from '@angular/common';

/**
 * Back panel component
 *
 * This component generates a panel with back button
 *
 * @example
 * <ugl-back-panel
 *  [backButtonLabel]="'Back'"
 *  [floatingButton]="true"></ugl-back-panel>
 */
@Component({
  selector: 'ugl-back-panel',
  templateUrl: './back-panel.component.html',
  styleUrls: ['./back-panel.component.scss']
})
export class BackPanelComponent {

  /**
   * Receive the back button label
   * Default: Back
   */
  @Input() backButtonLabel = Form.BACK_BUTTON_LABEL;

  /**
   * Indicates if back button is floating on desktop
   * Default: false
   */
  @Input() floatingButton = false;

  
  @Input() ngClass: NgClass;

  /**
   * Emit the back button click
   */
  @Output() backButtonClicked = new EventEmitter<any>();

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Function called when back button is clicked.
   * Emit the click event.
   */
  back() {
    this.backButtonClicked.emit();
  }

}
