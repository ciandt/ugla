import { Component, OnInit, Input, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { People } from './../../models/people';
import { AsideItem } from './../../models/aside-item';

@Component({
  selector: 'ugl-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit, AfterViewInit {

  @Input() people: People;
  @Input() menu: AsideItem[];
  @Input() textLogout = 'Logout';
  @Input() iconLogout = 'power_settings_new';
  @Input() iconLinks = ['keyboard_arrow_right', 'keyboard_arrow_down', 'keyboard_arrow_up'];
  @Input() altPhoto = 'foto';

  @Output() logoutAction = new EventEmitter<any>();

  toggleMenu = true;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    const path = location.pathname;
    this.menu.forEach((item, index) => {
      item.visible = (item.submenu && item.submenu.length > 0) || item.url != null;
      if (item.submenu) {
        item.submenu.forEach(subitem => {
          if (subitem.url === path) {
            item.open = true;
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    this.resizeContent();
  }

  logout() {
    this.logoutAction.emit();
  }

  toggleSubmenu(index: string) {
    this.menu[index].open = !this.menu[index].open;
  }

  getIcon(index: string, subindex?: string) {
    let hasSubmenu = this.menu[index].submenu !== null;

    let noSubmenuHasUrl = false;
    if (!hasSubmenu) {
      noSubmenuHasUrl = this.menu[index].url !== null;
    }

    if (subindex !== undefined) {
      hasSubmenu = this.menu[index].submenu[subindex].submenu !== null;
    }

    let open = false;

    if (!this.menu[index].hasOwnProperty('open')) {
      this.menu[index].open = false;
      open = false;
    } else {
      open = this.menu[index].open;
    }

    if (!hasSubmenu || noSubmenuHasUrl) {
      return this.iconLinks[0];
    } else if (!open) {
      return this.iconLinks[1];
    } else {
      return this.iconLinks[2];
    }
  }

  toggle() {
    this.toggleMenu = !this.toggleMenu;
    this.resizeContent();
  }

  resizeContent() {
    const sections = document.getElementsByClassName('has-aside');
    const breadcrumb = document.getElementsByClassName('breadcrumb');

    if (!this.toggleMenu) {
      this.toggleClass(sections, true);
      this.toggleClass(breadcrumb, true);
    } else {
      this.toggleClass(sections, false);
      this.toggleClass(breadcrumb, false);
    }
  }

  toggleClass(list: any, add = false) {
    if (add) {
      for (let i = 0; i <= list.length; i++) {
        if (list.item(i) !== null) {
          list.item(i).classList.add('aside-small');
        }
      }
    } else {
      for (let i = 0; i <= list.length; i++) {
        if (list.item(i) !== null) {
          list.item(i).classList.remove('aside-small');
        }
      }
    }
  }
}
