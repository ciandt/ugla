import { AsideItem } from './../../../../projects/ugla/src/lib/models/aside-item';
import { ListboxComponent } from './../../../../projects/ugla/src/lib/components/listbox/listbox.component';
import { UglaRulesService } from './../../../../projects/ugla-rules/src/lib/ugla-rules.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
	UglaService,
	Menu,
	MenuItem,
	Header,
	People,
	Options,
	Select
} from 'projects/ugla/src';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
	constructor(private ugla: UglaService) {}

	@ViewChild('selectField') selectField: ListboxComponent;

	isAutenticated = true;

	header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);

  names = ['1', '2'];

	people = new People(
		'REGIVALDO FERNANDES DA SILVA',
		'jack.connor@ugla.dev',
		'./assets/imgs/people.png'
	);

	options = [
		new Options('Tipo', '-1', false),
		new Options('Audiência', 'item-0'),
		new Options('Doação de sangue', 'item-1', true),
		new Options('Exames médicos', 'item-2', false, null, 'Item numero 1', true),
		new Options('Serviço militar', 'item-3'),
		new Options('Outros', 'item-4')
	];

  select = new Select('select-1', this.options);

	menu = new Menu([new MenuItem('Home', '/', true)]);
  aside = [
    new AsideItem('Item 1', '/teste', true, false, null, [new AsideItem('teste', '/home'), new AsideItem('teste', '/home'), new AsideItem('teste', '/home'), new AsideItem('teste', '/home')]),
    new AsideItem('Item 2', '/teste2', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 3', '/teste3', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')]),
    new AsideItem('Item 4', '/teste4', true, false, null, [new AsideItem('teste', '/1'), new AsideItem('teste', '/2'), new AsideItem('teste', '/3'), new AsideItem('teste', '/4')])
  ];

  breadcrumb = new Menu([
    new MenuItem('Revenue Assurance', '/revenue-assurance'),
    new MenuItem('Associates', '/revenue-assurance/link'),
  ]);

	ngOnInit(): void {
		this.header.people = this.people;
		this.header.menu = this.menu;
		this.ugla.headerShadow = true;
		this.ugla.hasToolBar();
	}

	changeType(): boolean {
		this.selectField.setSelect('-1');
		return false;
	}

	hideMenu(): void {
		this.isAutenticated = false;
	}

	logout(): void {
		this.isAutenticated = false;
	}

  selectItem(items: Options[]): void {
    console.log(this.select.options);
	}

	cancel(): void {
		console.log('Cancel');
	}

	submit(event: EventTarget): boolean {
		console.log('Submit');
		return false;
	}
}
