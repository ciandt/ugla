import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UglaComponent } from './ugla.component';
import { ThemeConfig, UglaService } from './ugla.service';

import { BrandComponent } from './components/brand/brand.component';
import { ButtonComponent } from './components/button/button.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { FieldComponent } from './components/field/field.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FormComponent } from './components/form/form.component';
import { GridDirective } from './directives/grid.directive';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { PeopleCardComponent } from './components/people-card/people-card.component';
import { ReversePipe } from './components/toast/pipes/reverse.pipe';
import { SelectComponent } from './components/select/select.component';
import { ToastItemComponent } from './components/toast/toast-item/toast-item.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ListOptionsComponent } from './components/list-options/list-options.component';
import { LoginComponent } from './components/login/login.component';
import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SwitchComponent } from './components/switch/switch.component';
import { ListLinksComponent } from './components/list-links/list-links.component';
import { FilterComponent } from './components/filter/filter.component';
import { CardTimelineComponent } from './components/cards/card-timeline/card-timeline.component';
import { SimpleTableComponent } from './components';
import { CheckboxColumnDirective } from './directives/checkbox-column.directive';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginationItemsPerPageComponent } from './components/pagination/pagination-items-per-page/pagination-items-per-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { ClickOutsideDirective } from './directives';
import { TooltipDirective } from './directives/tooltip.directive';
import { HyperLinkComponent } from './components/hyper-link/hyper-link.component';
import { BackPanelComponent } from './components/panels/back-panel/back-panel.component';
import { RadioComponent } from './components/radio/radio.component';
import { BannerComponent } from './components/banner/banner.component';
import { QuoteComponent } from './components/quote/quote.component';
import { LightboxDirective } from './directives/lightbox.directive';
import { AsideComponent } from './components/aside/aside.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageFloatComponent } from './components/page-float/page-float.component';
import { CardComponent } from './components/cards/card/card.component';
import { LabelSpanComponent } from './components/label-span/label-span.component';
import { CardInfoPhotoComponent } from './components/cards/card-info-photo/card-info-photo.component';

registerPlugin(FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageValidateSize);

/**
 * Imports: Common and Router
 * Declararions and Exports: all Ugla's components
 * Provider: Ugla Lib Service
 */
@NgModule({
  imports: [CommonModule, RouterModule, FilePondModule],
  declarations: [
    UglaComponent,
    BrandComponent,
    ButtonComponent,
    CheckboxComponent,
    DatepickerComponent,
    FieldComponent,
    FileUploadComponent,
    FormComponent,
    HeaderComponent,
    PageTitleComponent,
    PeopleCardComponent,
    SelectComponent,
    ToolbarComponent,
    ReversePipe,
    ToastComponent,
    ToastItemComponent,
    GridDirective,
    ClickOutsideDirective,
    LightboxDirective,
    ListOptionsComponent,
    LoginComponent,
    LoadingComponent,
    SwitchComponent,
    ListLinksComponent,
    FilterComponent,
    CardTimelineComponent,
    SimpleTableComponent,
    CheckboxColumnDirective,
    PaginationComponent,
    PaginationItemsPerPageComponent,
    ModalComponent,
    TooltipDirective,
    HyperLinkComponent,
    BackPanelComponent,
    RadioComponent,
    BannerComponent,
    QuoteComponent,
    AsideComponent,
    BreadcrumbComponent,
    PageFloatComponent,
    CardComponent,
    LabelSpanComponent,
    CardInfoPhotoComponent
  ],
  exports: [
    UglaComponent,
    BrandComponent,
    ButtonComponent,
    CheckboxComponent,
    DatepickerComponent,
    FieldComponent,
    FileUploadComponent,
    FormComponent,
    HeaderComponent,
    PageTitleComponent,
    PeopleCardComponent,
    SelectComponent,
    ToolbarComponent,
    ReversePipe,
    ToastComponent,
    ToastItemComponent,
    GridDirective,
    ClickOutsideDirective,
    LightboxDirective,
    ListOptionsComponent,
    LoginComponent,
    LoadingComponent,
    SwitchComponent,
    ListLinksComponent,
    FilterComponent,
    CardTimelineComponent,
    SimpleTableComponent,
    CheckboxColumnDirective,
    PaginationComponent,
    PaginationItemsPerPageComponent,
    ModalComponent,
    TooltipDirective,
    HyperLinkComponent,
    BackPanelComponent,
    RadioComponent,
    BannerComponent,
    QuoteComponent,
    AsideComponent,
    BreadcrumbComponent,
    PageFloatComponent,
    CardComponent,
    LabelSpanComponent,
    CardInfoPhotoComponent
  ],
  providers: [UglaService]
})
export class UglaModule {

  /**
   * Constructor UglaModule
   *
   * @param parentModule: UglaModule
   */
  constructor(@Optional() @SkipSelf() parentModule: UglaModule) {}

  /**
   * Initialize Ugla with theme configurations.
   * @param config typeof ThemeConfig
   * @returns typeof ModuleWithProviders
   */
  static forRoot(config: ThemeConfig): ModuleWithProviders<UglaModule> {
    return {
      ngModule: UglaModule,
      providers: [
        { provide: ThemeConfig, useValue: config }
      ]
    };
  }

  /**
   * Use when import on Lazy Loading module
   */
  static forChild(): ModuleWithProviders<UglaModule> {
    return {
      ngModule: UglaModule,
      providers: []
    };
  }
}
