import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu, MenuItem, Header, People, UglaService } from 'projects/ugla/src';
import { uploadComponentConfig } from '../../../environments/uploadComponentConfig';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.scss']
})
export class UploadPageComponent implements OnInit {

  constructor(private ugla: UglaService) {}

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
    new MenuItem('Aside with Breadcrumb', '/aside-with-breadcrumb', true),
  ]);
  
  @ViewChild('myPond') myPond: any;
  pondOptions = uploadComponentConfig;

  ngOnInit() {
    this.header.people = this.people;
    this.header.menu = this.menu;
    this.ugla.headerShadow = true;
    this.ugla.hasToolBar();
  }

  onChangeRemoveFile() {}

  onChangeAddFile(event) {
    console.log(event);
  }

  logout() {
    this.isAutenticated = false;
  }

  onSubmitClick() {
    return false;
  }

  onCancelClick() {
    return false;
  }

}
