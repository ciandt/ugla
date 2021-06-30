import { Menu } from './../../models/menu';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ugl-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() menu: Menu;
  @Input() title: string;
  @Input() logo: string;

  constructor() { }

  ngOnInit() {
  }

}
