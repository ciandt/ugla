import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Header } from '../../models';
import { UglaService } from '../../ugla.service';

/**
 * Header component
 *
 * @example
 * // HTML
 * <ugl-header [header]="header" (logoutAction)="logout($event)">
 *    <another-component></another-component>
 * </ugl-header>
 *
 * // Typescript
 * import { Header, People, Menu, MenuItem, Select, Options } from 'ugla-ugla';
 *
 * public header = new Header('Ugla', './assets/imgs/logo.png', 'home', true);
 * public people = new People('PEOPLE NAME', 'LOGIN\@ciandt.com', 'IMAGE URL');
 *
 * public menu = new Menu([
 *    new MenuItem('Home Page', '/', true),
 *    new MenuItem('Content', '/content', false),
 *    new MenuItem('Menu Hidden in mobile', '/no-mobile', true),
 * ]);
 *
 * ngOnInit() {
 *    this.header.people = this.people;
 *    this.header.menu = this.menu;
 *    this.contentType = ContentTypes.FLUID;
 * }
 */
@Component({
  selector: 'ugl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * Instance of header right area
   */
  @ViewChild('headerRight') headerRightInstance !: ElementRef;

  /**
   * Object type Header
   */
  @Input() header: Header;

  /**
   * Function logout
   */
  @Output() logoutAction = new EventEmitter();

  /**
   * Logout text alt
   */
  @Input() public logoutText: string;

  /**
   * Identify menu is open
   */
  public open: boolean;

  /**
   * @ignore
   */
  private theme: string;

  /**
   * @ignore
   */
  private hasShadow: boolean;

  /**
   * Classes of the header component
   */
  public classes: string;

  /**
   * Height of header right area
   */
  headerRightHeight: number;
  windowHeight = window.innerHeight;

  /**
   * Receives the component's name
   * @param ugla: UglaService
   * @param changeDetector: ChangeDetectorRef
   */
  constructor(private ugla: UglaService,
              private changeDetector: ChangeDetectorRef) {
    this.theme = ugla.theme;
    this.setClasses(ugla.headerShadow);
  }

  /**
   * Set the header classes
   * @param shadow active or not the shadow, default is false
   */
  private setClasses(shadow: boolean) {
    this.hasShadow = shadow;
    this.classes = `${this.theme} ${this.hasShadow ? '' : 'no-shadow'}`;
  }

  /**
   * Function click
   *
   * Open / Close menu
   */
  toggleMenu() {
    this.open = !(this.open);
    setTimeout(() => {
      this.headerRightHeight = this.headerRightInstance.nativeElement.offsetHeight;
    }, 0);
  }

  /**
   * Function logout
   */
  logout() {
    this.logoutAction.emit(true);
  }

  /**
   * Set initial configurations
   */
  ngOnInit() {
    this.open = false;
    const current = location.pathname.charAt(0) === '/' ? location.pathname.substr(1) : location.pathname;
    this.logoutText = (this.logoutText === undefined) ? 'Logout' : this.logoutText;

    if (this.header.menu) {
      for (const item of this.header.menu.items) {
        const url = item.url.charAt(0) === '/' ? item.url.substr(1) : item.url;
        item.active = url === current;
      }
    }

    this.ugla.changedHeaderShadow.subscribe((hasShadow: boolean) => {
      this.setClasses(hasShadow);
    });
  }

  closeMenu() {
    this.open = false;
  }
}
