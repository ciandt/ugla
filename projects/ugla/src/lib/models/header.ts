import { People } from './people';
import { Menu } from './menu';

export class Header {
	public brandName: string;
	public people: People;
	public menu: Menu;
	public homePath?: string;
	public brandImage: string;
	public hasLink = true;

	constructor(
		brandName: string,
		brandImage: string,
		homePath?: string,
		hasLink?: boolean
	) {
		this.brandImage = !!brandImage ? brandImage : '';
		this.brandName = !!brandName ? brandName : '';

		this.hasLink = hasLink !== undefined ? hasLink : this.hasLink;

		if (this.hasLink) {
			this.homePath = !!homePath ? homePath : 'home';
		} else {
			this.homePath = '';
		}
	}
}
