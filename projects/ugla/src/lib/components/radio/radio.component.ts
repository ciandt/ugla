import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Options } from '../../models/options';
import { UglaService } from '../../ugla.service';

export enum KEY_CODE {
  RETURN = 13,
  SPACE = 32,
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40
}

/**
 * Radio
 *
 *
 *
 * @example
 * <ugl-radio [items]="radioItems" (itemChecked)="getItemChecked($event)" [radioGroupAriaLabel]="'Select an option'">
 *
 * @example
 * this.radioItems = [new Options('Check1', '1', false, '#d71f3c', 'radios'),
 * new Options('Check2', '2', true, '#656565', 'radios'),
 * new Options('Check3', '3', false, '#656565', 'radios'),
 * new Options('Check4', '4', false, '#656565', 'radios')];
 */
@Component({
  selector: 'ugl-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

  @Input() items: Options[];
  @Input() radioGroupAriaLabel: string;
  @Output() itemChecked = new EventEmitter<Options>();
  @Input() disabled = false;

  @ViewChild('radioButton') radioButton: HTMLDivElement;

  private radioButtons: NodeListOf<HTMLElement>;
  private firstRadioButton = null;
  private lastRadioButton = null;

  /**
   * Insert the theme name on html component
   */
  public theme: string;

  /**
   * Receives the component's name
   * @param ugla: UglaService
   */
  constructor(private ugla: UglaService) {
    this.theme = ugla.theme;
  }

  ngOnInit() {
    if (this.disabled) {
      this.theme = `${this.theme} disabled`;
    }
  }

  ngDoCheck(): void {
    // get all radio buttons in radiogroup
    this.radioButtons = document.querySelectorAll('[role=radio]');

    for (let i = 0; i < this.radioButtons.length; i++) {
      if (!this.firstRadioButton) {
        this.firstRadioButton = this.radioButtons[i];
      }
      this.lastRadioButton = this.radioButtons[i];
    }
    // set first item tabIndex = 0
    if (this.firstRadioButton) {
      this.firstRadioButton.tabIndex = 0;
    }
  }

  setChecked(item: Options) {
    this.itemChecked.emit(item);
    this.updateItems(item);
  }

  private updateItems(item: Options) {
    this.items.forEach(i => {
      if (i.value === item.value) {
        i.checked = true;
      } else {
        i.checked = false;
      }
    });
  }

  keydownEvent(event: KeyboardEvent, item: Options) {
    const current = event.currentTarget;
    const keyCode = event.keyCode;
    let flag = false;

    if (keyCode === KEY_CODE.SPACE || keyCode === KEY_CODE.RETURN) {
      this.onSelectItem(event, item);
    } else if (keyCode === KEY_CODE.UP) {
      this.setFocusToPreviousItem(current);
      flag = true;
    } else if (keyCode === KEY_CODE.DOWN) {
      this.setFocusToNextItem(current);
      flag = true;
    } else if (keyCode === KEY_CODE.LEFT) {
      this.setFocusToPreviousItem(current);
      flag = true;
    } else if (keyCode === KEY_CODE.RIGHT) {
      this.setFocusToNextItem(current);
      flag = true;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onSelectItem(event: any, selectedItem: Options) {
    const current = event.currentTarget;
    this.setChecked(selectedItem);

    if (current.getAttribute('aria-checked')) {
      this.items.forEach(item => {
        item.checked = item === selectedItem;
      });
    }
  }

  private setFocusToPreviousItem(current: any) {
    let index: number;
    if (current === this.firstRadioButton) {
      this.setFocus(this.lastRadioButton);
    } else {
      const radioButtonsArray = Array.prototype.slice.call(this.radioButtons);
      index = radioButtonsArray.indexOf(current);
      this.setFocus(radioButtonsArray[index - 1]);
    }
  }
  private setFocusToNextItem(current: any) {
    let index: number;
    if (current === this.lastRadioButton) {
      this.setFocus(this.firstRadioButton);
    } else {
      const radioButtonsArray = Array.prototype.slice.call(this.radioButtons);
      index = radioButtonsArray.indexOf(current);
      this.setFocus(radioButtonsArray[index + 1]);
    }
  }

  private setFocus(currentItem: any) {
    if (currentItem === null) {
      return;
    }
    this.radioButtons.forEach(radio => {
      radio.tabIndex = -1;
    });

    (currentItem as HTMLDivElement).focus();
    currentItem.tabIndex = 0;
  }
}
