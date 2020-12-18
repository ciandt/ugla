import { Component, OnInit } from '@angular/core';
import { Header, MenuItem, Menu, People, UglaService, Select, Options, ModalService, ListOptionsItem } from 'projects/ugla/src';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
  constructor(private ugla: UglaService, private modaService: ModalService) {}

  names = ['Amanda Diane', 'Diogo Torres', 'Job Jon Job'];
  items = [
    new ListOptionsItem('Roberta Piva', true),
    new ListOptionsItem('Michele', false),
    new ListOptionsItem('Getulio', true),
  ];

  icon = 'check_box_outline_blank';

  isAutenticated = true;

  header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);

  people = new People('Jack Connor', 'jack.connor@ugla.dev', './assets/imgs/people.png');

  options: object;

  menu = new Menu([
    new MenuItem('Home', '/', true),
    new MenuItem('Login', '/login', true, true),
    new MenuItem('E2E', '/e2e', true),
    new MenuItem('Menu', '/menu', true),
    new MenuItem('Menu with Toolbar', '/menu-with-toolbar', true),
    new MenuItem('Rules', '/rules', true),
    new MenuItem('Aside', '/aside', true),
    new MenuItem('Aside with<br/>Breadcrumb', '/aside-with-breadcrumb', true),
  ]);

select = new Select('language', [
  new Options('Select an option', '-1'),
  new Options('Portuguese PT-BR', 'pt_br',),
  new Options('English EN', 'en')]);

radioItems = [
  new Options('Check1', '1', false, '#d71f3c', 'radios'),
  new Options('Check2', '2', true, '#656565', 'radios'),
  new Options('Check3', '3', false, '#656565', 'radios'),
  new Options('Check4', '4', false, '#656565', 'radios')
];

  ngOnInit() {
    this.header.people = this.people;
    this.header.menu = this.menu;
    this.ugla.headerShadow = true;
    this.ugla.hasToolBar();
    this.options = {
      minDate: new Date(2020, 1, 3), //hide dates before
      maxDate: new Date(2020, 12, 3), //hide dates after
      position: 'tr' //position of calendar | tr = top right
    };
  }

  hideMenu() {
    this.isAutenticated = false;
  }

  openModal() {
    this.modaService.error('Teste', 'Teste teste teste');
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

  changeIcon() {
    if (this.icon === 'check_box_outline_blank') {
      this.icon = 'check_box';
    } else {
      this.icon = 'check_box_outline_blank';
    }
  }

  selectCoachee(event) {
    const coachee = console.log(event);
  }
}
