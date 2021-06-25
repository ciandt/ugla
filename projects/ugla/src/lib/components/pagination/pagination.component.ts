import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	OnChanges,
	SimpleChanges
} from '@angular/core';
import { PaginationItemsPerPageComponent } from './pagination-items-per-page/pagination-items-per-page.component';
import { Select } from '../../models';
import { UglaService } from '../../ugla.service';

/**
 * Constant for default first page
 */
const FIRST_PAGE = 1;

/**
 * Component for pagination
 *
 * @example
 * <ugl-pagination [totalPages]="100"
 * [selectedPage]="2"
 * [select]="select"
 * [limitInterval]="5"
 * [visiblePages]="10"
 * [itemsPerPage]="10"
 * [itemsPerPageRange]="select"
 * [itemsPerPageBeforeText]="'Show'"
 * [itemsPerPageAfterText]="'Items per page'"
 * (changePaginationPage)="changePage($event)"
 * (changePaginationPageSize)="changePageSize($event)"
 * [firstPageButtonTitle]="'First Page'"
 * [previousPageButtonTitle]="'Previous Page'"
 * [nextPageButtonTitle]="'Next Page'"
 * [lastPageButtonTitle]="'Last Page'"
 * [labelPage]="'Page'"
 * [id]="'pagination'">
 * </ugl-pagination>
 */
