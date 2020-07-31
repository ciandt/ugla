import { E2ePageComponent } from './pages/e2e-page/e2e-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { MenuWithToolbarPageComponent } from './pages/menu-with-toolbar-page/menu-with-toolbar-page.component';
import { AsidePageComponent } from './pages/aside-page/aside-page.component';
import { AsideWithBreadcrumbPageComponent } from './pages/aside-with-breadcrumb-page/aside-with-breadcrumb-page.component';
import { RulesPageComponent } from './pages/rules-page/rules-page.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'e2e', component: E2ePageComponent},
  {path: 'menu', component: MenuPageComponent},
  {path: 'menu-with-toolbar', component: MenuWithToolbarPageComponent},
  {path: 'rules', component: RulesPageComponent},
  {path: 'aside', component: AsidePageComponent},
  {path: 'aside-with-breadcrumb', component: AsideWithBreadcrumbPageComponent},
  {path: 'upload', component: UploadPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
