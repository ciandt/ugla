import { Injectable, Optional, Output, EventEmitter } from '@angular/core';
import { Themes } from './enum/themes.enum';
import { VERSION } from './config';

/**
 * Theme configuration default
 */
export class ThemeConfig {
	/**
	 * Theme default
	 */
	themeName = Themes.WHITE;
}

/**
 * Injectable
 *
 * Use this service to set the default value
 */
@Injectable({
	providedIn: 'root'
})
export class UglaService {
	/**
	 * Emitter for header shadow changed
	 */
	@Output() changedHeaderShadow = new EventEmitter<boolean>();

	/**
	 * Set default theme
	 */
	private _theme: Themes = Themes.WHITE;

	/**
	 * Set version
	 */
	private _version: string;

	/**
	 * Set if the header has shadow
	 */
	private _headerShadow: boolean;

	/**
	 * Create a meta tag about theme
	 */
	private metaTheme = document.createElement('meta');
	private metaVersion = document.createElement('meta');

	/**
	 * Receives the configuration set on app.module.ts
	 *
	 * @param config: ThemeConfig
	 */
	constructor(@Optional() config: ThemeConfig) {
		if (config) {
			this._theme = config.themeName;
			this._version = VERSION;
			this.meta();
		}
	}

	/**
	 * Create meta tag and include theme class on body
	 */
	meta(): void {
		this.metaTheme.setAttribute('name', 'ugla-theme');
		this.metaTheme.setAttribute('content', this._theme);

		document.head.appendChild(this.metaTheme);
		document.body.classList.add(this._theme);

		this.metaVersion.setAttribute('name', 'ugla-version');
		this.metaVersion.setAttribute('content', this._version);

		document.head.appendChild(this.metaVersion);
		document.body.classList.add(this._version);

		document.body.classList.add(this.browseIdentify());
		document.body.classList.add(this.soIdentify());
	}

	/**
	 * Browse identify
	 * return a classe with browse name
	 */
	browseIdentify(): string {
		if (
			(navigator.userAgent.indexOf('Opera') ||
				navigator.userAgent.indexOf('OPR')) !== -1
		) {
			return 'opera';
		} else if (navigator.userAgent.indexOf('Chrome') !== -1) {
			return 'chrome';
		} else if (navigator.userAgent.indexOf('Safari') !== -1) {
			return 'safari';
		} else if (navigator.userAgent.indexOf('Firefox') !== -1) {
			return 'firefox';
		} else if (navigator.userAgent.indexOf('MSIE') !== -1) {
			return 'ie';
		} else {
			return 'unknown-browse';
		}
	}

	/**
	 * Operation System Identify
	 * return a class with so name
	 */
	soIdentify(): string {
		if (navigator.appVersion.indexOf('Win') !== -1) {
			return 'windows';
		} else if (navigator.appVersion.indexOf('Mac') !== -1) {
			return 'macos';
		} else if (navigator.appVersion.indexOf('X11') !== -1) {
			return 'unix';
		} else if (navigator.appVersion.indexOf('Linux') !== -1) {
			return 'linux';
		} else {
			return 'unknown-os';
		}
	}

	/**
	 * Add class do body if there's toolbar on the page
	 * @param toolbar false | element
	 */
	hasToolBar(toolbar = false): void {
		if (toolbar) {
			document.body.classList.add('has-toolbar');
		} else {
			document.body.classList.remove('has-toolbar');
		}
	}

	/**
	 * Get theme
	 */
	get theme(): string {
		return this._theme;
	}

	/**
	 * Get version
	 */
	get version(): string {
		return this._version;
	}

	/**
	 * Get color of the theme
	 */
	get color(): string {
		const splitted = this._theme.split('-');
		return splitted[splitted.length - 1];
	}

	/**
	 * Set the header shadow indicator value
	 */
	set headerShadow(visible: boolean) {
		this._headerShadow = visible;
		this.changedHeaderShadow.emit(visible);
	}

	/**
	 * Get the value of header shadow indicator
	 */
	get headerShadow(): boolean {
		return this._headerShadow;
	}
}