@Component({
	selector: 'ugl-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
	/**
	 * Internal property for limit interval
	 */
	private _limitInterval: number = Math.trunc(this.visiblePages / 2);

	/**
	 * Internal property for visible pages
	 */
	private _visiblePages = 10;

	/**
	 * Property for first visible page
	 */
	private firstVisiblePage: number;

	/**
	 * Property for first last page
	 */
	private lastVisiblePage: number;

	/**
	 * Property for indicating if is next page
	 */
	private isNext = true;

	/**
	 * The selected page.
	 */
	@Input() selectedPage: number;

	/**
	 * Total pages of the pagination.
	 */
	@Input() totalPages: number;

	/**
	 * Pagination size options.
	 */
	@Input() itemsPerPageRange: Select;

	/**
	 * Selected pagination size.
	 */
	@Input() itemsPerPage: number;

	/**
	 * Show text before select input.
	 */
	@Input() itemsPerPageBeforeText? = 'Show';

	/**
	 * Show text after select input.
	 */
	@Input() itemsPerPageAfterText? = 'Items per page';

	/**
	 * Component id.
	 */
	@Input() id: string;

	/**
	 * Set a title to the first page button.
	 */
	@Input() firstPageButtonTitle? = 'First Page';

	/**
	 * Set a title to the previous page button.
	 */
	@Input() previousPageButtonTitle? = 'Previous Page';

	/**
	 * Set a title to the last page button.
	 */
	@Input() lastPageButtonTitle? = 'Last Page';

	/**
	 * Set a title to the next page button.
	 */
	@Input() nextPageButtonTitle? = 'Next Page';

	/**
	 * Set a title the item per page select.
	 */
	@Input() itemsPerPageTitle?: string;

	/**
	 * Set a label for page number.
	 */
	@Input() labelPage? = 'Page';

	/**
	 * Items per page component.
	 */
	@ViewChild('itemsPerPageComponent')
	itemsPerPageComponent!: PaginationItemsPerPageComponent;

	/**
	 * Emitter for changed pagination size.
	 */
	@Output()
	changePaginationPageSize: EventEmitter<number> = new EventEmitter<number>();

	/**
	 * Emitter for changed pagination page.
	 */
	@Output()
	changePaginationPage: EventEmitter<number> = new EventEmitter<number>();

	/**
	 * Pages to be displayed
	 */
	public pages: number[];

	/**
	 * Receives the theme's name
	 */
	public theme: string;

	/**
	 * Receives the component's name
	 * @param ugla: UglaService
	 */
	constructor(private ugla: UglaService) {
		this.theme = ugla.theme;
	}

	/**
	 * Set initials configurations
	 */
	ngOnInit(): void {
		this.firePageEvent();

		setTimeout(() => {
			if (this.itemsPerPageRange) {
				this.itemsPerPageComponent.setSelected(this.itemsPerPage);
			}
		});
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.totalPages) {
			this.totalPages = changes.totalPages.currentValue;
		}
		if (changes.selectedPage) {
			this.selectedPage = changes.selectedPage.currentValue;
		}
		if (changes.itemsPerPage) {
			this.itemsPerPage = changes.itemsPerPage.currentValue;
		}
		if (changes.itemsPerPageRange) {
			this.itemsPerPageRange = changes.itemsPerPageRange.currentValue;
		}

		this.firePageEvent();
	}

	/**
	 * Set pagination length
	 */
	@Input()
	set visiblePages(visiblePages: number) {
		if (visiblePages) {
			this._visiblePages = visiblePages;
		}
	}

	/**
	 * Get pagination length
	 */
	get visiblePages(): number {
		return this._visiblePages;
	}

	/**
	 * Set limit interval to show pagination
	 */
	@Input()
	set limitInterval(limitInterval: number) {
		if (limitInterval) {
			this._limitInterval = limitInterval;
		}
	}

	/**
	 * Get limit interval to show pagination
	 */
	get limitInterval(): number {
		return this._limitInterval;
	}

	/**
	 * After fire pagination, update the visible pages.
	 */
	changePagination(): void {
		this.pages = [];
		for (
			let i = this.firstVisiblePage, len = this.lastVisiblePage;
			i <= len;
			i++
		) {
			this.pages.push(i);
		}
	}

	/**
	 * Change navigation to previous page, and emit the selected page number.
	 */
	firePreviousPageEvent(): boolean {
		if (this.selectedPage === FIRST_PAGE || !this.isPreviousPageEnabled()) {
			return false;
		}

		this.selectedPage = --this.selectedPage;
		this.isNext = false;
		this.firePageEvent();
		this.changePaginationPage.emit(this.selectedPage);

		return false;
	}

	/**
	 * Change navigation to first page, and emit the selected page number.
	 */
	fireFirstPageEvent(): boolean {
		if (this.selectedPage === FIRST_PAGE) {
			return false;
		}

		this.selectedPage = FIRST_PAGE;
		this.isNext = false;
		this.firePageEvent();
		this.changePaginationPage.emit(this.selectedPage);

		return false;
	}

	/**
	 * Change navigation to next page, and emit the selected page number.
	 */
	fireNextPageEvent(): boolean {
		if (
			this.selectedPage === this.totalPages ||
			!this.isNextPageEnabled()
		) {
			return false;
		}

		this.selectedPage = ++this.selectedPage;
		this.isNext = true;
		this.firePageEvent();
		this.changePaginationPage.emit(this.selectedPage);

		return false;
	}

	/**
	 * Change navigation to the last page, and emit the selected page number.
	 */
	fireLastPageEvent(): boolean {
		if (this.selectedPage === this.totalPages) {
			return false;
		}

		this.selectedPage = this.totalPages;
		this.isNext = true;
		this.firePageEvent();
		this.changePaginationPage.emit(this.selectedPage);

		return false;
	}

	/**
	 * Fire page navigation.
	 *
	 * @param page is a selected page
	 */
	fireNavigatePageEvent(page: number): boolean {
		this.selectedPage = page;
		this.changePaginationPage.emit(this.selectedPage);
		return false;
	}

	/**
	 * Return true if the previous page is enabled.
	 */
	isPreviousPageEnabled(): boolean {
		return this.selectedPage > FIRST_PAGE;
	}

	/**
	 * Return true if the next page is enabled.
	 */
	isNextPageEnabled(): boolean {
		return this.selectedPage <= this.totalPages;
	}

	/**
	 * Return true if the selected pages is the current.
	 */
	isCurrentPage(page: number): boolean {
		return this.selectedPage === page;
	}

	/**
	 * Return true if the selected pages is the first page.
	 */
	isFirstPage(): boolean {
		return this.selectedPage === FIRST_PAGE;
	}

	/**
	 * Return true if the selected pages is the last page.
	 */
	isLastPage(): boolean {
		return this.selectedPage === this.totalPages;
	}

	/**
	 * Fire update pagination.
	 */
	firePageEvent(): void {
		let leftInterval: number;
		let rightInterval: number;

		if (this.isNext) {
			rightInterval =
				this.limitInterval === this.visiblePages
					? this.visiblePages - 1
					: this.limitInterval;
			leftInterval =
				this.limitInterval === this.visiblePages
					? this.visiblePages - this.limitInterval
					: this.visiblePages - 1 - this.limitInterval;
		} else {
			leftInterval =
				this.limitInterval === this.visiblePages
					? this.visiblePages - 1
					: this.limitInterval;
			rightInterval =
				this.limitInterval === this.visiblePages
					? this.visiblePages - this.limitInterval
					: this.visiblePages - 1 - this.limitInterval;
		}

		if (
			(!this.firstVisiblePage && !this.lastVisiblePage) ||
			this.isFirstPage() ||
			this.isLastPage()
		) {
			this.lastVisiblePage = this.getNextLastPage(
				this.selectedPage,
				rightInterval
			);
			this.firstVisiblePage = this.getNextFirstPage(this.lastVisiblePage);
		}

		if (
			!this.isLeftInterval(leftInterval) &&
			!this.isRightInterval(rightInterval) &&
			this.isInsideInterval(this.limitInterval)
		) {
			this.firstVisiblePage = this.selectedPage - leftInterval;
			this.lastVisiblePage = this.selectedPage + rightInterval;
		}

		this.changePagination();
	}

	/**
	 * Return true if the selected page is in left interval.
	 *
	 * @param leftInterval: number
	 */
	isLeftInterval(leftInterval: number): boolean {
		return this.selectedPage <= leftInterval;
	}

	/**
	 * Return true if the selected page is in right interval.
	 *
	 * @param rightInterval: number
	 */
	isRightInterval(rightInterval: number): boolean {
		return this.selectedPage >= this.totalPages + 1 - rightInterval;
	}

	/**
	 * Validate if the current page is inside interval.
	 *
	 * @param finalinterval: number
	 */
	isInsideInterval(finalinterval: number): boolean {
		if (this.isNext) {
			return this.selectedPage >= this.lastVisiblePage - finalinterval;
		} else {
			return this.selectedPage <= this.firstVisiblePage + finalinterval;
		}
	}

	/**
	 * Get last page from any select page.
	 *
	 * @param page page number
	 * @param interval number of interval
	 */
	getNextLastPage(page: number, interval: number): number {
		let rightPage: number = page;
		const diff =
			page <= this.limitInterval
				? page - (this.visiblePages - interval)
				: 0;
		while (
			rightPage < this.totalPages &&
			rightPage < page + interval - diff
		) {
			++rightPage;
		}
		return rightPage;
	}

	/**
	 * Get first page from last page.
	 *
	 * @param lastPage last page number
	 */
	getNextFirstPage(lastPage: number): number {
		let leftPage: number = lastPage;
		while (
			leftPage > lastPage - this.visiblePages + 1 &&
			leftPage > FIRST_PAGE
		) {
			--leftPage;
		}
		return leftPage;
	}
}
