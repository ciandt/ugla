import { UglaService } from './../../ugla.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ugl-label-span',
  templateUrl: './label-span.component.html',
  styleUrls: ['./label-span.component.scss']
})
export class LabelSpanComponent implements OnInit {
  theme: string;
  @Input() label: string;
  @Input() texts: string[];

  constructor(private ugla: UglaService) {
    this.theme = ugla.theme;
  }

  ngOnInit() {
  }

}
