import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ugl-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() title: string;
  @Input() active = false;

  constructor() { }

  ngOnInit(): void {
  }

}
