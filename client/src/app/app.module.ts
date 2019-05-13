import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainPageModule } from './mainpage/mainpage.module';
import { StoreModule } from './store/store.module';
import { CfAdminComponent } from './auth/cf-admin/cf-admin.component';
import { CfGuard } from './guard/cf.guard';
import { NotCfGuard } from './guard/not-cf.guard';

import localeEsMx from "@angular/common/locales/es-MX";
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsMx, "es-MX")

import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig } from  'ngx-ui-loader';
import { NofoundComponent } from './nofound/nofound.component';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#66cb00",
  "bgsOpacity": 1,
  "bgsPosition": "bottom-right",
  "bgsSize": 30,
  "bgsType": "circle",
  "blur": 0,
  "fgsColor": "rgba(255,255,255,0)",
  "fgsPosition": "center-center",
  "fgsSize": 20,
  "fgsType": "three-bounce",
  "gap": 10,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(38,38,38,0)",
  "pbColor": "#66cb00",
  "pbDirection": "ltr",
  "pbThickness": 5,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#b86c6c",
  "textPosition": "bottom-right",
  "threshold": 500
}

let config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("332282894026245")
  }
]);


export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CfAdminComponent,
    NofoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    SocialLoginModule,
    AppRoutingModule,
    MainPageModule,
    StoreModule
  ],
  providers: [{ provide: AuthServiceConfig, useFactory: provideConfig },
  { provide: LOCALE_ID, useValue: 'es-MX' }, CfGuard, NotCfGuard],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
