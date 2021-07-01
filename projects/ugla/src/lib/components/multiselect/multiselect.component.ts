import { Component, Input, OnInit, Output, EventEmitter, HostListener, ElementRef, ChangeDetectorRef, OnChanges, SimpleChanges, Optional } from '@angular/core';
import { Form } from '../../enum';
import { Select, Options } from '../../models';
import { UglaService } from '../../ugla.service';

@Component({
  selector: 'ugl-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit, OnChanges {

  @Input() label: string;
	@Input() required = false;
	@Input() readonly = false;
	@Input() message: string;
	@Input() select: Select;
  @Input() stylized = false;
  @Input() disabled = false;

	@Output() selected = new EventEmitter<Options[]>();

	invalid = false;
	originalMessage: string;
	theme: string;
  opened = false;

	constructor(private ugla: UglaService, private elementRef: ElementRef) {
		this.theme = ugla.theme;
  }

	ngOnInit(): void {
		this.originalMessage = this.message;
	}

  @HostListener('document:click', ['$event', '$event.target'])
  public clickOut(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      if (this.opened) {
        this.selected.emit(this.select.options);
      }

      this.opened = false;
      event.preventDefault();
    }
  }

  check(event: any) {
    const item = event.currentTarget;

    this.select.options.forEach(op => {
      if (op.description == item.value) {
        op.checked = item.checked;
      }
    });
  }

  open(disabled = false): void {
    if (!disabled) {
      this.opened = !this.opened;
    }
  }
}
