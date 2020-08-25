import { Component, OnInit } from '@angular/core';
import { Header, MenuItem, Menu, People, UglaService, Select, Options, ModalService } from 'projects/ugla/src';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {
  constructor(private ugla: UglaService, private modaService: ModalService) {}

  icon = 'check_box_outline_blank';

  isAutenticated = true;

  header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);

  people = new People('Jack Connor', 'jack.connor@ugla.dev', './assets/imgs/people.png');

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

  select = new Select('Select', [
    new Options('Select a item', '-1'),
    new Options('Item 1', '1'),
    new Options('Item 2', '2'),
  ]);

  ngOnInit() {
    this.header.people = this.people;
    this.header.menu = this.menu;
    this.ugla.headerShadow = true;
    this.ugla.hasToolBar();
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
}
