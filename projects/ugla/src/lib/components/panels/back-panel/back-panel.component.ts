import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Form } from '../../../enum';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ugl-back-panel',
  templateUrl: './back-panel.component.html',
  styleUrls: ['./back-panel.component.scss']
})
export class BackPanelComponent {

  @Input() backButtonLabel = Form.BACK_BUTTON_LABEL;
  @Input() ngClass: NgClass;

  /**
   * Emit the back button click
   */
  @Output() backButtonClicked = new EventEmitter<any>();

  /**
   * @ignore
   */
  constructor() { }

  back() {
    this.backButtonClicked.emit();
  }
}
