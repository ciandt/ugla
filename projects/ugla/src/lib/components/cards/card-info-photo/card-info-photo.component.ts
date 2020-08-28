import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ugl-card-info-photo',
  templateUrl: './card-info-photo.component.html',
  styleUrls: ['./card-info-photo.component.scss']
})
export class CardInfoPhotoComponent implements OnInit {

  @Input() photo: string;
  @Input() title: string;
  @Input() infos: string[];
  @Input() clicked: boolean;
  @Output() action = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  handler() {
    this.action.emit();
  }
}
