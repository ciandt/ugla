import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, ElementRef, Input, ViewChild } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'ugl-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterContentInit  {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @Input() style: string;
  @Input() tabMinWidth: number;
  @Input() tabFixedWidth: number;

  @ViewChild('tabsListElement') tabsListElement: ElementRef;

  tabWidth: string;
  edgeTabWidth: string;
  tabClientWidth: number;

  public groupClass = '';

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach(tab => tab.active = false);
    tab.active = true;
  }

  constructor() { }

  ngOnInit() {
    this.style = this.style;
    this.groupClass = `${this.style}`;
    setTimeout(()=> this.calculateWidths());
  }

  calculateWidths(){
    const qty = this.tabs.length;
    const defaultMaxWidth = 700;
    const defaultMinTabSize = window.innerWidth < defaultMaxWidth ? 550 : 80;
    const minWidth = this.tabMinWidth || defaultMinTabSize;
    this.tabClientWidth = this.tabsListElement.nativeElement.clientWidth;
    const availableWidth = this.tabClientWidth - 35;

    if (window.innerWidth >= defaultMaxWidth){
      if (qty * minWidth > availableWidth){
        this.tabWidth = `${minWidth}px`;
        this.edgeTabWidth = `${minWidth}px`;
      } else {
        const width = Math.floor(availableWidth / qty);
        const edge = width + (availableWidth - (width * qty))/2;
        this.tabWidth = `${width}px`;
        this.edgeTabWidth = `${edge}px`;
      }
    } else {
      if (qty * minWidth < availableWidth){
        this.tabWidth = `${minWidth}px`;
        this.edgeTabWidth = `${minWidth}px`;
      }
    }
  }
}
