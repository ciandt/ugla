import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Card Timeline
 *
 * This component generates a card, emitting if the card is clicked.
 *
 * @example
 * <ugl-card-timeline
 *  [id]="'id'"
 *  [title]="'Title'"
 *  [info1]="'info1'"
 *  [info2]="'info2'"
 *  [status]="'Status'"
 *  [color]="'green'"
 *  (cardClicked)="onCardClick(event)">Extra content</ugl-card-timeline>
 */
@Component({
  selector: 'ugl-card-timeline',
  templateUrl: './card-timeline.component.html',
  styleUrls: ['./card-timeline.component.scss']
})
export class CardTimelineComponent {

  /**
   * Set the card id
   */
  @Input() id: string;

  /**
   * Set the title (region 1)
   */
  @Input() title: string;

  /**
   * Set the info1 (region 2)
   */
  @Input() info1: string;

  /**
   * Set the info2 (region 3)
   */
  @Input() info2: string;

  /**
   * Set the status (region 4)
   */
  @Input() status: string;

  /**
   * Set the status color: aquamarine, green, red, yellow, purple, grey
   *
   * Default: grey
   */
  @Input() color = 'grey';

  /**
   * Emitter for card clicked.
   */
  @Output() cardClicked = new EventEmitter<boolean>();

  constructor() { }

  /**
   * Function called on click of the card. Emit true.
   * @param event is null
   */
  onCardClicked(event) {
    this.cardClicked.emit(true);
  }

}
