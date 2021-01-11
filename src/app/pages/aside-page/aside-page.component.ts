import { Component, OnInit } from '@angular/core';
import { UglaService, Header, People, AsideItem } from 'projects/ugla/src';

@Component({
  selector: 'app-aside-page',
  templateUrl: './aside-page.component.html',
  styleUrls: ['./aside-page.component.scss']
})
export class AsidePageComponent implements OnInit {
  constructor(private ugla: UglaService) {}

  isAutenticated = true;
  showFloatPage = false;
  floatPageButtonDisabled = false;

  header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);

  people = new People('Jack Connor', 'jack.connor@ugla.dev', './assets/imgs/people.png');

  menu = [
    new AsideItem('Home', null, true),
    new AsideItem('Login', '/login', true),
    new AsideItem('E2E', '/e2e', true),
    new AsideItem('Menu', '/menu', true),
    new AsideItem('Menu with Toolbar', '/menu-with-toolbar', true),
    new AsideItem('Rules', '/rules', true),
    new AsideItem('Aside', null, true, false, '', [
      new AsideItem('Item 1', '/item-1', true),
      new AsideItem('Item 2', '/item-2', true),
      new AsideItem('Item 3', '/item-3', true),
      new AsideItem('Item 4', '/item-4', true)
    ]),
    new AsideItem('Aside with Breadcrumb', null, true, false, '', [
      new AsideItem('Aside', '/aside', true),
      new AsideItem('Home', '/home', true),
    ]),
  ];

  ngOnInit() {
    this.header.people = this.people;
    this.ugla.headerShadow = true;
    this.ugla.hasToolBar();
  }

  hideMenu() {
    this.isAutenticated = false;
  }

  logout() {
    this.isAutenticated = false;
  }

  selectLanguage(language) {
    console.log(`Language selected is ${language.description} and the code is ${language.value}`);
  }

  formAction() {
    return false;
  }

  tooglePageFloat() {
    this.showFloatPage = !this.showFloatPage;
  }

  floatButtonToggle() {
    this.floatPageButtonDisabled = !this.floatPageButtonDisabled;
  }

}
