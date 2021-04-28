import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Form } from '../../enum';
import { Select, Options } from '../../models';
import { UglaService } from '../../ugla.service';

@Component({
	selector: 'ugl-listbox',
	templateUrl: './listbox.component.html',
	styleUrls: ['./listbox.component.scss']
})
export class ListboxComponent implements OnInit {
	@Input() label: string;
	@Input() required = false;
	@Input() readonly = false;
	@Input() message: string;
	@Input() select: Select;

	@Output() selected = new EventEmitter<Options>();

	invalid = false;
	originalMessage: string;
	theme: string;

	constructor(ugla: UglaService) {
		this.theme = ugla.theme;
	}

	ngOnInit(): void {
		this.originalMessage = this.message;
	}

	validate(selected: Event): void {
		const option = selected.target as HTMLSelectElement;

		if (this.required && option.value === '-1') {
			this.message = Form.REQUIRED;
			this.invalid = true;
		} else {
			this.message = this.originalMessage;
			this.invalid = false;

			const filter = this.select.options.filter(
				(item) => item.value === option.value
			);

			this.selected.emit(filter[0]);
		}
	}
}
