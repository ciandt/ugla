import { Component, OnInit, ViewChild } from '@angular/core';
import { UglaService, Header, People, AsideItem, Menu, MenuItem, Select, Options, FieldComponent } from 'projects/ugla/src';
import { CodeName } from 'projects/ugla/src/lib/models/code-name';


@Component({
  selector: 'app-aside-with-breadcrumb-page',
  templateUrl: './aside-with-breadcrumb-page.component.html',
  styleUrls: ['./aside-with-breadcrumb-page.component.scss']
})
export class AsideWithBreadcrumbPageComponent implements OnInit {
  constructor(private ugla: UglaService) {}

  isAutenticated = true;

  header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);

  people = new People('Jack Connor', 'jack.connor@ugla.dev', './assets/imgs/people.png');

  revenueSourceSelect = new Select('Select',[
    new Options('Limit', '-1'),
    new Options('20', '20'),
    new Options('50', '50'),
    new Options('100', '100')]);

  autoCompleteOptions = [
    new CodeName(1, '400410001 - Revenue National'),
    new CodeName(2, '400410002 - Revenue National 2'),
    new CodeName(3, '400410003 - Invoice National 3'),
    new CodeName(2, '400410002 - Revenue National 2'),
    new CodeName(3, '400410003 - Invoice National 3'),
    new CodeName(2, '400410002 - Revenue National 2'),
    new CodeName(3, '400410003 - Invoice National 3'),
    new CodeName(2, '400410002 - Revenue National 2'),
    new CodeName(3, '400410003 - Invoice National 3'),
    new CodeName(2, '400410002 - Revenue National 2'),
    new CodeName(3, '400410003 - Invoice National 3')
  ];

  menu = [
    new AsideItem('Home', '/', true),
    new AsideItem('Login', '/login', true),
    new AsideItem('E2E', '/e2e', true),
    new AsideItem('Menu', '/menu', true),
    new AsideItem('Menu with Toolbar', '/menu-with-toolbar', true),
    new AsideItem('Rules', '/rules', true),
    new AsideItem('Aside', '/aside', true),
    new AsideItem('Aside with Breadcrumb', '/aside-with-breadcrumb', true),
  ];

  breadcrumb = new Menu([
    new MenuItem('Aside', '/aside', true, true),
    new MenuItem('Breadcrumb', '/aside-with-breadcrumb', true, true)
  ]);

  @ViewChild('autocomplete') fieldAuto: FieldComponent;
  @ViewChild('autocomplete3') fieldAuto3: FieldComponent;
  ngOnInit() {
    this.header.people = this.people;
    this.ugla.headerShadow = true;
    this.ugla.hasToolBar();

  }

  clearFields() {
    this.fieldAuto.reset();
    this.fieldAuto3.reset();
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
}
