import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { VwDirective } from './directives/vw.directive';
import { EdDirective } from './directives/ed.directive';
import { CrDirective } from './directives/cr.directive';
import { DeDirective } from './directives/de.directive';
import { UglaRulesService, RulesConfig } from './ugla-rules.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    VwDirective,
    EdDirective,
    CrDirective,
    DeDirective
  ],
  exports: [
    VwDirective,
    EdDirective,
    CrDirective,
    DeDirective
  ],
  providers: [UglaRulesService]
})
export class UglaRulesModule {
  constructor(@Optional() @SkipSelf() parentModule: UglaRulesModule) {}

  static forRoot(config: RulesConfig): ModuleWithProviders<UglaRulesModule> {
    return {
      ngModule: UglaRulesModule,
      providers: [
        { provide: RulesConfig, useValue: config }
      ]
    };
  }

  static forChild(): ModuleWithProviders<UglaRulesModule> {
    return {
      ngModule: UglaRulesModule,
      providers: []
    };
  }
}
