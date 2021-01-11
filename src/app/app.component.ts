import { UglaRulesService } from './../../projects/ugla-rules/src/lib/ugla-rules.service';
import { Component, OnInit } from '@angular/core';
import { Header, People, Menu, MenuItem, Select, Options, UglaService, ToastService } from 'projects/ugla/src';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private ugla: UglaService,
    private rules: UglaRulesService) {
    }

  isAutenticated = true;

  header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);

  people = new People('Jack Connor', 'jack.connor@ugla.dev', './assets/imgs/people.png');

  menu = new Menu([
    new MenuItem('Home', null, true),
    new MenuItem('Login', '/login', true, false, null, ),
    new MenuItem('E2E', '/e2e', true),
    new MenuItem('Test page', '/dev', true),
  ]);

  select = new Select('language', [
    new Options('Select a language', '-1'),
    new Options('Portuguese PT-BR', 'pt-br'),
    new Options('English EN', 'en'),
    new Options('日本人', 'jp'),
    new Options('汉语', 'ch_st'),
    new Options('漢語', 'ch_tr')
  ]);

  ngOnInit() {
    this.rules.createRules([
      {
        code: 1,
        name: 'Expense Managment',
        acronym: 'EXPENSE',
        features: [
          {
            code: 1,
            name: 'INTEGRATIONS',
            acronym: 'INT',
            parent: null,
            applicationCode: 1,
            operations: [
              {
                code: 2,
                name: 'VIEW',
                acronym: 'VW'
              },
              {
                code: 3,
                name: 'EDIT',
                acronym: 'ED'
              }
            ]
          },
          {
            code: 2,
            name: 'Client Reimbursement',
            acronym: 'CLI',
            parent: null,
            applicationCode: 2,
            operations: [
              {
                code: 2,
                name: 'VIEW',
                acronym: 'VW'
              }
            ]
          }
        ]
      }
    ]);
    this.header.people = this.people;
    this.header.menu = this.menu;
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
}
