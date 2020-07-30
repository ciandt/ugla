import { UglaRulesModule } from './../../projects/ugla-rules/src/lib/ugla-rules.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UglaModule, Themes } from 'projects/ugla/src';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { E2ePageComponent } from './pages/e2e-page/e2e-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { MenuWithToolbarPageComponent } from './pages/menu-with-toolbar-page/menu-with-toolbar-page.component';
import { AsidePageComponent } from './pages/aside-page/aside-page.component';
import { AsideWithBreadcrumbPageComponent } from './pages/aside-with-breadcrumb-page/aside-with-breadcrumb-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    E2ePageComponent,
    MenuPageComponent,
    MenuWithToolbarPageComponent,
    AsidePageComponent,
    AsideWithBreadcrumbPageComponent,
    UploadPageComponent,
    RulesPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UglaModule.forRoot({themeName: Themes.AQUAMARINE}),
    UglaRulesModule.forRoot({ acronym: 'AUTH'}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
