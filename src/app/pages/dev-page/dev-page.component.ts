import { LightboxService } from './../../../../projects/ugla/src/lib/components/lightbox/lightbox.service';
import { Component, OnInit } from '@angular/core';
import { ModalService, Options } from 'projects/ugla/src';

@Component({
  selector: 'app-dev-page',
  templateUrl: './dev-page.component.html',
  styleUrls: ['./dev-page.component.scss']
})
export class DevPageComponent implements OnInit {
  constructor(
    private modal: ModalService,
    private lightbox: LightboxService
  ) { }

  hiddenContent = true;

  radioItems: Options[];

  images = [
    'https://edumoreira.com.br/wp-content/uploads/2019/08/Qual-a-diferen%C3%A7a-entre-DOC-e-TED-870x450.jpg',
    'https://edumoreira.com.br/wp-content/uploads/2019/08/Qual-a-diferen%C3%A7a-entre-DOC-e-TED-870x450.jpg',
    'https://edumoreira.com.br/wp-content/uploads/2019/08/Qual-a-diferen%C3%A7a-entre-DOC-e-TED-870x450.jpg'
  ];

  images2 = [
    'http://corrupteddevelopment.com/wp-content/uploads/2012/03/sky-blue-background.jpg',
    'https://edumoreira.com.br/wp-content/uploads/2019/08/Qual-a-diferen%C3%A7a-entre-DOC-e-TED-870x450.jpg',
    'https://edumoreira.com.br/wp-content/uploads/2019/08/Qual-a-diferen%C3%A7a-entre-DOC-e-TED-870x450.jpg'
  ];

  ngOnInit() {
    this.radioItems = [
      new Options('Check1', '1', false, '#d71f3c', 'radios'),
      new Options('Check2', '2', true, '#656565', 'radios'),
      new Options('Check3', '3', false, '#656565', 'radios'),
      new Options('Check4', '4', false, '#656565', 'radios')
    ];
  }

  getItemChecked(event) {
    console.log(event);
  }

  openLightbox() {
    this.lightbox.open(this.images, false, this.iconCallback, 'delete_outline');
  }

  iconCallback(position: string): void {
    console.log('POSITION', position);
  }

  openWarning() {
    this.modal.warning('Warning', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.', true);
  }

  openError() {
    this.modal.error('Error', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.', true);
  }

  openSuccess() {
    this.modal.success('Success', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.', true);
  }

  openInfo() {
    this.modal.info('Info', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.', true);
  }

  openTemplate() {
    this.hiddenContent = true;
    this.modal.info('Template', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.', true);
  }

  cancel() {
    this.hiddenContent = false;
    this.modal.closeModal();
  }

  confirm() {
    this.hiddenContent = false;
    this.modal.closeModal();
  }
}
