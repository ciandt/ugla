import { Component, OnInit, Input, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { LoadingService } from './loading.service';
import { UglaService } from '../../ugla.service';


/**
 * Loading | LoadingService
 *
 *  Call loadingService.show() for to display loading without transparency while loading and loadingService.hide() after loading page.
 *  Call loadingService.show(true) for to display loading with transparency.
 *  Use <ugl-loading [show]="true" [fullScreen]="false" [loadingName]="'loadingName'"></ugl-loading> when local loading is needed.
 *
 * @example
 * <ugl-loading></ugl-loading>
 *
 */
@Component({
  selector: 'ugl-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  /**
   * Indicates if the loading must be shown.
   *
   * Default: false
   */
  @Input() show = false;

  /**
   * Indicates if the loading must be full screen.
   *
   * Default: true
   */
  @Input() fullScreen = true;

  /**
   * Message to be shwon in the title for accessibility purposes
   */
  @Input() message = '';

  /**
   * Loading component name.
   *
   * Default: loadingComponent
   */
  @Input() loadingName = 'loadingComponent';

  inTransparency: boolean;

  /**
   * Insert the theme name on html component
   */
  public theme: string;


  constructor(private service: LoadingService, private ugla: UglaService, private element: ElementRef) {
    this.theme = ugla.theme;
  }

  ngOnInit() {
    if (this.loadingName) {
      this.service.registerInstance(this.loadingName, this);
      const loading = this.element.nativeElement.querySelector('.loading');
      if (loading) {
        loading.focus();
      }
    }
  }

  ngOnDestroy() {
    if (this.loadingName) {
      this.service.removeInstance(this.loadingName, this);
    }
  }

  onShow(transparency?: boolean) {
    this.show = !this.show;
    this.inTransparency = transparency;
    document.body.classList.add('no-scroll');
  }

  onHide() {
    if (this.show) {
      this.show = !this.show;
      document.body.classList.remove('no-scroll');
      if (this.element.nativeElement.querySelector('.page-title')) {
        this.element.nativeElement.querySelector('.page-title').focus();
      } else {
        this.element.nativeElement.querySelector('.brand').focus();
      }
    }
  }
}
