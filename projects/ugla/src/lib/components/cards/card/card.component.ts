import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ugl-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() one: string;
  @Input() two: string;
  @Input() three: string;
  @Input() icon: string;
  @Input() colorIcon: string;
  @Input() iconTitle: string;
  @Output() actionCard = new EventEmitter<any>();
  @Output() actionIcon = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.one = (changes.one) ? changes.one.currentValue : this.one;
    this.two = (changes.two) ? changes.two.currentValue : this.two;
    this.three = (changes.three) ? changes.three.currentValue : this.three;
    this.icon = (changes.icon) ? changes.icon.currentValue : this.icon;
    this.colorIcon = (changes.colorIcon) ? changes.colorIcon.currentValue : this.colorIcon;
    this.iconTitle = (changes.iconTitle) ? changes.iconTitle.currentValue : this.iconTitle;
  }

  handlerCard(event: any) {
    this.actionCard.emit(event);
  }

  handlerIcon(event: any) {
    this.actionIcon.emit(event);
  }

}
