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

	people = new People(
		'Jack Connor',
		'jack.connor@ugla.dev',
		'./assets/imgs/people.png'
	);

	options = [
		new Options('Tipo', '-1', false),
		new Options('Audiência', 'item-0'),
		new Options('Doação de sangue', 'item-1', true),
		new Options('Exames médicos', 'item-2', false, null, 'Item numero 1'),
		new Options('Serviço militar', 'item-3'),
		new Options('Outros', 'item-4')
	];

	select = new Select('select-1', this.options);
	menu = new Menu([new MenuItem('Home', '/', true)]);

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

	selectItem(item: Options): void {
		console.log(
			`Item selected is ${item.description} and the code is ${item.value}`
		);
	}

	cancel(): void {
		console.log('Cancel');
	}

	submit(event: EventTarget): boolean {
		console.log('Submit');
		return false;
	}
}
