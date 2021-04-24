import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { rootRouterConfig } from './app.routes';
import { RoutePartsService } from './services/route-parts/route-parts.service';
import { NavigationService } from "./services/navigation/navigation.service";

import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ngx-currency/src/currency-mask.config";
import { NgxCurrencyModule } from "ngx-currency";

import { AppCommonModule } from "./components/common/app-common.module";
import { AppComponent } from './app.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AppConfirmModule } from './services/dialogs/app-confirm/app-confirm.module';
import { AppInformationModule } from './services/dialogs/app-information/app-information.module';
import { InterceptorService } from './services/auth/interceptor.service';
import { AppLoaderModule } from './services/dialogs/app-loader/app-loader.module';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { registerLocaleData } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material';

import ptBr from '@angular/common/locales/pt';
import { HomeModule } from './views/business/home/home.module';

registerLocaleData(ptBr)

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
  
};

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    
    
    HttpModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AppConfirmModule,
    AppInformationModule,
    AppLoaderModule,
    AppCommonModule,
    NgxCurrencyModule,
    NgxUpperCaseDirectiveModule,
    HomeModule
    
  ],
  declarations: [AppComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-PT' },
    RoutePartsService, 
    NavigationService,     
    AuthGuard,    
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }