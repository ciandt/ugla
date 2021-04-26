export class AsideItem {
	public description: string;
	public url: string;
	public active: boolean;
	public visible: boolean;
	public hideMobile: boolean;
	public icon: string;
	public submenu: AsideItem[];
	public open = false;

	/**
	 * @param description - menu text
	 * @param url - redirect URL
	 * @param visible - if false, the menu item will not be shown
	 * @param hideMobile - default: false. If true, should hide on mobile devices
	 * @param iocon - default: ''
	 */
	constructor(
		description: string,
		url: string,
		visible?: boolean,
		hideMobile?: boolean,
		icon?: string,
		submenu?: AsideItem[]
	) {
		this.description = description;
		this.url = url;
		this.visible = visible !== undefined ? visible : true;
		this.hideMobile = hideMobile !== undefined ? hideMobile : false;
		this.icon = icon !== undefined ? icon : null;
		this.submenu = submenu !== undefined ? submenu : null;
	}
}
