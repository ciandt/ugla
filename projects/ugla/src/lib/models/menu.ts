import { MenuItem } from './menu-item';

export class Menu {
	public items: MenuItem[];

	constructor(items: MenuItem[]) {
		this.items = items.filter((item) => item.visible);
	}
}
