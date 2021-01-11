import { Component, OnInit } from '@angular/core';
import { Header, Menu, MenuItem, Options, People, Select, ToastService } from 'projects/ugla/src';
import { ModalService } from 'projects/ugla/src/lib/components/modal/modal.service';

@Component({
  selector: 'app-accessibility',
  templateUrl: './accessibility.component.html',
  styleUrls: ['./accessibility.component.scss']
})
export class AccessibilityComponent implements OnInit {
  isAutenticated = true;

  header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);
  people = new People('Jack Connor', 'jack.connor@ugla.dev', './assets/imgs/people.png');

  radioItems = [
    new Options('Check1', '1', false, '#656565', 'radios'),
    new Options('Check2', '2', true, '#333', 'radios'),
    new Options('Check3', '3', false, '#656565', 'radios'),
    new Options('Check4', '4', false, '#656565', 'radios')
  ];

  menu = new Menu([
    new MenuItem('Home', '/', true),
    new MenuItem('Login', '/login', true),
    new MenuItem('E2E', '/e2e', true),
    new MenuItem('Menu', '/menu', true),
    new MenuItem('Menu with Toolbar', '/menu-with-toolbar', true),
    new MenuItem('Aside', '/aside', true),
    new MenuItem('Rules', '/rules', true),
    new MenuItem('Aside with Breadcrumb', '/aside-with-breadcrumb', true),
  ]);

  constructor(private modalService: ModalService, private toastSevice: ToastService) { }

  selectOthers = new Select('others', [
    new Options('Selectione', '-1', false),
    new Options('Amanda', 'A', false),
    new Options('Joab', 'SON-DAUGHTER', false),
    new Options('Diogo', 'FATHER-MOTHER', false)
  ]);

  ngOnInit() {
    this.header.people = this.people;
    this.header.menu = this.menu;
  }
  
  logout() {
    this.isAutenticated = false;
  }

  confirmModal() {
    this.modalService.closeModal();
  }

  cancelModal() {
    this.modalService.closeModal();
  }

  openModal() {
    this.modalService.success('Teste modal', 'Texto da modal');
  }

  openToast() {
    this.toastSevice.success('Título do toast', 'texto explicativo');
  }

  cancel() {
    this.modalService.error('Cancel', 'Cancel form', true);
  }

  submit() {
    this.modalService.success('Cancel', 'Cancel form', true);
  }
}
